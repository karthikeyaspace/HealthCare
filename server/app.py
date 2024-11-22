from flask import Flask, request
from flask_cors import CORS
from joblib import load
import csv
import numpy as np
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()
frontend_url = os.environ.get('FRONTEND_URL')
genai.configure(api_key=os.environ.get('API_KEY'))

model = load('models/model.joblib')
symptoms = load('models/symptoms.joblib')
aimodel = genai.GenerativeModel('gemini-pro')

app = Flask(__name__)
CORS(app, origins=[frontend_url], methods=['GET', 'POST'])


def diseasePred(symptoms):
    symptoms = np.asarray(symptoms).reshape(1, -1)
    disease = model.predict(symptoms)
    return disease


@app.route('/predict', methods=['POST'])
def predict():
    usersymptoms = request.get_json()

    x = np.zeros(len(symptoms))
    for s in symptoms:
        if s in usersymptoms:
            x[symptoms.index(s)] = 1

    disease = diseasePred(x)
    print(disease)

    if len(disease) == 0:
        return {'recommendation': 'No disease found'}

    with open('data/symptom_Description.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Disease'] == disease:
                print(row['Description'])
                return {'recommendation': disease.tolist(), 'description': row['Description']}

    return {'recommendation': disease.tolist(), 'description': 'No description found'}


@app.route('/precautions', methods=['POST'])
def getPrecaution():
    disease = request.get_json()
    disease = disease[0]
    print(disease)
    with open('data/symptom_precaution.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Disease'] == disease:
                precautions = [row['Precaution_1'], row['Precaution_2'],
                               row['Precaution_3'], row['Precaution_4']]
                print(precautions)
                return {'precautions': precautions}

    return {'precautions': ['No precautions found', 'nope']}


@app.route('/genai', methods=['POST'])
def genai():
    msg = request.get_json()
    msg = msg['message']
    response = aimodel.generate_content(msg)
    return response.text


if __name__ == '__main__':
    app.run(debug=True)
