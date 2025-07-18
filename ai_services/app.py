from flask import Flask
from flask_cors import CORS
from routes.chatbot import chatbot_bp
from routes.predict import predict_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Register Blueprints
app.register_blueprint(chatbot_bp, url_prefix="/chatbot")
app.register_blueprint(predict_bp, url_prefix="/predict")

if __name__ == "__main__":
    app.run(port=5001, debug=True)
