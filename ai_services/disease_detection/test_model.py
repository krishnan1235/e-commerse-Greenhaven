import numpy as np
import json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Load the trained model
model = load_model("model/plant_disease_model.h5")

# Load the class labels
with open("model/class_labels.json", "r") as f:
    class_indices = json.load(f)

# Convert index → label mapping
class_labels = [label for label, _ in sorted(class_indices.items(), key=lambda x: x[1])]

# Load and preprocess test image
img_path = "./MG_pathology.webp"  # Update to actual test image path
img = image.load_img(img_path, target_size=(224, 224))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Make prediction
predictions = model.predict(img_array)[0]
top_indices = predictions.argsort()[-3:][::-1]

# Show top-3 predictions
print("\nTop-3 Predictions:")
for i in top_indices:
    print(f"{class_labels[i]}: {predictions[i]:.4f}")

# Final predicted class
print("\n✅ Final Prediction:", class_labels[np.argmax(predictions)])
