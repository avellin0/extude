import subprocess
from flask import Response

def teste(url):

    video_url = url

    command = ['yt-dlp', video_url]

    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    (stdout , stderr) = process.communicate()

    return Response(stdout, mimetype='video/mp4')
    

teste("https://www.youtube.com/watch?v=hlsDToAmi24")
