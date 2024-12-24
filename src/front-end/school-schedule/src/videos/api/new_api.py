import subprocess
from flask import Flask, Response, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/download', methods=['GET'])
def get_videos():
   
    video_url = request.args.get('url')
    
    if not video_url:
        return "URL do vídeo é obrigatória.", 400

    command = [
        'yt-dlp','-o', '-', '--limit-rate', '10M', '--concurrent-fragments', '10', video_url
    ]

    # ffmpeg -i nadaruim.webm  -c  video.mp4


    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    def generate():
        for line in iter(process.stdout.readline, b''):
            yield line
        process.stdout.close()
    
    headers = {
        "Content-Disposition": "inline; filename=video.webm",  # Nome do arquivo no front
        "Content-Type": "video/webm"  # Tipo de conteúdo correto para .webm
    }

    return Response(generate(), headers=headers)


# @app.route('/subtitles', methods=['GET'])
# def get_subtitles():



    
#     return jsonify({"message": TRANSCRIPTION})

app.run(port=5000,host='localhost',debug=True)  



