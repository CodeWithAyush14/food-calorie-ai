import os
import shutil
import random
from pathlib import Path

# ─── Paths ───────────────────────────────────────────
UEC_ROOT = Path("data/raw/uecfood256/UECFOOD256")
OUTPUT   = Path("data/processed")
IMAGES   = OUTPUT / "images"
LABELS   = OUTPUT / "labels"

# Train / Val / Test split ratio
TRAIN, VAL, TEST = 0.7, 0.2, 0.1

# ─── Read category.txt ───────────────────────────────
def load_categories(cat_file):
    categories = {}
    with open(cat_file) as f:
        next(f)  # skip header line "id name"
        for line in f:
            parts = line.strip().split(" ", 1)
            if len(parts) == 2:
                categories[int(parts[0])] = parts[1]
    return categories

# ─── Create output folders ───────────────────────────
def create_folders():
    for split in ["train", "val", "test"]:
        (IMAGES / split).mkdir(parents=True, exist_ok=True)
        (LABELS / split).mkdir(parents=True, exist_ok=True)
    print("Output folders created")

# ─── Convert UEC to YOLO format ──────────────────────
def convert(categories):
    all_images = []

    for cat_id, cat_name in categories.items():
        cat_folder = UEC_ROOT / str(cat_id)
        if not cat_folder.exists():
            continue

        images = list(cat_folder.glob("*.jpg"))
        for img in images:
            all_images.append((img, cat_id - 1))  # YOLO class id starts at 0

    # Shuffle
    random.seed(42)
    random.shuffle(all_images)

    # Split
    total     = len(all_images)
    train_end = int(total * TRAIN)
    val_end   = int(total * (TRAIN + VAL))

    splits = {
        "train": all_images[:train_end],
        "val"  : all_images[train_end:val_end],
        "test" : all_images[val_end:]
    }

    print(f"Total images : {total}")
    print(f"Train        : {len(splits['train'])}")
    print(f"Val          : {len(splits['val'])}")
    print(f"Test         : {len(splits['test'])}")

    for split, items in splits.items():
        for img_path, class_id in items:
            # Copy image
            dest_img = IMAGES / split / img_path.name
            shutil.copy(img_path, dest_img)

            # Create YOLO label  (center_x center_y width height — full image box)
            label_file = LABELS / split / (img_path.stem + ".txt")
            with open(label_file, "w") as f:
                f.write(f"{class_id} 0.5 0.5 1.0 1.0\n")

    print("Conversion done!")

# ─── Save YAML config ────────────────────────────────
def save_yaml(categories):
    yaml_path = Path("data/food256.yaml")
    names = [categories[i] for i in sorted(categories.keys())]
    with open(yaml_path, "w") as f:
        f.write(f"path: data/processed\n")
        f.write(f"train: images/train\n")
        f.write(f"val: images/val\n")
        f.write(f"test: images/test\n\n")
        f.write(f"nc: {len(categories)}\n")
        f.write(f"names:\n")
        for name in names:
            f.write(f"  - {name}\n")
    print(f"YAML saved at {yaml_path}")

# ─── Main ────────────────────────────────────────────
if __name__ == "__main__":
    print("Starting UEC Food-256 conversion...")
    categories = load_categories(UEC_ROOT / "category.txt")
    print(f"Found {len(categories)} categories")
    create_folders()
    convert(categories)
    save_yaml(categories)
    print("All done!")