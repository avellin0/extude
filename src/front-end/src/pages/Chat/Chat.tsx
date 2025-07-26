import "./Chat.css"
// import { useState } from "react"
// import {socket} from "./connect/socket"

import {Contact} from "../Chat/Chat-Contact/Contact"
type PermissionOfNavigate={
    permission: boolean,
    address?: string
}



    // useEffect(() => {

    //     const teste = async() => {
            
    //         const User = id?.toString().slice(1)

    //         if(!User) return 

    //         const UserId: TesteProps = {id: User}

    //         const response = await fetch('https://extude.onrender.com/friends', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //               },
    //               body: JSON.stringify(UserId) 
    //         })
            
    //        if(!response.ok) return 
       
    //        const data = await response.json();
            
    //        setUserFriends([...data])
    //        console.log(UserFriends);
           
                       
    //     }

    //     teste()
    //     fetchData();


        
        

    //     const hanldeMessage = (data: TypeOfMessage) => {
    //         setmessageList((current) => [...current, data])
    //     }

    //     socket.on('port3004', hanldeMessage)

    //     return () => {
    //         socket.off('port3004', hanldeMessage)''
    //     }
    // },[id])

    // const fetchData = async () => {
    //     const payload = {
    //      id: id?.toString().slice(1)
    //     };

      
    //     try {
    //       const response = await fetch('https://extude.onrender.com/userInfo', {
    //         method: 'POST', 
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(payload), 
    //       });
      
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
      
    //       const data = await response.json();

    //       setUsername(data[0].name)
    //       console.log(data);
          
          
          
    //     } catch (error) {
    //       console.error('Erro ao fazer a requisição:', error);
    //     }
    //   };
    
    // const HandleSubmitMessage = () => {
    //     if(messageRef.current === null || messageRef.current === undefined) return

    //     const message = messageRef.current.value

    //     if(!message.trim()) return 

        
    //     if(address === undefined){
    //         console.log("Usuario não encontrado");
    //         return new Error("Usuario não encontrado")
    //     }

    //     socket.emit('port3003', {
    //         message,
    //         author: username, 
    //         authorid: teste,
    //         addresse: address
    //     })

    //     console.log("Estou enviando para:", address, "desse usuario:", username , "essa menssagem:", message);
        

    //     cleanInput()
    // }

    // const cleanInput = () => {
    //     if(messageRef.current){
    //         messageRef.current.value = ""
    //     }
    // }

    // const EnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if(address === undefined){
    //         console.log("Usuario não encontrado");
    //        return new Error("Usuario não encontrado")
    //     }

    //     if (event.key === "Enter"){
    //         HandleSubmitMessage()
    //     }
    // }

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

//     const NewFriendNavigate = () => {
//         navigate(`new_friends`)
//     }
// =======

export default function Chat({permission}:PermissionOfNavigate){

    return (
        <div id="chat-body-scope">
            <div id="chat-sidebar-scope">
                    <button id="chat-new-friend-btn"  onClick={() => "fui pra outra pagina"}>
                        <p>New Friends</p>
                    </button>
                    
                        {
                            <>
                                <Contact username={"COLOQUE ALGUMA COISA AQUI"} leastMessage={true} permission={permission} />  
                            </>
                        }
                    
            </div>  
           
            <div id="chat-scope">
                <div id="chat-scope-area">
              
                    {
                            <>

                                {
                                    <div id="chat-left-side">
                                        <p><span>{'NOME DO AUTOR AQUI'}</span>: {'MENSSAGEM DO AUTOR X'}</p> 
                                    </div>
                                }


                                <>
                                    {
                                        <div id="chat-right-side">
                                            <p id="chat-host-side"><span>{'AUTOR AQUI'}</span>: {'MENSSAGEM'}</p> 
                                        </div>
                                    }
                                </>
                                
                            </>
                    }


                </div>
                <div id="chat-text-input-scope">
                    <input type="text" id="chat-input" onKeyDown={() => console.log("Clicando")
                    } placeholder="Select your Contact"/>
                    <button id="chat-submit-btn" onClick={() => console.log("enviando")
                    }>Enviar</button>
                </div>
            </div>
        </div>
    )
}

// Pega como estava no github...