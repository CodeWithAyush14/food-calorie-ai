import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam
import json
import os

# ==========================
# CONFIG
# ==========================
DATASET_DIR = "data/raw/food-101/images"
IMG_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS_STAGE1 = 20
EPOCHS_STAGE2 = 10

os.makedirs("backend/models", exist_ok=True)

# ==========================
# DATA AUGMENTATION (IMPROVED)
# ==========================
train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    validation_split=0.2,

    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    zoom_range=0.3,
    shear_range=0.2,
    horizontal_flip=True,
    brightness_range=[0.7, 1.3],
    fill_mode="nearest"
)

val_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    validation_split=0.2
)

train_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="training",
    class_mode="categorical"
)

val_generator = val_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="validation",
    class_mode="categorical"
)

# ==========================
# SAVE CLASS LABELS
# ==========================
with open("backend/models/class_labels.json", "w") as f:
    json.dump(train_generator.class_indices, f)

# ==========================
# MODEL (EfficientNetB0)
# ==========================
base_model = EfficientNetB0(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)

base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),

    layers.Dense(1024, activation="relu"),
    layers.BatchNormalization(),
    layers.Dropout(0.5),

    layers.Dense(512, activation="relu"),
    layers.Dropout(0.3),

    layers.Dense(train_generator.num_classes, activation="softmax")
])

# ==========================
# CALLBACKS
# ==========================
checkpoint = ModelCheckpoint(
    "backend/models/food_classifier.keras",
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)

early_stop = EarlyStopping(
    monitor="val_loss",
    patience=5,
    restore_best_weights=True
)

reduce_lr = ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.2,
    patience=2,
    verbose=1
)

# ==========================
# STAGE 1 TRAINING (FROZEN)
# ==========================
model.compile(
    optimizer=Adam(learning_rate=1e-3),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

print("\n🔵 Stage 1 Training (Frozen base model)\n")

model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS_STAGE1,
    callbacks=[checkpoint, early_stop, reduce_lr]
)

# ==========================
# STAGE 2 FINE TUNING (IMPORTANT)
# ==========================
print("\n🔴 Stage 2 Fine-tuning (Unfreezing last layers)\n")

base_model.trainable = True

# freeze early layers
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=Adam(learning_rate=1e-5),
    loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
    metrics=["accuracy"]
)

model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS_STAGE2,
    callbacks=[checkpoint, early_stop, reduce_lr]
)

# ==========================
# SAVE FINAL MODEL
# ==========================
model.save("backend/models/food_classifier_final.keras")

print("\n✅ Training Completed Successfully!")