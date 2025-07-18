import numpy as np
import json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Load the trained model once when this module is imported
model = load_model("model/plant_disease_model.h5")

# Load class labels
with open("model/class_labels.json", "r") as f:
    class_indices = json.load(f)

# Convert index → label mapping
class_labels = [label for label, _ in sorted(class_indices.items(), key=lambda x: x[1])]

def predict_disease(image_pil):
    print("[DEBUG] Received image", flush=True)

    # Preprocess the image
    img = image_pil.resize((224, 224)).convert("RGB")
    img_array = image.img_to_array(img) / 255.0
    print("[DEBUG] Array shape:", img_array.shape, flush=True)

    img_array = np.expand_dims(img_array, axis=0)
    print("[DEBUG] Final input shape:", img_array.shape, flush=True)

    # Predict
    predictions = model.predict(img_array)[0]
    print("[DEBUG] Raw predictions:", predictions, flush=True)

    # Get top 3 predictions
    top_indices = predictions.argsort()[-3:][::-1]
    print("[DEBUG] Top-3 Indices:", top_indices, flush=True)

    top_preds = [
        {
            "label": class_labels[i],
            "confidence": round(float(predictions[i]), 4),
            "percentage": round(float(predictions[i]) * 100, 2)
        }
        for i in top_indices
    ]

    final_pred = class_labels[np.argmax(predictions)]
    print("[DEBUG] Final Prediction:", final_pred, flush=True)

    return {
        "top_3_predictions": top_preds,
        "final_prediction": final_pred
    }
