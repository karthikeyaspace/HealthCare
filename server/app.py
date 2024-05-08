from flask import Flask, request
from flask_cors import CORS
from joblib import load
import csv
import numpy as np
from dotenv import load_dotenv
import os
import json

load_dotenv()
frontend_url = os.environ.get('FRONTEND_URL')


model = load('models/model.joblib')
app = Flask(__name__)
CORS(app, origins=[frontend_url], methods=['GET', 'POST'])


def diseasePred(symptoms):
    symptoms = np.asarray(symptoms).reshape(1, -1)
    disease = model.predict(symptoms)
    return disease


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
    symptoms = request.get_json()
    print('asdfasdf', symptoms)
    disease = diseasePred(symptoms)
    with open('data/symptom_Description.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Disease'] == disease:
                print(row['Description'])
                return {'prediction': disease.tolist(),'description': row['Description']}

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