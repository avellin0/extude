import "./Chat.css"
import React, { useState, useRef, useEffect} from "react"
import { useParams, useNavigate} from "react-router-dom"
import {socket} from "../../Chat/socket"

import {Contact} from "../Chat/Chat-Contact/Contact"

export type TypeOfMessage = {
    message: string,
    author: string,
    authorId: string
}

type ChatProps = {
    permission: boolean;
};

export default function Chat({permission}: ChatProps){
    const [messageList, setmessageList] = useState<TypeOfMessage[]>([])
    const [username, setUsername] = useState()
    const [count, setCount] = useState(0)
    
    const messageRef = useRef<HTMLInputElement>(null)
    
    const {id} = useParams<{id: string}>()


    useEffect(() => {

        const hanldeMessage = (data: TypeOfMessage) => {
            setmessageList((current) => [...current, data])
        }

        socket.on('port3004', hanldeMessage)


        return () => {
            socket.off('port3004', hanldeMessage)
        }

    },[])


    const fetchData = async () => {
        const payload = {
         id: id?.toString().slice(1)
        };

      
        try {
          const response = await fetch('http://localhost:3000/userInfo', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), 
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();

          console.log(data[0].name);

          setUsername(data[0].name)
          
        } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
        }
      };
      
      fetchData();

      const teste = id?.toString().slice(1)

    const HandleSubmitMessage = () => {
        if(messageRef.current === null || messageRef.current === undefined) return

        const message = messageRef.current.value

        if(!message.trim()) return 



        socket.emit('port3003', {
            message,
            author: username, 
            authorid: teste,
        })

        console.log("Esse é o id:", id);
        

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

    const navigate = useNavigate()

    const redirectMessage = () => { 
            const currentPath = window.location.pathname;
    
            if (permission && !currentPath.includes(`/${username}`)) {
                navigate(`${username}`);
            } else {
                console.error("Já estou na página ou URL já contém o username");
            }
    }


    return (
        <div id="chat-body-scope">
            <div id="chat-sidebar-scope">
                <div id="Contact-scope" onClick={() => redirectMessage()}>
                    <Contact username={"Amigo1"} leastMessage={true}/>   
                 </div> 
            </div>  
           
            <div id="chat-scope">
                <div id="chat-scope-area">
               
                {
                    messageList.map((message, index) => (
                        
                        <div>
                            {
                              message.authorId === teste? (
                                <p key={`${index + 1}`} >{message.author}: {message.message}</p>                                         
                              ): <p key={`${index + 1}`} id="chat-host-side">{message.author}: {message.message}</p> 
                            }                          
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