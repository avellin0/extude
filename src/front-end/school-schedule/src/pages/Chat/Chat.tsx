import "./Chat.css"
import React, { useState, useRef, useEffect} from "react"
import { useParams} from "react-router-dom"
import {socket} from "../../Chat/socket"

import {Contact} from "../Chat/Chat-Contact/Contact"

export type TypeOfMessage = {
    message: string,
    author: string,
    authorId: string,
    addresse: string
}

type UserFriendsList = {
    name: string
}

type PermissionOfNavigate={
    permission: boolean,
    address?: string
}


interface TesteProps{
    id: string
}


export default function Chat({permission, address}:PermissionOfNavigate){
    const [messageList, setmessageList] = useState<TypeOfMessage[]>([])
    const [username, setUsername] = useState() 
    const [UserFriends , setUserFriends] = useState<UserFriendsList[]>([])  
    const messageRef = useRef<HTMLInputElement>(null)
    
    const {id} = useParams<{id: string}>()


    useEffect(() => {

        const teste = async() => {
            
            const User = id?.toString().slice(1)

            if(!User) return 

            const UserId: TesteProps = {id: User}

            const response = await fetch('http://localhost:3000/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(UserId) 
            })
            
           if(!response.ok) return 
       
           const data = await response.json();
            
           setUserFriends([...data])
           console.log(UserFriends);
           
                       
        }

        teste()


        
        

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

          setUsername(data[0].name)
          console.log(data);
          
          
          
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
            addresse: address
        })

        console.log("Estou enviando para:", address, "desse usuario:", username , "essa menssagem:", message);
        

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

    const ImplementTheChat = (message:any, index: number) => {
        return (
            <div>
                <p key={`${index + 1}`} >{message.author}: {message.message}</p>                                         
                <p key={`${index + 1}`} id="chat-host-side">{message.author}: {message.message}</p> 
            </div>
        )
    }



    return (
        <div id="chat-body-scope">
            <div id="chat-sidebar-scope">
                    <button><a href={`${id}/new_friends`}>New Friends</a></button>
                    
                        {
                          UserFriends.map((user,index)=> (
                            <>
                                <Contact username={user.name} leastMessage={true} permission={permission} key={index}/>  
                            </>
                          ))
                        }
                    
            </div>  
           
            <div id="chat-scope">
                <div id="chat-scope-area">
                                
                {
                    messageList.map((message, index) => (                        
                        <div>

                            

                            {
                              message.addresse === message.author && ImplementTheChat(message, index)
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

