import torch
from ultralytics import YOLO

class FoodDetector:
    def __init__(self, model_path="models/weights/yolo_food256_best.pt"):
        self.device = "mps" if torch.backends.mps.is_available() else "cpu"
        self.model  = YOLO(model_path)
        print(f"YOLO loaded on: {self.device}")

    def detect(self, image_path: str, conf=0.20) -> list:
        results = self.model(
            image_path,
            conf=conf,
            device=self.device,
            iou=0.45,
            max_det=10,
            agnostic_nms=True,
            verbose=False
        )
        detections = []
        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                img_h, img_w   = r.orig_shape
                area_ratio     = ((x2-x1) * (y2-y1)) / (img_h * img_w)
                detections.append({
                    "class_id"  : int(box.cls),
                    "class_name": r.names[int(box.cls)],
                    "confidence": round(float(box.conf), 3),
                    "bbox"      : [x1, y1, x2, y2],
                    "area_ratio": round(area_ratio, 4)
                })
        return detections

if __name__ == "__main__":
    print("Detector ready!")