import "./Contact.css"
import { useNavigate } from "react-router-dom"

interface ContactConfigProps{
    username?: string,
    leastMessage?: boolean,    
    permission?: boolean;
}


export function Contact({username,leastMessage, permission}:ContactConfigProps){

      const navigate = useNavigate()

    const redirectMessage = () => { 
            const currentPath = window.location.pathname;
    
            if (permission && !currentPath.includes(`/${username}`)){
                navigate(`${username}`);
            } else if (!currentPath.includes(`/${''}`)){
                console.error("Já estou na página ou URL já contém o username");
            }
    }

  
    return (
        <div id="Contact-friend-scope" onClick={() => redirectMessage()}>
                <div id="Contact-image-user">
                </div>

                <div id="Contact-info-scope">
                    <h2>{username}</h2>
                    <div id="Contact-leastmessage">
                        {leastMessage? "✔✔ vlw" : ""}
                    </div>
                </div>
        </div>
    )
}