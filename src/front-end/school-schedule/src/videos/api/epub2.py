from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from ebooklib import epub
from bs4 import BeautifulSoup
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/book/<bookname>', methods=['GET'])
def get_epub(bookname):
    
    # ponho o nome do livro
    books = [
        "livro",
        "algoritmo",
        "conde",
        "prince",
        "poemas"
    ]

    for book in books:
        if(bookname == book):
            file_path = "./books/"+book+".epub"    
        else:
            print('não deu certo')

    

    try:
        book = epub.read_epub(file_path)
    except FileNotFoundError:
        return jsonify({'error': 'Arquivo livro.epub não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao ler o arquivo: {str(e)}'}), 500

    extracted_text = []

    for item in book.get_items():
        if item.media_type == "application/xhtml+xml":
            soup = BeautifulSoup(item.get_content(), "html.parser")
            text = soup.get_text() 
            extracted_text.append(text)  

    if not extracted_text:
        # Caso nenhum texto seja encontrado
        return jsonify({'error': 'Nenhum conteúdo encontrado no EPUB'}), 404

    # Retorna todo o texto extraído
    return jsonify({'livro': extracted_text})




# Inicia o servidor
if __name__ == "__main__":
    app.run(port=5000, host='localhost', debug=True)
