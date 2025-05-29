import "./Chat.css"
import React, { useState, useRef, useEffect} from "react"
import { useParams, useNavigate} from "react-router-dom"
import {socket} from "./connect/socket"

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
    const navigate = useNavigate()
    const teste = id?.toString().slice(1)


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
        fetchData();


        
        

        const hanldeMessage = (data: TypeOfMessage) => {
            setmessageList((current) => [...current, data])
        }

        socket.on('port3004', hanldeMessage)

        return () => {
            socket.off('port3004', hanldeMessage)
        }
    },[id])

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
    
    const HandleSubmitMessage = () => {
        if(messageRef.current === null || messageRef.current === undefined) return

        const message = messageRef.current.value

        if(!message.trim()) return 

        
        if(address === undefined){
            console.log("Usuario não encontrado");
            return new Error("Usuario não encontrado")
        }

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
        if(address === undefined){
            console.log("Usuario não encontrado");
           return new Error("Usuario não encontrado")
        }

        if (event.key === "Enter"){
            HandleSubmitMessage()
        }
    }

    // const ImplementTheChat = (message:any, index: number) => {
        
    //     return (
    //         <div>
    //             {
    //                 message.author === username? 
    //                         <p key={`${index + 1}`} >{message.author}: {message.message}</p>                                  
    //                         :
    //                         <p key={`${index + 1}`} id="chat-host-side">{message.author}: {message.message}</p> 
    //             }     
    //         </div>
    //     )
    // }

    const NewFriendNavigate = () => {
        navigate(`new_friends`)
    }


    return (
        <div id="chat-body-scope">
            <div id="chat-sidebar-scope">
                    <button id="chat-new-friend-btn"  onClick={() => NewFriendNavigate()}>
                        <p>New Friends</p>
                    </button>
                    
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
                                
                {/* {
                    messageList.map((message, index) => (                        
                        <div>
                            {
                              message.addresse === username || message.author === username? ImplementTheChat(message, index) : ""                            
                            }         
                        </div>                             
                    )
                 )} */}

                    {
                        messageList.map((message, index) => (
                            <>

                                {
                                    message.author === username? 
                                    <div id="chat-left-side">
                                        <p key={`${index + 1}`}><span>{message.author}</span>: {message.message}</p> 
                                    </div>: ""
                                }

                                {

                                message.addresse === username? 
                                <>
                                    {
                                      message.author === username? 
                                       ""
                                      :
                                        <div id="chat-right-side">
                                            <p key={`${index + 1}`} id="chat-host-side"><span>{message.author}</span>: {message.message}</p> 
                                        </div>
                                    }
                                </>
                                :""
                                
                                }
                            </>
                        ))
                    }


                </div>
                <div id="chat-text-input-scope">
                    <input type="text" id="chat-input" ref={messageRef} onKeyDown={(event) => EnterPress(event)} placeholder="Select your Contact"/>
                    <button id="chat-submit-btn" onClick={() => HandleSubmitMessage()}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

