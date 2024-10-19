from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from joblib import dump, load
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

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
    model = load_kot_model()
    data = request.json

    # Check if the required fields are present
    if not data or 'Created' not in data or 'price' not in data:
        return jsonify({'error': 'Invalid data format, please provide Created and price'}), 400

    # Prepare the DataFrame from received data
    new_data = pd.DataFrame(data)
    new_data['Created'] = pd.to_datetime(new_data['Created'])  # Convert 'Created' to datetime
    new_data.set_index('Created', inplace=True)  # Set 'Created' as the index

    # Predicting KOT using the loaded model
    forecast_steps = len(new_data)  # Number of steps to predict based on the new data
    sarima = model.fit()  # Fit the SARIMA model
    forecast = sarima.get_forecast(steps=forecast_steps)  # Forecast

    # Extract the predicted values
    predicted_kot = forecast.predicted_mean.values.flatten().tolist()  # Get the forecasted values

    # Prepare the response
    response = {
        'predicted_kot': predicted_kot  # Convert to list for JSON serialization
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
    data = request.json

    # Create a DataFrame from the received data
    if not data or 'Sub_Total' not in data or 'Timestamp' not in data:
        return jsonify({'error': 'Invalid data format, please provide Sub_Total and Timestamp'}), 400

    # Prepare the DataFrame
    new_data = pd.DataFrame(data)
    new_data['Timestamp'] = pd.to_datetime(new_data['Timestamp'])
    new_data.set_index('Timestamp', inplace=True)

    # Forecasting
    forecast_steps = len(new_data)  # Number of steps to forecast based on the new data

    # Get forecast
    sarimax = model.fit()
    forecast_result = sarimax.get_forecast(steps=forecast_steps)
    forecast = forecast_result.predicted_mean

    # Prepare the response
    response = {
        'forecast': forecast.tolist()  # Convert to list for JSON serialization
    }

    return jsonify(response), 200

    
@app.route('/inventory-predict', methods=['POST'])
def inventory_predict():
    model = load_inventory_model()
    data = request.json

    # Check if the required fields are present
    if not data or 'Date' not in data or 'Quantity' not in data:
        return jsonify({'error': 'Invalid data format, please provide date and quantity'}), 400

    # Prepare the DataFrame from received data
    new_data = pd.DataFrame(data)
    new_data['Date'] = pd.to_datetime(new_data['Date'])  # Convert to datetime
    new_data.set_index('Date', inplace=True)

    # Forecasting using the loaded model
    forecast_steps = len(new_data)  # Number of steps to forecast based on the new data
    sarimax = model.fit()
    forecast = sarimax.get_forecast(steps=forecast_steps)

    # Extract the forecasted values
    forecast_values = forecast.predicted_mean.values.flatten().tolist()  # Use .predicted_mean to get the values

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
