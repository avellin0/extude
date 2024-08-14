import video from '../videos/video_completo.mp4'
import './Project.css'
import {useState, useEffect} from 'react'

export function AdmPage(){

  const [text,setText] = useState("")

    useEffect(() => {
      fetch('http://localhost:5000/text/economia.txt')
      .then(response => {
        if(response.ok){
            return response.text()
        }

          throw('Dados não encontrado')
      })
      
      .then(data => {
        setText(data)
      })
    },[])

    return (
        <>
          <div className="project-body">

          <div className="project-yt">
            
            <div className="project-videos">
            
            <video controls height="100%">
            <source src={video} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
            </video>
            
            </div>

                <div className="project-transcricao">
                    <textarea id="project-transcription-area" value={text} readOnly></textarea>
                </div>
            </div>

            <div className="project-notes-scope">
              <div className="project-notes">
                <textarea name="" id="project-notes-item" placeholder='Liberte sua mente' spellCheck='false' ></textarea>
              </div>
            </div>

          </div>
        </>
    )
}