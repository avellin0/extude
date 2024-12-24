import yt_dlp

def get_thubnail(video_url):

    with yt_dlp.YoutubeDL({'format': 'best', 'skip_download': True,'writethumbnail': True}) as ydl:
        video_info = ydl.extract_info(video_url, download=True)
        video_thubnail = video_info.get('thumbnail')


url = "https://www.youtube.com/watch?v=YbJOTdZBX1g"
get_thubnail(url)