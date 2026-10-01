import cv2
import numpy as np
from PIL import Image

def load_image(image_path: str) -> Image.Image:
    image = Image.open(image_path).convert("RGB")
    return image

def crop_bbox(image: Image.Image, bbox: list) -> Image.Image:
    x1, y1, x2, y2 = [int(b) for b in bbox]
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(image.width, x2), min(image.height, y2)
    cropped = image.crop((x1, y1, x2, y2))
    return cropped

def draw_detections(image_path: str, detections: list, output_path: str = None) -> np.ndarray:
    image = cv2.imread(image_path)
    for det in detections:
        x1, y1, x2, y2 = [int(b) for b in det["bbox"]]
        label = f"{det['class_name']} {det['confidence']:.2f}"
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        (w, h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 1)
        cv2.rectangle(image, (x1, y1-25), (x1+w, y1), (0, 255, 0), -1)
        cv2.putText(image, label, (x1, y1-8), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,0), 1)
    if output_path:
        cv2.imwrite(output_path, image)
    return image

if __name__ == "__main__":
    print("Image utils ready!")