import os
import subprocess
import yt_dlp

def Download(url):

    yt_opts = {
        'format': 'bestvideo',
        'outtmpl': 'first_video.mp4'
    }

    with yt_dlp.YoutubeDL(yt_opts) as ydl:
        ydl.download([url])

url = "https://www.youtube.com/watch?v=1ALp0WX7xbo"
Download(url)
