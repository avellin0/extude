import re

def vtt_to_text(vtt_file_path, output_file_path):
    with open(vtt_file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    text_lines = []
    subtitle_text = []
    
    # Regex para identificar timestamps e tags de formato
    timestamp_pattern = re.compile(r'\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}')
    tag_pattern = re.compile(r'<[^>]+>')  # Remove qualquer tag HTML

    for line in lines:
        line = line.strip()

        # Ignora cabeçalhos, comentários e linhas vazias
        if not line or line.startswith('WEBVTT') or 'Kind:' in line or 'Language:' in line:
            continue
        
        # Se encontrarmos um timestamp, sabemos que não estamos mais em um cabeçalho
        if timestamp_pattern.match(line):
            if subtitle_text:
                # Concatena o texto e remove as tags
                clean_text = ' '.join(subtitle_text)
                clean_text = tag_pattern.sub('', clean_text)

                if text_lines:
                    last_line = text_lines[-1]
                    # Pular a linha se for uma continuação da anterior
                    if clean_text.startswith(last_line):
                        # Remove a parte da frase anterior para evitar duplicação
                        clean_text = clean_text[len(last_line):].strip()
                        # Se a linha restante estiver vazia, ignore-a
                        if not clean_text:
                            subtitle_text = []
                            continue
                
                text_lines.append(clean_text)
                subtitle_text = []
        else:
            subtitle_text.append(line)
    
    # Adiciona o último parágrafo se houver
    if subtitle_text:
        clean_text = ' '.join(subtitle_text)
        clean_text = tag_pattern.sub('', clean_text)
        
        if text_lines:
            last_line = text_lines[-1]
            # Pular a linha se for uma continuação da anterior
            if clean_text.startswith(last_line):
                clean_text = clean_text[len(last_line):].strip()
                # Se a linha restante estiver vazia, ignore-a
                if not clean_text:
                    clean_text = ''
        
        if clean_text:  # Adiciona a última linha se não estiver vazia
            text_lines.append(clean_text)

    # Salva o texto no arquivo de saída
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        output_file.write(' '.join(text_lines))

# Caminho do arquivo .vtt e do arquivo de saída .txt
vtt_file_path = 'economia.vtt'
output_file_path = 'economia.txt'

vtt_to_text(vtt_file_path, output_file_path)
