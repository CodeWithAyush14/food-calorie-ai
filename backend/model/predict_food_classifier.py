import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input
import json

# ======================
# LOAD MODEL
# ======================
classifier = tf.keras.models.load_model(
    "backend/models/food_classifier.keras"
)

# ======================
# LOAD CLASS LABELS
# ======================
with open("backend/models/class_labels.json", "r") as f:
    class_indices = json.load(f)

class_names = {v: k for k, v in class_indices.items()}

# ======================
# PREPROCESS IMAGE
# ======================
def preprocess(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img = image.img_to_array(img)

    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    return img

# ======================
# INPUT IMAGE
# ======================
img_path = input("Enter image path: ")

# ======================
# PREDICT
# ======================
img_array = preprocess(img_path)

predictions = classifier.predict(img_array, verbose=0)[0]

index = np.argmax(predictions)
confidence = predictions[index]

# ======================
# NOT FOOD CHECK
# ======================
if confidence < 0.50:
    print("\n❌ Not a Food Image")
    print(f"Highest Confidence: {confidence*100:.2f}%")
    exit()

# ======================
# SHOW RESULT
# ======================
print("\n✅ Prediction Result")
print("-----------------------------------")
print(f"Food: {class_names[index]}")
print(f"Confidence: {confidence*100:.2f}%")

# ======================
# TOP 5 PREDICTIONS
# ======================
top5 = np.argsort(predictions)[-5:][::-1]

print("\n🏆 Top 5 Predictions")
print("-----------------------------------")

for i in top5:
    print(f"{class_names[i]:25} {predictions[i]*100:.2f}%")

print("-----------------------------------")