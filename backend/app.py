from flask import Flask, render_template, request, send_from_directory, redirect, url_for, session
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input
import os
import json

app = Flask(__name__, template_folder="../templates")
app.secret_key = "food-ai-app"

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ======================
# MODEL
# ======================
classifier = tf.keras.models.load_model(
    "backend/models/food_classifier.keras"
)

# ======================
# LABELS
# ======================
with open("backend/models/class_labels.json", "r") as f:
    class_indices = json.load(f)

class_names = {v: k for k, v in class_indices.items()}


# ======================
# DISABLE CACHE
# ======================
@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


# ======================
# PREPROCESS
# ======================
def preprocess(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)
    return img


def clear_uploaded_image():
    image_name = session.get("image")
    if image_name:
        filepath = os.path.join(UPLOAD_FOLDER, image_name)
        if os.path.exists(filepath):
            os.remove(filepath)

    session["image"] = None
    session["result"] = None
    session["confidence"] = None
    session["confidence_value"] = 0


# ======================
# HOME
# ======================
@app.route("/")
def home():

    # If this GET request did NOT come from our own redirect
    # (upload/analyze/reset), it's a real page reload/fresh visit -> clear everything
    if not session.pop("_keep_state", False):
        clear_uploaded_image()

    return render_template(
        "index.html",
        image=session.get("image"),
        result=session.get("result"),
        confidence=session.get("confidence"),
        confidence_value=session.get("confidence_value", 0)
    )


# ======================
# UPLOAD (AUTO)
# ======================
@app.route("/upload", methods=["POST"])
def upload():

    file = request.files.get("file")

    if not file or file.filename == "":
        return redirect(url_for("home"))

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    session["image"] = file.filename
    session["result"] = None
    session["confidence"] = None
    session["confidence_value"] = 0

    session["_keep_state"] = True
    return redirect(url_for("home"))


# ======================
# ANALYZE
# ======================
@app.route("/analyze", methods=["POST"])
def analyze():

    image_name = session.get("image")

    if not image_name:
        return redirect(url_for("home"))

    filepath = os.path.join(UPLOAD_FOLDER, image_name)

    img = preprocess(filepath)

    predictions = classifier.predict(img, verbose=0)[0]

    best_index = int(np.argmax(predictions))
    confidence_value = float(predictions[best_index]) * 100

    food_name = class_names.get(best_index, "Unknown")

    if confidence_value < 50:
        result = "❌ Non-Food Image"
    else:
        result = food_name.replace("_", " ").title()

    session["result"] = result
    session["confidence"] = f"{confidence_value:.2f}%"
    session["confidence_value"] = confidence_value

    session["_keep_state"] = True
    return redirect(url_for("home"))


# ======================
# RESET
# ======================
@app.route("/reset", methods=["POST", "GET"])
def reset():
    clear_uploaded_image()
    return redirect(url_for("home"))


# ======================
# IMAGE ROUTE
# ======================
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# ======================
# RUN
# ======================
if __name__ == "__main__":
    app.run(debug=True, port=8000)