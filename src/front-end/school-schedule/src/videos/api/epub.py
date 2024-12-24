from flask import Flask, jsonify
from flask_cors import CORS
from ebooklib import epub
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/book', methods=['GET'])
def get_epub():
    file_path = "./books/livro.epub"
    try:
        # Tenta carregar o arquivo EPUB
        book = epub.read_epub(file_path)
    except FileNotFoundError:
        return jsonify({'error': 'Arquivo livro.epub não encontrado'}), 404
    except Exception as e:
        # Captura outros erros relacionados ao EPUB
        return jsonify({'error': f'Erro ao ler o arquivo: {str(e)}'}), 500

    extracted_text = []

    # Itera pelos itens do EPUB
    for item in book.get_items():
        if item.media_type == "application/xhtml+xml":  # Verifica se é um capítulo
            # Processa o conteúdo do item
            soup = BeautifulSoup(item.get_content(), "html.parser")
            text = soup.get_text()  # Extrai texto puro
            extracted_text.append(text)  # Armazena o texto extraído

    if not extracted_text:
        # Caso nenhum texto seja encontrado
        return jsonify({'error': 'Nenhum conteúdo encontrado no EPUB'}), 404

    # Retorna todo o texto extraído
    return jsonify({'livro': extracted_text})

# Inicia o servidor
if __name__ == "__main__":
    app.run(port=5000, host='localhost', debug=True)
