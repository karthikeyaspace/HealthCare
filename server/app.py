from flask import Flask, request
from flask_cors import CORS
from joblib import load
import csv
import numpy as np
from dotenv import load_dotenv
import os

load_dotenv()
frontend_url = os.environ.get('FRONTEND_URL')


model = load('model.joblib')
app = Flask(__name__)
CORS(app, origins=[frontend_url], methods=['GET', 'POST'])



@app.route('/params', methods=['GET'])
def getModelParams():
    with open('data/Training.csv') as f:
        reader = csv.DictReader(f)
        reader.fieldnames.remove('prognosis')
        col_names = reader.fieldnames  
        return {'params': col_names[:-1]}
    return None


@app.route('/predict', methods=['POST'])
def predict():
    X = request.get_json()
    print(X)
    X = np.array(X).reshape(1, -1)
    y_pred = model.predict(X)

    disease = y_pred[0]

    with open('data/symptom_Description.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Disease'] == disease:
                print(row['Description'])
                return {'prediction': y_pred.tolist(),'description': row['Description']}

    return {'description': 'No description found'}



@app.route('/description', methods=['POST'])
def getDescription():
    disease = request.get_json()   
    disease = disease['0'] 
    print(disease)
    with open('data/symptom_Description.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Disease'] == disease:
                print(row['Description'])
                return {'description': row['Description']}

    return {'description': 'No description found'}

@app.route('/precaution', methods=['POST'])
def getPrecaution():
    disease = request.get_json()
    disease = disease[0]
    print(disease)
    with open('data/symptom_precaution.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Disease'] == disease:
                precautions = [row['Precaution_1'], row['Precaution_2'], row['Precaution_3'], row['Precaution_4']]
                print(precautions)
                return {'precautions': precautions}

    return {'precautions': ['No precautions found', 'nope']}

if __name__ == '__main__':
    app.run(debug=True)