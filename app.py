from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from joblib import dump, load
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def load_sales_model():
    with open('model/sales_model.joblib', 'rb') as f:
        model = load(f)
    return model

def load_kot_model():
    with open('model/kot_model.joblib', 'rb') as f:
        model = load(f)
    return model

def load_inventory_model():
    with open('model/inventory_model.joblib', 'rb') as f:
        model = load(f)
    return model

def verify_model(file_path):
    try:
        with open(file_path, 'rb') as f:
            model = load(f)
        print(f"Model loaded successfully from {file_path}.")
    except Exception as e:
        print(f"Error loading model from {file_path}: {e}")

@app.route('/')
def home():
    return "Hello, World! This is a basic Flask app."

@app.route('/kot-predict', methods=['POST'])
def kot_predict():
    # Load the model
    model = load_kot_model()
    
    # Parse the JSON request
    data = request.json  # This should extract JSON from the request body
    
    # Ensure forecast_steps is included and valid
    if not data or 'forecast_steps' not in data:
        return jsonify({'error': 'Invalid data format, please provide forecast_steps'}), 400

    forecast_steps = data['forecast_steps']  # Extract the number of steps to forecast
    
    # Fit the SARIMA model
    sarima = model.fit()
    
    # Forecast the KOT for the given number of steps
    forecast = sarima.get_forecast(steps=forecast_steps)
    
    # Extract the predicted values
    predicted_kot = forecast.predicted_mean.values.flatten().tolist()  # Convert to a list
    
    # Prepare the response
    response = {
        'predicted_kot': predicted_kot  # JSON serializable format
    }

    return jsonify(response), 200


    
label_encoders = {
    'Payment_Type': LabelEncoder(),
    'Category': LabelEncoder(),
    'Area': LabelEncoder(),
    'Raw_Material': LabelEncoder(),
    'Sub_Category': LabelEncoder(),
}

@app.route('/sales-predict', methods=['POST'])
def sales_predict():
    model = load_sales_model()
    data = request.json  # This should extract JSON from the request body
    
    # Ensure forecast_steps is included and valid
    if not data or 'forecast_steps' not in data:
        return jsonify({'error': 'Invalid data format, please provide forecast_steps'}), 400

    forecast_steps = data['forecast_steps']  # Extract the number of steps to forecast
    
    # Fit the SARIMA model
    sarima = model.fit()
    
    # Forecast the KOT for the given number of steps
    forecast = sarima.get_forecast(steps=forecast_steps)
    
    forecast_values = forecast.predicted_mean.values.flatten().tolist() 

    # Prepare the response
    response = {
        'forecast': forecast_values  # Convert to list for JSON serialization
    }

    return jsonify(response), 200

    
@app.route('/inventory-predict', methods=['POST'])
def inventory_predict():
    model = load_inventory_model()
    
    data = request.json  # This should extract JSON from the request body
    
    # Ensure forecast_steps is included and valid
    if not data or 'forecast_steps' not in data:
        return jsonify({'error': 'Invalid data format, please provide forecast_steps'}), 400

    forecast_steps = data['forecast_steps']  # Extract the number of steps to forecast
    
    # Fit the SARIMA model
    sarima = model.fit()
    
    # Forecast the KOT for the given number of steps
    forecast = sarima.get_forecast(steps=forecast_steps)
    
    # Extract the predicted values
    forecast_values = forecast.predicted_mean.values.flatten().tolist()  # Convert to a list

    # Prepare the response
    response = {
        'forecast': forecast_values  # Convert to list for JSON serialization
    }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
    model_files = [
        'model/sales_model.joblib',
        'model/kot_model.joblib',
        'model/inventory_model.joblib'
    ]
     
    for model_file in model_files:
        verify_model(model_file)
