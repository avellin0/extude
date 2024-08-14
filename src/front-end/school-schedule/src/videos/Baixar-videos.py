import yt_dlp
import subprocess

def baixar_videos(Youtube_url,video_output,audio_output, final_output):

    ydl_opts = {
        'format': 'bestvideo[ext=mp4]/best',
        'outtmpl': video_output,
        'noplaylist': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        print('Baixando video...')
        ydl.download([Youtube_url])

    
    ydl_opts = {
        'format': 'bestaudio[ext=mp3]/best',
        'outtmpl': audio_output,
        'noplaylist': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        print('Baixando audio...')
        ydl.download([Youtube_url])
        
    print('juntando os arquivos...')

    subprocess.run([
       'ffmpeg', '-i',video_output, '-i', audio_output ,
        '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
        '-map', '0:v', '-map', '1:a', final_output
    ]) 

    print('excluindp copias...')
    
    subprocess.run([
        'rm', audio_output, video_output
    ])   

    print('Pegando a legenda ...')

    subprocess.run([
        'yt-dlp', '--write-subs', '--sub-lanf', 'pt', '--skip-download', Youtube_url  
    ])

    print('Video pronto !')


youtube_url = "https://www.youtube.com/watch?v=Gb-PVdvfQgo" 
video_output = "video.mp4"
audio_output = "audio.mp3"
final_output = "video_completo.mp4"

baixar_videos(youtube_url,video_output,audio_output,final_output)
