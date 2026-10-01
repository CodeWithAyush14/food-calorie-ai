import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

FALLBACK_DB = {
    "apple_pie":               {"calories": 296, "protein": 2.4,  "carbs": 43.0, "fat": 13.0},
    "baby_back_ribs":          {"calories": 290, "protein": 24.0, "carbs": 0.0,  "fat": 21.0},
    "baklava":                 {"calories": 334, "protein": 5.0,  "carbs": 40.0, "fat": 18.0},
    "beef_carpaccio":          {"calories": 150, "protein": 20.0, "carbs": 1.0,  "fat": 7.0},
    "beef_tartare":            {"calories": 196, "protein": 20.0, "carbs": 2.0,  "fat": 12.0},
    "beet_salad":              {"calories": 110, "protein": 3.0,  "carbs": 18.0, "fat": 4.0},
    "beignets":                {"calories": 320, "protein": 5.0,  "carbs": 42.0, "fat": 15.0},
    "bibimbap":                {"calories": 490, "protein": 22.0, "carbs": 70.0, "fat": 12.0},
    "bread_pudding":           {"calories": 320, "protein": 7.0,  "carbs": 50.0, "fat": 10.0},
    "breakfast_burrito":       {"calories": 380, "protein": 18.0, "carbs": 40.0, "fat": 16.0},
    "bruschetta":              {"calories": 180, "protein": 5.0,  "carbs": 28.0, "fat": 6.0},
    "caesar_salad":            {"calories": 190, "protein": 8.0,  "carbs": 10.0, "fat": 14.0},
    "cannoli":                 {"calories": 220, "protein": 5.0,  "carbs": 28.0, "fat": 10.0},
    "caprese_salad":           {"calories": 180, "protein": 10.0, "carbs": 6.0,  "fat": 13.0},
    "carrot_cake":             {"calories": 350, "protein": 4.0,  "carbs": 48.0, "fat": 17.0},
    "ceviche":                 {"calories": 130, "protein": 18.0, "carbs": 8.0,  "fat": 3.0},
    "cheesecake":              {"calories": 321, "protein": 6.0,  "carbs": 31.0, "fat": 20.0},
    "cheese_plate":            {"calories": 350, "protein": 18.0, "carbs": 5.0,  "fat": 28.0},
    "chicken_curry":           {"calories": 280, "protein": 22.0, "carbs": 12.0, "fat": 16.0},
    "chicken_quesadilla":      {"calories": 350, "protein": 20.0, "carbs": 32.0, "fat": 16.0},
    "chicken_wings":           {"calories": 290, "protein": 24.0, "carbs": 0.0,  "fat": 20.0},
    "chocolate_cake":          {"calories": 367, "protein": 5.0,  "carbs": 51.0, "fat": 17.0},
    "chocolate_mousse":        {"calories": 280, "protein": 5.0,  "carbs": 25.0, "fat": 18.0},
    "churros":                 {"calories": 320, "protein": 4.0,  "carbs": 42.0, "fat": 15.0},
    "clam_chowder":            {"calories": 190, "protein": 10.0, "carbs": 18.0, "fat": 9.0},
    "club_sandwich":           {"calories": 440, "protein": 28.0, "carbs": 38.0, "fat": 18.0},
    "crab_cakes":              {"calories": 220, "protein": 16.0, "carbs": 12.0, "fat": 11.0},
    "creme_brulee":            {"calories": 280, "protein": 5.0,  "carbs": 26.0, "fat": 18.0},
    "croque_madame":           {"calories": 420, "protein": 22.0, "carbs": 28.0, "fat": 24.0},
    "cup_cakes":               {"calories": 300, "protein": 3.0,  "carbs": 42.0, "fat": 14.0},
    "deviled_eggs":            {"calories": 140, "protein": 8.0,  "carbs": 1.0,  "fat": 11.0},
    "donuts":                  {"calories": 340, "protein": 4.0,  "carbs": 42.0, "fat": 18.0},
    "dumplings":               {"calories": 250, "protein": 12.0, "carbs": 32.0, "fat": 8.0},
    "edamame":                 {"calories": 120, "protein": 11.0, "carbs": 9.0,  "fat": 5.0},
    "eggs_benedict":           {"calories": 360, "protein": 18.0, "carbs": 22.0, "fat": 22.0},
    "escargots":               {"calories": 130, "protein": 16.0, "carbs": 2.0,  "fat": 7.0},
    "falafel":                 {"calories": 330, "protein": 13.0, "carbs": 32.0, "fat": 18.0},
    "filet_mignon":            {"calories": 270, "protein": 30.0, "carbs": 0.0,  "fat": 16.0},
    "fish_and_chips":          {"calories": 520, "protein": 24.0, "carbs": 52.0, "fat": 24.0},
    "foie_gras":               {"calories": 380, "protein": 12.0, "carbs": 4.0,  "fat": 36.0},
    "french_fries":            {"calories": 312, "protein": 3.4,  "carbs": 41.0, "fat": 15.0},
    "french_onion_soup":       {"calories": 180, "protein": 8.0,  "carbs": 18.0, "fat": 8.0},
    "french_toast":            {"calories": 270, "protein": 8.0,  "carbs": 34.0, "fat": 11.0},
    "fried_calamari":          {"calories": 280, "protein": 16.0, "carbs": 22.0, "fat": 14.0},
    "fried_rice":              {"calories": 280, "protein": 7.0,  "carbs": 40.0, "fat": 10.0},
    "frozen_yogurt":           {"calories": 160, "protein": 4.0,  "carbs": 30.0, "fat": 3.0},
    "garlic_bread":            {"calories": 230, "protein": 5.0,  "carbs": 28.0, "fat": 11.0},
    "gnocchi":                 {"calories": 250, "protein": 6.0,  "carbs": 48.0, "fat": 3.0},
    "greek_salad":             {"calories": 170, "protein": 5.0,  "carbs": 10.0, "fat": 13.0},
    "grilled_cheese_sandwich": {"calories": 380, "protein": 14.0, "carbs": 32.0, "fat": 22.0},
    "grilled_salmon":          {"calories": 280, "protein": 34.0, "carbs": 0.0,  "fat": 16.0},
    "guacamole":               {"calories": 150, "protein": 2.0,  "carbs": 8.0,  "fat": 13.0},
    "gyoza":                   {"calories": 220, "protein": 10.0, "carbs": 26.0, "fat": 8.0},
    "hamburger":               {"calories": 480, "protein": 26.0, "carbs": 38.0, "fat": 24.0},
    "hot_and_sour_soup":       {"calories": 110, "protein": 6.0,  "carbs": 14.0, "fat": 3.0},
    "hot_dog":                 {"calories": 290, "protein": 10.0, "carbs": 24.0, "fat": 17.0},
    "huevos_rancheros":        {"calories": 340, "protein": 16.0, "carbs": 28.0, "fat": 18.0},
    "hummus":                  {"calories": 170, "protein": 8.0,  "carbs": 14.0, "fat": 10.0},
    "ice_cream":               {"calories": 210, "protein": 3.5,  "carbs": 24.0, "fat": 11.0},
    "lasagna":                 {"calories": 320, "protein": 18.0, "carbs": 28.0, "fat": 14.0},
    "lobster_bisque":          {"calories": 220, "protein": 12.0, "carbs": 16.0, "fat": 12.0},
    "lobster_roll_sandwich":   {"calories": 410, "protein": 22.0, "carbs": 36.0, "fat": 18.0},
    "macaroni_and_cheese":     {"calories": 320, "protein": 12.0, "carbs": 40.0, "fat": 13.0},
    "macarons":                {"calories": 280, "protein": 3.0,  "carbs": 42.0, "fat": 12.0},
    "miso_soup":               {"calories": 40,  "protein": 3.0,  "carbs": 5.0,  "fat": 1.0},
    "mussels":                 {"calories": 170, "protein": 24.0, "carbs": 7.0,  "fat": 4.0},
    "nachos":                  {"calories": 420, "protein": 12.0, "carbs": 42.0, "fat": 24.0},
    "omelette":                {"calories": 190, "protein": 14.0, "carbs": 2.0,  "fat": 14.0},
    "onion_rings":             {"calories": 310, "protein": 5.0,  "carbs": 38.0, "fat": 16.0},
    "oysters":                 {"calories": 110, "protein": 12.0, "carbs": 6.0,  "fat": 4.0},
    "pad_thai":                {"calories": 350, "protein": 16.0, "carbs": 42.0, "fat": 12.0},
    "paella":                  {"calories": 340, "protein": 20.0, "carbs": 40.0, "fat": 10.0},
    "pancakes":                {"calories": 250, "protein": 6.0,  "carbs": 38.0, "fat": 9.0},
    "panna_cotta":             {"calories": 220, "protein": 4.0,  "carbs": 22.0, "fat": 13.0},
    "peking_duck":             {"calories": 340, "protein": 22.0, "carbs": 8.0,  "fat": 24.0},
    "pho":                     {"calories": 290, "protein": 20.0, "carbs": 38.0, "fat": 5.0},
    "pizza":                   {"calories": 285, "protein": 12.0, "carbs": 36.0, "fat": 10.0},
    "pork_chop":               {"calories": 280, "protein": 28.0, "carbs": 0.0,  "fat": 18.0},
    "poutine":                 {"calories": 480, "protein": 14.0, "carbs": 52.0, "fat": 24.0},
    "prime_rib":               {"calories": 400, "protein": 32.0, "carbs": 0.0,  "fat": 30.0},
    "pulled_pork_sandwich":    {"calories": 450, "protein": 28.0, "carbs": 40.0, "fat": 18.0},
    "ramen":                   {"calories": 380, "protein": 18.0, "carbs": 48.0, "fat": 12.0},
    "ravioli":                 {"calories": 260, "protein": 12.0, "carbs": 36.0, "fat": 8.0},
    "red_velvet_cake":         {"calories": 360, "protein": 4.0,  "carbs": 50.0, "fat": 17.0},
    "risotto":                 {"calories": 310, "protein": 8.0,  "carbs": 48.0, "fat": 10.0},
    "samosa":                  {"calories": 260, "protein": 5.0,  "carbs": 30.0, "fat": 14.0},
    "sashimi":                 {"calories": 130, "protein": 22.0, "carbs": 0.0,  "fat": 4.0},
    "scallops":                {"calories": 140, "protein": 20.0, "carbs": 6.0,  "fat": 3.0},
    "seaweed_salad":           {"calories": 90,  "protein": 2.0,  "carbs": 12.0, "fat": 4.0},
    "shrimp_and_grits":        {"calories": 380, "protein": 24.0, "carbs": 34.0, "fat": 16.0},
    "spaghetti_bolognese":     {"calories": 380, "protein": 20.0, "carbs": 46.0, "fat": 12.0},
    "spaghetti_carbonara":     {"calories": 420, "protein": 18.0, "carbs": 48.0, "fat": 18.0},
    "spring_rolls":            {"calories": 200, "protein": 6.0,  "carbs": 24.0, "fat": 10.0},
    "steak":                   {"calories": 320, "protein": 34.0, "carbs": 0.0,  "fat": 20.0},
    "strawberry_shortcake":    {"calories": 280, "protein": 4.0,  "carbs": 42.0, "fat": 11.0},
    "sushi":                   {"calories": 200, "protein": 10.0, "carbs": 30.0, "fat": 4.0},
    "tacos":                   {"calories": 210, "protein": 12.0, "carbs": 20.0, "fat": 9.0},
    "takoyaki":                {"calories": 200, "protein": 8.0,  "carbs": 24.0, "fat": 8.0},
    "tiramisu":                {"calories": 290, "protein": 5.0,  "carbs": 30.0, "fat": 17.0},
    "tuna_tartare":            {"calories": 160, "protein": 22.0, "carbs": 4.0,  "fat": 6.0},
    "waffles":                 {"calories": 290, "protein": 7.0,  "carbs": 38.0, "fat": 13.0},
}

class CalorieDB:
    def __init__(self):
        try:
            from src.nutrition.usda_api import USDAAPI
            self.usda     = USDAAPI()
            self.use_usda = True
            print("CalorieDB: USDA API enabled")
        except Exception as e:
            self.usda     = None
            self.use_usda = False
            print(f"CalorieDB: USDA API disabled — {e}")
        self.fallback = FALLBACK_DB
        print(f"CalorieDB ready — {len(self.fallback)} fallback items")

    def get_nutrition(self, food_name: str, area_ratio: float = 0.3) -> dict:
        name  = food_name.lower().replace(" ", "_").replace("-", "_")
        query = food_name.lower().replace("_", " ")
        scale = max(0.2, min(area_ratio * 2.5, 1.8))
        per_100g = None

        if self.use_usda:
            try:
                usda_data = self.usda.get_nutrition(query)
                if usda_data.get("source") == "USDA FoodData Central":
                    per_100g = {
                        "calories": usda_data["calories"],
                        "protein" : usda_data["protein"],
                        "carbs"   : usda_data["carbs"],
                        "fat"     : usda_data["fat"],
                    }
            except Exception as e:
                print(f"USDA lookup failed: {e}")

        if not per_100g:
            if name in self.fallback:
                per_100g = self.fallback[name]
            else:
                matches = [k for k in self.fallback if name in k or k in name]
                per_100g = self.fallback[matches[0]] if matches else \
                           {"calories": 200, "protein": 8.0, "carbs": 25.0, "fat": 8.0}

        return {
            "food_name"       : query,
            "calories"        : round(per_100g["calories"] * scale),
            "protein_g"       : round(per_100g["protein"]  * scale, 1),
            "carbs_g"         : round(per_100g["carbs"]    * scale, 1),
            "fat_g"           : round(per_100g["fat"]      * scale, 1),
            "portion_estimate": f"{int(200 * scale)}g (estimated)",
            "per_100g"        : per_100g,
            "source"          : "USDA FoodData Central" if self.use_usda else "Local DB"
        }

if __name__ == "__main__":
    db = CalorieDB()
    print(db.get_nutrition("pizza", 0.5))