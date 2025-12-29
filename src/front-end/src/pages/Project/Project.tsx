import './Project.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { parseVTT } from "../Legendas/Legendas.tsx"
import { supabase } from "../../supabase/supa-client.ts"


export function AdmPage() {
  const { id } = useParams<{ id: string }>();

  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [note, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<{ start: number; end: number; text: string }[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');


  const [aviso, setAviso] = useState('');
  const [urlActive, setUrlActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const GetLastSave = async () => {
      try {

        console.log(id);

        const getId = await supabase.from('app_users').select('*').eq("name", id)
        const userId = getId.data![0].id

        const response = await supabase.from('notes').select('content').eq('user_id', userId);

        if (!response.data) {
          throw new Error('Erro ao buscar última mensagem');
        }

        const data = response.data;
        console.log("this is the data:", data);
        const lastMessage = data[data.length - 1]?.content || '';
        setMessage(lastMessage);

      } catch (err) {
        console.log('Erro:', err);
      }
    };

    GetLastSave();
  }, [id]);

  useEffect(() => {

    const fetchSubtitles = async () => {
      try {
        const res = await fetch("http://localhost:8000/subtitles", { cache: "no-store" });
        const text = await res.text();
        const parsed = parseVTT(text);
        setSubtitles(parsed);

        const blob = new Blob([text], { type: "text/vtt" });
        const blobUrl = URL.createObjectURL(blob);

        console.log("Legendas carregadas:", subtitleUrl);


        setSubtitleUrl(blobUrl);

      } catch (err) {
        console.log("Erro ao buscar legendas:", err);
      }
    };
    fetchSubtitles();


  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || subtitles.length === 0) return;

    const update = () => {
      const time = video.currentTime;
      const active = subtitles.find(s => time >= s.start && time <= s.end);
      setCurrentSubtitle(active?.text || '');
    };

    video.addEventListener('timeupdate', update);
    return () => video.removeEventListener('timeupdate', update);
  }, [subtitles, videoFile]);


  
  const sendSubmit = async () => {
    console.log("Buscando legendas...");


    const getFileNameId = document.getElementById('file_name') as HTMLInputElement;
    if (!getFileNameId.files) return;
    const file = getFileNameId.files[0];

    const sendUrl = URL.createObjectURL(file);
    setVideoFile(sendUrl);

    const response = await fetch(`http://localhost:8000/subtitles?url=${encodeURIComponent(videoUrl)}`);

    if (!response.ok) {
      throw new Error('Erro ao obter transcrição');
    }

    const vttText = await response.text();

    console.log(vttText);


    const blob = new Blob([vttText], { type: "text/vtt" });
    const blobUrl = URL.createObjectURL(blob);

    setSubtitleUrl(blobUrl);

  };

  const handleUrl = async () => {
    try {
      setUrlActive(true);

      setAviso('pode demorar alguns minutos')

      const Apologize = [
        'Buscando arquivos...',
        'Organizando arquivos...',
        'Melhorando desempenho...',
        'Estamos quase terminando...'
      ]

      let index = 0

      const interval = setInterval(() => {
        setAviso(Apologize[index])
        index = (index + 1) % Apologize.length
      }, 5000) // 5 segundos



      alert(`Aguarde enquanto processamos o vídeo. ${aviso}`);


      if (!videoUrl) {
        throw new Error('URL do vídeo não fornecida');
      }

      const response = await fetch(`http://localhost:8000/video?url=${encodeURIComponent(videoUrl)}`);

      if (!response.ok) {
        throw new Error('Falha ao baixar o vídeo');
      }

      const videoBlob = await response.blob();
      const videoUrlBlob = URL.createObjectURL(videoBlob);


      const a = document.createElement('a');
      a.href = videoUrlBlob;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);



      URL.revokeObjectURL(videoUrlBlob);

      setAviso('Vídeo pronto para download!');
      setUrlActive(false);
      return () => clearInterval(interval)

    } catch (error) {
      console.error('Erro ao baixar o vídeo:', error);
    }
  };

  const Save = async () => {

    if (!id) {
      console.error('Id inválido ou não fornecido');
      return;
    }

    if (!note.trim()) {
      console.error('A nota está vazia');
      return;
    }

    try {

      const response = await supabase.from('notes').insert([
        { user_id: id, content: note }
      ]);




      const alteracao = response.data;
      console.log(alteracao);

      const message = document.getElementById('project-notes-alert-save');

      if (!message) {
        throw new Error('Não existe esse elemento html');
      }

      message.textContent = 'Suas ideias estão salvas!';
      console.log('Alteração salva com sucesso!');

    } catch (error) {
      console.log('Ocorreu esse erro:', error);
    }
  };

  return (
    <div className="project-body">

      <div className="project-yt">
        <div id="project-video-url">
          <input
            type="text"
            id="project-video-url-input"
            placeholder="Busque um vídeo do YouTube"
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <button id="project-video-url-btn" type='button' onClick={handleUrl}>
            Buscar
          </button>
        </div>

        <div id="project-videos">
          {videoFile && (
            <video ref={videoRef} controls id="project-video-space">
              <source src={videoFile} type="video/mp4" />
            </video>
          )}
        </div>

        <div id="project-transcript-scope">
          <p>{currentSubtitle}</p>
        </div>

        <div id="project-file-videos-scope">
          <input type="file" id="file_name" />
          <button type='button' onClick={sendSubmit}>Enviar</button>
          <p style={{ textIndent: '100px' }}>{urlActive ? aviso : ''}</p>
        </div>
      </div>

      <div className="project-notes-scope">
        <div className="project-notes">
          <div id="project-notes-header">
            <div id="project-notes-header-text">
              <h1>Notes</h1>
            </div>
          </div>

          <textarea
            name=""
            id="project-notes-item"
            placeholder="Liberte sua mente"
            spellCheck="false"
            onChange={(e) => setNotes(e.target.value)}
            defaultValue={message}
          />

          <p id="project-notes-alert-save"></p>

          <div id="project-notes-save" onClick={Save}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
}
