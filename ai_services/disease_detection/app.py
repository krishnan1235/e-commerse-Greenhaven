from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_disease
import base64
import io
from PIL import Image
import traceback

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        image_base64 = data.get("imageBase64")

        if not image_base64:
            return jsonify({"error": "No image provided"}), 400

        print("[DEBUG] Received base64 string of length:", len(image_base64), flush=True)

        # Remove base64 prefix (e.g., data:image/webp;base64,xxxxx)
        if "," in image_base64:
            image_base64 = image_base64.split(",", 1)[1]

        # Decode and load image
        img_data = base64.b64decode(image_base64)
        image_pil = Image.open(io.BytesIO(img_data)).convert("RGB")
        print("[DEBUG] Image successfully loaded", flush=True)

        # Make prediction
        result = predict_disease(image_pil)
        print("[DEBUG] Prediction Result:", result, flush=True)

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            "error": "Cannot identify disease. Please upload a clearer image.",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(port=5002, debug=True)
