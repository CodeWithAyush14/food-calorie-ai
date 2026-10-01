import os
import uuid
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from src.pipeline import FoodPipeline

load_dotenv()

app = FastAPI(
    title="Food Detection & Calorie Estimation API",
    description="AI powered food detection and calorie estimation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

pipeline = None

@app.on_event("startup")
async def startup_event():
    global pipeline
    print("Loading AI Pipeline...")
    pipeline = FoodPipeline()
    print("Pipeline ready!")

@app.get("/")
async def root():
    return {
        "message": "Food Detection API",
        "version": "1.0.0",
        "status" : "running"
    }

@app.get("/health")
async def health():
    return {
        "status"  : "ok",
        "pipeline": "ready" if pipeline else "not loaded"
    }

@app.post("/analyze")
async def analyze_food(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed!")

    temp_dir  = "logs/temp"
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = f"{temp_dir}/{uuid.uuid4()}.jpg"

    try:
        from PIL import Image as PILImage
        import io
        contents  = await file.read()
        pil_image = PILImage.open(io.BytesIO(contents)).convert("RGB")
        pil_image.save(temp_path, "JPEG", quality=95)

        result = pipeline.analyze(temp_path)

        return JSONResponse(content={
            "success"       : True,
            "total_items"   : result.get("total_items", 0),
            "total_calories": result.get("total_calories", 0),
            "message"       : result.get("message", ""),
            "detections"    : result.get("detections", [])
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.get("/nutrition/{food_name}")
async def get_nutrition(food_name: str):
    try:
        nutrition = pipeline.calorie_db.get_nutrition(food_name, 0.5)
        return JSONResponse(content={"success": True, "nutrition": nutrition})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/classes")
async def get_classes():
    return JSONResponse(content={
        "yolo_classes"      : 256,
        "classifier_classes": 101,
        "message"           : "Total supported food classes"
    })