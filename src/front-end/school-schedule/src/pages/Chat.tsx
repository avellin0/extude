import "./Chat.css"
import { useState, useRef} from "react"

import {socket} from "../Chat/socket"

type TypeOfMessage = {
    message: string,
    author: string,
    authorId: string
}

export default function Chat(){
    const [message,setmessage] = useState<TypeOfMessage[]>([])
    
    const messageRef = useRef<HTMLInputElement>(null)
    

    const HandleSubmitMessage = () => {
        socket.emit('')
    }

    return (
        <div id="chat-body-scope">
            <div id="chat-sidebar-scope"/>  
           
            <div id="chat-scope">
                <div id="chat-scope-area"/>
                <div id="chat-text-input-scope">
                    <input type="text" id="chat-input" ref={messageRef}/>
                    <button id="chat-submit-btn" onClick={() => console.log(message)}>Enviar</button>
                </div>
            </div>
        </div>
    )
}