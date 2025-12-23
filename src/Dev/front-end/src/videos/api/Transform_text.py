import whisper

model = whisper.load_model("base")
result = model.transcribe("../video.mp4")
print(result["text"])  # legenda simples
