// import video from '../videos/video_completo.mp4'

import './Project.css'
import {useState} from 'react'

export function AdmPage(){

    const [HaveVideo, setHaveVideo] = useState(true)
    const [VideoUrl, setVideoUrl] = useState<string | null>(null)
    const sendSubmit = () => {
      const getFileNameId = document.getElementById('file_name') as HTMLInputElement
     
      if(!getFileNameId.files) return

      const file = getFileNameId.files[0] 

      const videoUrl = URL.createObjectURL(file)

      setVideoUrl(videoUrl)
      setHaveVideo(false)
    } 

    return (
        <>
          <div className="project-body">

          <div className="project-yt">
            
                <div className="project-videos">
                  { HaveVideo? (
                    <>
                      <h3><a href="">Baixe</a><br/></h3>
                      <p>Ou</p>
                      <input type="file" id={"file_name"} />
                      <button onClick={() => sendSubmit()}>Enviar</button>
                  </>
                  )
                  :
                  (
                  <>
                  <video controls height="100%" id='project-video-style'>
                  <source src={VideoUrl || ""} type="video/mp4" />
                   Seu navegador não suporta o elemento de vídeo.
                  </video>
                  </>
                  )  
                }                    
            
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