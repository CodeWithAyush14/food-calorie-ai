import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.efficientnet import preprocess_input
from sklearn.metrics import classification_report, confusion_matrix, f1_score, precision_score, recall_score

DATASET_DIR = "data/raw/food-101/images"
IMG_SIZE = (224, 224)
BATCH_SIZE = 16

# Load model
model = tf.keras.models.load_model("backend/models/food_classifier_final.keras")

# Validation data (same split as training)
val_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    validation_split=0.2
)

val_generator = val_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="validation",
    class_mode="categorical",
    shuffle=False
)

# Predict
print("Running predictions on validation set...")
predictions = model.predict(val_generator, verbose=1)
y_pred = np.argmax(predictions, axis=1)
y_true = val_generator.classes

# Metrics
acc = np.mean(y_pred == y_true)
f1 = f1_score(y_true, y_pred, average="weighted")
precision = precision_score(y_true, y_pred, average="weighted")
recall = recall_score(y_true, y_pred, average="weighted")

print("\n========== OVERALL METRICS ==========")
print(f"Accuracy:  {acc*100:.2f}%")
print(f"Precision: {precision*100:.2f}%")
print(f"Recall:    {recall*100:.2f}%")
print(f"F1-Score:  {f1*100:.2f}%")

# Detailed per-class report (optional, long output)
print("\n========== CLASSIFICATION REPORT ==========")
class_names = list(val_generator.class_indices.keys())
print(classification_report(y_true, y_pred, target_names=class_names, digits=3))

# Confusion matrix (optional - large 101x101, save instead of printing)
cm = confusion_matrix(y_true, y_pred)
np.save("backend/models/confusion_matrix.npy", cm)
print("\nConfusion matrix saved to backend/models/confusion_matrix.npy (101x101)")