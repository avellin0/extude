from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

TEXT_FOLDER = 'texto/'
os.makedirs(TEXT_FOLDER,exist_ok=True)

@app.route('/text/<filename>', methods=['GET'])
def send_text(filename):
    file_path = os.path.join(TEXT_FOLDER,filename)

    if not os.path.isfile:
        return jsonify({'error': 'texto não encontrado'})

    return send_file(file_path, as_attachment=False)

app.run(port=5000,host='localhost',debug=True)  