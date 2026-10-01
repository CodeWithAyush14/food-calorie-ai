from src.detection.detector import FoodDetector
from src.classification.classifier import FoodClassifier
from src.nutrition.calorie_db import CalorieDB
from src.utils.image_utils import load_image, crop_bbox
from PIL import Image

VALID_FOOD_CLASSES = {
    "apple_pie", "baby_back_ribs", "baklava", "beef_carpaccio",
    "beef_tartare", "beet_salad", "beignets", "bibimbap",
    "bread_pudding", "breakfast_burrito", "bruschetta", "caesar_salad",
    "cannoli", "caprese_salad", "carrot_cake", "ceviche", "cheesecake",
    "cheese_plate", "chicken_curry", "chicken_quesadilla", "chicken_wings",
    "chocolate_cake", "chocolate_mousse", "churros", "clam_chowder",
    "club_sandwich", "crab_cakes", "creme_brulee", "croque_madame",
    "cup_cakes", "deviled_eggs", "donuts", "dumplings", "edamame",
    "eggs_benedict", "escargots", "falafel", "filet_mignon",
    "fish_and_chips", "foie_gras", "french_fries", "french_onion_soup",
    "french_toast", "fried_calamari", "fried_rice", "frozen_yogurt",
    "garlic_bread", "gnocchi", "greek_salad", "grilled_cheese_sandwich",
    "grilled_salmon", "guacamole", "gyoza", "hamburger", "hot_and_sour_soup",
    "hot_dog", "huevos_rancheros", "hummus", "ice_cream", "lasagna",
    "lobster_bisque", "lobster_roll_sandwich", "macaroni_and_cheese",
    "macarons", "miso_soup", "mussels", "nachos", "omelette",
    "onion_rings", "oysters", "pad_thai", "paella", "pancakes",
    "panna_cotta", "peking_duck", "pho", "pizza", "pork_chop",
    "poutine", "prime_rib", "pulled_pork_sandwich", "ramen",
    "ravioli", "red_velvet_cake", "risotto", "samosa", "sashimi",
    "scallops", "seaweed_salad", "shrimp_and_grits", "spaghetti_bolognese",
    "spaghetti_carbonara", "spring_rolls", "steak", "strawberry_shortcake",
    "sushi", "tacos", "takoyaki", "tiramisu", "tuna_tartare", "waffles"
}

MIN_YOLO_CONF     = 0.20
MIN_CLASSIFY_CONF = 0.35

NO_FOOD_RESPONSE = {
    "detections"     : [],
    "total_calories" : 0,
    "total_items"    : 0,
    "message"        : "NO_FOOD",
    "error"          : "No food detected. Please upload a clear food image."
}

class FoodPipeline:
    def __init__(self):
        print("Loading models...")
        self.detector   = FoodDetector()
        self.classifier = FoodClassifier()
        self.calorie_db = CalorieDB()
        print("Pipeline ready!")

    def _iou(self, box1, box2) -> float:
        x1 = max(box1[0], box2[0])
        y1 = max(box1[1], box2[1])
        x2 = min(box1[2], box2[2])
        y2 = min(box1[3], box2[3])
        intersection = max(0, x2-x1) * max(0, y2-y1)
        area1 = (box1[2]-box1[0]) * (box1[3]-box1[1])
        area2 = (box2[2]-box2[0]) * (box2[3]-box2[1])
        union = area1 + area2 - intersection
        return intersection / union if union > 0 else 0

    def _is_valid_food(self, class_name: str, confidence: float) -> bool:
        name = class_name.lower().replace(" ", "_").replace("-", "_")
        return name in VALID_FOOD_CLASSES and confidence >= MIN_CLASSIFY_CONF

    def analyze(self, image_path: str) -> dict:
        image        = load_image(image_path)
        results      = []
        seen_classes = set()
        seen_boxes   = []

        # Step 1 — YOLO Detection
        detections = self.detector.detect(image_path, conf=MIN_YOLO_CONF)

        if not detections:
            return NO_FOOD_RESPONSE

        detections = sorted(detections, key=lambda x: x["confidence"], reverse=True)

        # Step 2 — Classify each detection
        for det in detections:
            is_overlap = any(self._iou(det["bbox"], b) > 0.70 for b in seen_boxes)
            if is_overlap:
                continue

            cropped         = crop_bbox(image, det["bbox"])
            classifications = self.classifier.classify_crop(cropped, top_k=3)
            best_class      = classifications[0]["class_name"]
            best_conf       = classifications[0]["confidence"]

            if not self._is_valid_food(best_class, best_conf):
                continue
            if best_class in seen_classes:
                continue

            seen_classes.add(best_class)
            seen_boxes.append(det["bbox"])

            # Step 3 — Nutrition lookup
            nutrition = self.calorie_db.get_nutrition(best_class, det["area_ratio"])

            results.append({
                "detected_as"  : det["class_name"],
                "classified_as": best_class,
                "confidence"   : best_conf,
                "top3_classes" : classifications,
                "bbox"         : det["bbox"],
                "area_ratio"   : det["area_ratio"],
                "nutrition"    : nutrition,
                "method"       : "YOLO + EfficientNet"
            })

        if not results:
            return NO_FOOD_RESPONSE

        total_calories = sum(r["nutrition"]["calories"] for r in results)

        return {
            "detections"    : results,
            "total_calories": total_calories,
            "total_items"   : len(results),
            "message"       : "Success"
        }

if __name__ == "__main__":
    import sys
    pipeline = FoodPipeline()
    if len(sys.argv) > 1:
        result = pipeline.analyze(sys.argv[1])
        print(f"Total items    : {result['total_items']}")
        print(f"Total calories : {result['total_calories']} kcal")
        for det in result.get("detections", []):
            print(f"  {det['classified_as']} — {det['nutrition']['calories']} kcal")
    else:
        print("Pipeline ready!")