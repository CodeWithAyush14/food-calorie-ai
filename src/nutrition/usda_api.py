import requests
import json
from pathlib import Path

USDA_API_KEY = "FRFRkTKxgjVLmSJOfZH4IwdJC8cMERf6SeopnXIO"
USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1"
CACHE_FILE = "data/usda_cache.json"

class USDAAPI:
    def __init__(self):
        self.api_key = USDA_API_KEY
        self.cache   = self._load_cache()
        print(f"USDA API ready — {len(self.cache)} items cached")

    def _load_cache(self) -> dict:
        if Path(CACHE_FILE).exists():
            with open(CACHE_FILE) as f:
                return json.load(f)
        return {}

    def _save_cache(self):
        Path(CACHE_FILE).parent.mkdir(parents=True, exist_ok=True)
        with open(CACHE_FILE, "w") as f:
            json.dump(self.cache, f, indent=2)

    def _search_food(self, food_name: str) -> dict | None:
        try:
            url    = f"{USDA_BASE_URL}/foods/search"
            params = {
                "query"   : food_name,
                "api_key" : self.api_key,
                "pageSize": 5,
            }
            resp = requests.get(url, params=params, timeout=8)
            resp.raise_for_status()
            data = resp.json()
            if not data.get("foods"):
                return None
            return data["foods"][0]
        except Exception as e:
            print(f"USDA API error: {e}")
            return None

    def _extract_nutrients(self, food: dict) -> dict:
        nutrients = {}
        for n in food.get("foodNutrients", []):
            name  = n.get("nutrientName", "").lower()
            value = n.get("value", 0)
            if "energy" in name or "calorie" in name:
                nutrients["calories"] = round(value)
            elif "protein" in name:
                nutrients["protein"] = round(value, 1)
            elif "carbohydrate" in name and "fiber" not in name:
                nutrients["carbs"] = round(value, 1)
            elif "total lipid" in name or ("fat" in name and "fatty" not in name):
                nutrients["fat"] = round(value, 1)
            elif "fiber" in name:
                nutrients["fiber"] = round(value, 1)
            elif "sugar" in name:
                nutrients["sugar"] = round(value, 1)
            elif "sodium" in name:
                nutrients["sodium"] = round(value, 1)
        nutrients.setdefault("calories", 200)
        nutrients.setdefault("protein",  8.0)
        nutrients.setdefault("carbs",    25.0)
        nutrients.setdefault("fat",      8.0)
        nutrients.setdefault("fiber",    2.0)
        nutrients.setdefault("sugar",    5.0)
        nutrients.setdefault("sodium",   100.0)
        return nutrients

    def get_nutrition(self, food_name: str) -> dict:
        key = food_name.lower().replace("_", " ")
        if key in self.cache:
            return self.cache[key]

        print(f"USDA API fetching: {key}")
        food = self._search_food(key)

        if food:
            nutrients = self._extract_nutrients(food)
            result = {
                "food_name": food.get("description", key),
                "calories" : nutrients["calories"],
                "protein"  : nutrients["protein"],
                "carbs"    : nutrients["carbs"],
                "fat"      : nutrients["fat"],
                "fiber"    : nutrients["fiber"],
                "sugar"    : nutrients["sugar"],
                "sodium"   : nutrients["sodium"],
                "source"   : "USDA FoodData Central",
                "fdc_id"   : food.get("fdcId", "")
            }
        else:
            result = {
                "food_name": key,
                "calories" : 200,
                "protein"  : 8.0,
                "carbs"    : 25.0,
                "fat"      : 8.0,
                "fiber"    : 2.0,
                "sugar"    : 5.0,
                "sodium"   : 100.0,
                "source"   : "Fallback"
            }

        self.cache[key] = result
        self._save_cache()
        return result

if __name__ == "__main__":
    api = USDAAPI()
    data = api.get_nutrition("pizza")
    print(data)