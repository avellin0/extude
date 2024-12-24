import subprocess

def fetch_subtitles(url, lang="pt"):
    # Comando para capturar apenas as legendas
    command = [
        "yt-dlp",
        "--write-auto-subs",    # Baixa legendas automáticas
        "--sub-lang", lang,     # Define o idioma das legendas
        "--sub-format", "vtt",  # Define o formato das legendas
        "--skip-download",      # Não baixa o vídeo
        "--no-warnings",        # Remove avisos desnecessários
        "--quiet",              # Torna a execução mais silenciosa
        "-o", "-",              # Envia saída para o stdout
        url
    ]

    try:
        # Executa o comando e captura stdout e stderr
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        # Verifica se houve erro
        if process.returncode != 0:
            print("Erro ao capturar legendas:", stderr.decode('utf-8'))
            return None

        # Retorna as legendas capturadas
        return stdout.decode('utf-8')

    except FileNotFoundError:
        print("Erro: O comando 'yt-dlp' não foi encontrado. Verifique se está instalado e no PATH.")
        return None
    except Exception as e:
        print(f"Erro inesperado: {e}")
        return None

# Exemplo de uso
video_url = "https://www.youtube.com/watch?v=GIOC-ncLveo&list=RDGMEM2VCIgaiSqOfVzBAjPJm-agVMGIOC-ncLveo&start_radio=1"
subtitle_data = fetch_subtitles(video_url)

if subtitle_data:
    print("Legendas capturadas:")
    print(subtitle_data)  # Envie ao cliente como texto ou como arquivo
else:
    print("Nenhuma legenda encontrada ou erro ao processar.")
