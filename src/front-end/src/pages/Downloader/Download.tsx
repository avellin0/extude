import "./Download.css"
import { useState} from 'react'


export function Download(){

    const [url, setUrl] = useState('')
    const [aviso, setAviso] = useState('')

    const get_video = async() => {    
        console.log(url);
        
        setAviso('pode demorar alguns minutos')
       
        setTimeout(() => {
            setAviso('Só mais alguns ajustes...')
         },20000)


        try{
        const response = await fetch(`http://localhost:5000/download?url=${url}`);
                
        if (!response.ok) {
                throw new Error("Vídeo não encontrado");
        }

        const video_blob = await response.blob()
        const video_url = URL.createObjectURL(video_blob)

        const a = document.createElement('a')
            a.href = video_url
            a.download = 'video.mp4'
            document.body.appendChild(a)
            a.click();
            document.body.removeChild(a)

            URL.revokeObjectURL(video_url);

          

        }catch(err){
            console.log("ta rolando esse erro aqui:", err);
        }

        }
      
    return(
        <>
        <div id="download-scope">

            <h1>Explore videos e podcast</h1>
           
            <div id="donwload-info-scope">
                <input type="text" placeholder="URL" id="download-input-url" onChange={(e) => setUrl(e.target.value) }/>
                <button onClick={() => get_video()}>Buscar</button>    
            </div>
            <p>{aviso}</p>

        </div>
        </>
    )
}
