import "./Chat.css"
import React, { useState, useRef, useEffect} from "react"
import { useParams } from "react-router-dom"

import {socket} from "../Chat/socket"

type TypeOfMessage = {
    message: string,
    author: string,
    authorId: string
}

export default function Chat(){
    const [messageList, setmessageList] = useState<TypeOfMessage[]>([])
    
    const messageRef = useRef<HTMLInputElement>(null)
    
    const params = useParams()

    useEffect(() => {
        
        const hanldeMessage = (data: TypeOfMessage) => {
            setmessageList((current) => [...current, data])
        }

        socket.on('port3004', hanldeMessage)

        return () => {
            socket.off('port3004', hanldeMessage)
        }

    },[])

  


    const HandleSubmitMessage = () => {
        if(messageRef.current === null || messageRef.current === undefined) return

        const message = messageRef.current.value

        if(!message.trim()) return 

        socket.emit('port3003', {
            message,
            author: "Davi", 
            authorid: params 
        })

        cleanInput()
    }

    const cleanInput = () => {
        if(messageRef.current){
            messageRef.current.value = ""
        }
    }

    const EnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter"){
            HandleSubmitMessage()
        }
    }

    return (
        <div id="chat-body-scope">
            <div id="chat-sidebar-scope"/>  
           
            <div id="chat-scope">
                <div id="chat-scope-area">
               
                {
                    messageList.map((message, index) => (
                        
                        <div>
                            <p key={`${index + 1}`}>{message.author}: {message.message}</p>                                         
                    
                        </div> 
        
                    )
                 )}

                </div>
                <div id="chat-text-input-scope">
                    <input type="text" id="chat-input" ref={messageRef} onKeyDown={(event) => EnterPress(event)}/>
                    <button id="chat-submit-btn" onClick={() => HandleSubmitMessage()}>Enviar</button>
                </div>
            </div>
        </div>
    )
}