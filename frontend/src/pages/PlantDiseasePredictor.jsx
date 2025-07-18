// src/components/PlantDiseasePredictor.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './styles/predictor.css';

function PlantDiseasePredictor() {
  const [symptom, setSymptom] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptom.trim() && !image) {
      alert('Please enter symptoms or upload an image.');
      return;
    }

    setResult('');
    setLoading(true);

    try {
      if (image) {
        const base64Image = await toBase64(image);

        console.log("🧪 base64Image:", base64Image.slice(0, 100)); // Optional log

        // ✅ Call your Express backend
        const response = await axios.post("http://localhost:5000/api/ai/disease", {

          imageBase64: base64Image,
        });

        const data = response.data;

        if (data.final_prediction) {
          setResult(
            `✅ Final Prediction: ${data.final_prediction}\n\n Top Predictions:\n` +
            data.top_3_predictions
              .map(
                (pred) => `• ${pred.label} (${(pred.confidence * 100).toFixed(2)}%)`
              )
              .join('\n')
          );
        } else {
          setResult('⚠️ Unable to detect disease from the image.');
        }
      } else {
        // Fall back to local symptom-based check
        const diagnosis = predictDisease(symptom);
        setResult(diagnosis);
      }
    } catch (error) {
      console.error('❌ Frontend error calling backend:', error);
      setResult('🚫 Error while predicting disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };


const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 224, 224);
        const resizedBase64 = canvas.toDataURL("image/jpeg"); // 🔁 Force JPEG format
        resolve(resizedBase64);
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


  const predictDisease = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('yellow') && lower.includes('leaf')) {
      return '🌿 Possible cause: Nitrogen Deficiency or Overwatering.';
    } else if (lower.includes('white') || lower.includes('spots')) {
      return '⚠️ Might be Powdery Mildew or Leaf Spot fungus.';
    } else if (lower.includes('root') && lower.includes('rot')) {
      return '🛑 Root rot detected. Avoid overwatering and repot!';
    } else {
      return '🤔 Cannot identify disease. Try giving more details or upload a clearer image.';
    }
  };

  return (
    <div className="plant-disease-predictor">
      <h2 className="pdp-title">Plant Disease Predictor</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="pdp-textarea"
          placeholder="Describe your plant's symptoms..."
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          rows={5}
        />
        <label htmlFor="image-upload" className="pdp-image-upload-label">
          Upload affected plant image:
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="pdp-file-input"
        />
        {preview && (
          <div className="pdp-image-preview">
            <img src={preview} alt="Plant preview" />
          </div>
        )}
        <button type="submit" className="pdp-submit-btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Disease'}
        </button>
      </form>

      {result && (
        <div className="pdp-result">
          {result}
        </div>
      )}

    </div>
  );
}

export default PlantDiseasePredictor;
