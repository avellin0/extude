import "./Chat.css"
// import { useState } from "react"
// import {socket} from "./connect/socket"

import {Contact} from "../Chat/Chat-Contact/Contact"
type PermissionOfNavigate={
    permission: boolean,
    address?: string
}



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