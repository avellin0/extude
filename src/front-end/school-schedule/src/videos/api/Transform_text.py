# from teste import teste

# def process_vtt(file_path):
#     import re

#     text_lines = []
#     with open(file_path, 'r', encoding='utf-8') as file:
#         for line in file:
#             # Remove timestamps e tags (<c>, etc.)
#             cleaned_line = re.sub(r'<[^>]+>', '', line.strip())
#             if cleaned_line and '-->' not in cleaned_line:  # Ignorar timestamps
#                 text_lines.append(cleaned_line)

#     # Remove duplicações consecutivas
#     cleaned_text = []
#     for i, line in enumerate(text_lines):
#         if i == 0 or line != text_lines[i - 1]:
#             cleaned_text.append(line)

#     return " ".join(cleaned_text)



# info = teste()
# TRANSCRIPTION = process_vtt(info)
# print("Transcrição Limpa:")
# print(TRANSCRIPTION)


