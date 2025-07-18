
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from pymongo import MongoClient
import re
import nltk
import requests 
from nltk.corpus import stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))


# ===== Flask Setup =====
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Your frontend URL

# ===== Gemini AI Setup =====
GENAI_API_KEY = "AIzaSyA2TyeFUk_cCmKjeTNmr_oo6mQKpereoMI"  # Replace with your key
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash-latest")

# ===== MongoDB Setup ===== 
MONGO_URI ="mongodb+srv://starkkrish2005:KV8ZXKsLz7HMP3GW@cluster0.94qxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# = "mongodb+srv://starkkrish2005:KV8ZXKsLz7HMP3GW@cluster0.94qxf.mongodb.net/products?retryWrites=true&w=majority&"  # Change if needed
client = MongoClient(MONGO_URI)
db = client["products"]  # Your DB name
products_collection = db["e-commerse-websites"]  # Your collection name


import requests
from city_climates import climates

def get_climate_for_location(city_name):
   

    city_name = city_name.lower().strip()
    print(f"🌍 Looking up fallback climate for: {city_name}")
    return climates.get(city_name, None)

# def get_climate_for_location(city_name):
#     try:
#         # Step 1: Geocoding
#         geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&count=1"
#         geo_response = requests.get(geo_url).json()

#         if not geo_response.get("results"):
#             print(f"❌ Could not geocode: {city_name}")
#             return None

#         lat = geo_response["results"][0]["latitude"]
#         lon = geo_response["results"][0]["longitude"]

#         print(f"📍 Found {city_name}: lat={lat}, lon={lon}")

#         # ✅ Step 2: Climate with correct model
#         climate_url = f"https://climate-api.open-meteo.com/v1/climate?latitude={lat}&longitude={lon}&models=CMIP6"
#         climate_response = requests.get(climate_url).json()
#         print(f"🌦️ Climate API response: {climate_response}")

#         # ✅ Extract temperature and rainfall
#         temp_info = climate_response.get("temperature_2m_mean", {}).get("annual")
#         rain_info = climate_response.get("precipitation_sum", {}).get("annual")

#         temp = temp_info.get("value") if temp_info else None
#         rain = rain_info.get("value") if rain_info else None

#         print(f"🌡️ Temp: {temp} °C, 🌧️ Rain: {rain} mm")

#         if temp is not None and rain is not None:
#             if temp > 28 and rain > 1000:
#                 return "tropical"
#             elif temp > 28 and rain < 500:
#                 return "arid"
#             elif 20 < temp < 28 and 500 < rain < 1000:
#                 return "temperate"
#             elif temp < 10:
#                 return "cold"
#             else:
#                 return "semi-arid"

#         print("❓ Could not classify climate")
#         return None

#     except Exception as e:
#         print(f"🌩️ Error fetching climate for {city_name}: {e}")
#         return None




def get_plant_price(plant_name):
  

    escaped_phrase = re.escape(plant_name.strip().lower())

 
    exact = products_collection.find_one({
        "name": {"$regex": f"^{escaped_phrase}$", "$options": "i"}
    })

    if exact:
        return f"✅ The price of {exact['name']} is ₹{exact['price']}"

  
    matches = products_collection.find({
        "name": {"$regex": f".*{escaped_phrase}.*", "$options": "i"}
    })

    results = list(matches)
    if results:
        reply = "✅ Matching plants:\n"
        for plant in results:
            reply += f"- {plant['name']}: ₹{plant['price']}\n"
        return reply.strip()
    else:
        return f"❌ Sorry, I couldn't find any plants matching '{plant_name}'"



# === Helper: Recommend plants based on type and location ===
def suggest_plants_for_type_and_location(message):
    try:
        lower_msg = message.lower()
        plant_types = ["indoor", "outdoor", "flower", "flowering", "bonsai", "air purifying", "medicinal", "succulent"]
        plant_type = next((pt for pt in plant_types if pt in lower_msg), None)

        # Guess location from message
        words = lower_msg.split()
        location_candidates = [word for word in words if word not in stop_words][-3:]  # You already have stop words
        location = None
        climate = None

        for i in range(len(location_candidates)):
            candidate = " ".join(location_candidates[i:])
            climate = get_climate_for_location(candidate)
            print(climate)
            if climate:
                location = candidate
                break

        if not location or not climate:
            return "🌱 Recommended plants for Location (general): Please tell me the location's climate! (e.g., 'tropical', 'temperate', 'arid', etc.)"

        # Prompt Gemini
        if plant_type:
            prompt = f"Suggest 5–7 {plant_type} plants suitable for a {climate} climate. Just list the names in bullet points."
        else:
            prompt = f"Suggest 5–7 plants suitable for a {climate} climate. Just list the names in bullet points."

        result = model.generate_content(prompt)

        # Clean bullet formatting
        text = result.text.strip()
        lines = text.replace("*", "").split("\n")
        formatted_lines = [f"• {line.strip()}" for line in lines if line.strip()]
        cleaned_response = "\n".join(formatted_lines)

        return f"🌱 Recommended plants for {location.title()} ({plant_type if plant_type else 'general'}):\n{cleaned_response}"

    except Exception as e:
        return f"⚠️ Could not get plant suggestions. Error: {str(e)}"


# === Helper: Generic Gemini response ===
def get_gemini_response(message):
    try:
        response = model.generate_content(message)
        return response.text.strip()
    except Exception as e:
        return f"⚠️ Error calling Gemini API: {str(e)}"

# === Main Chatbot Route ===
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
   
    message = data.get("message")
    if not message:
        return jsonify({"error": "No message provided"}), 400

    lower_msg = message.lower()

    # 1️⃣ Price Query
    if "price" in lower_msg or "cost" in lower_msg:
      

        words = lower_msg.split()
        results = set()

        # Remove stop words
        filtered_words = [word for word in words if word not in stop_words and word not in ("price", "cost")]
      
        # Try 4 to 1 word phrases
        for size in range(4, 0, -1):
            for i in range(len(filtered_words) - size + 1):
                phrase = " ".join(filtered_words[i:i+size])
                print(f"🔍 Trying phrase: {phrase}")
                matched_plants = get_plant_price(phrase)

                # Collect individual lines from matching result
                if "₹" in matched_plants:
                    for line in matched_plants.split("\n"):
                        if line.startswith("- "):  # only lines with plant details
                            results.add(line.strip())

        if results:
            reply_message = "✅ Matching plants:\n" + "\n".join(sorted(results))
            return jsonify({"reply": reply_message})

        return jsonify({"reply": "❌ Sorry, I couldn't find that plant."})




    # 2️⃣ Suggestion Query
    if "suggest" in lower_msg or "recommend" in lower_msg:
        result = suggest_plants_for_type_and_location(message)
        return jsonify({"reply": result})

    # 3️⃣ Fallback: General plant QnA
    if "plant" in lower_msg:
        response = get_gemini_response(message)
        return jsonify({"reply": response})

    # 4️⃣ Out of scope
    return jsonify({"reply": "🤖 I'm designed to assist only with plant-related questions 🌿"})

# === Run Server ===
if __name__ == "__main__":
    app.run(port=5001, debug=True)
