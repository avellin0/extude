import { MessagesInput } from "../Modules/InteractiveChat/Messages"
import { useState, useEffect } from "react"
import { socket } from "../connect/socket"
import "./Demo.css"

interface TypeOfMessage {
    message: string
    author: string
    authorId: string
    addresse: string
    conteudo: string
    create_at: string,
    destinatarioId: string
    id: string
    remetentId: string
}


export function Demo() {

    const [message, setMessage] = useState<TypeOfMessage[]>([])


    useEffect(() => {
        const handleMessage = (data: TypeOfMessage) => {
            setMessage((current) => [...current, data])
        }

        console.log("essa é a menssagem:", message);


        socket.on("port3004", handleMessage)


        return () => {
            socket.off("port3004", handleMessage)
        }
    }, [])

    return (
        <>
            <div id="Demo-body-scope">
                <div className="demo-chat-scope">
                    <div className="demo-chat-header">
                        <h3>Alice</h3>
                    </div>

                    <div className="demo-chat-text">
                        {message.map((msg, index) => (
                            <>
                                {msg.addresse === "Alice" || msg.author === "Alice" ?
                                    < div key={index} className={msg.addresse === "Alice" ? 'chat-right-side' : 'chat-left-side'}>
                                        <p><span>{msg.author}</span>: {msg.message}</p>
                                    </div >

                                    : ""}
                            </>
                        ))}
                    </div>

                    <div className="demo-chat-input-scope">
                        <MessagesInput friend={"bob"} id={"Alice"} />
                    </div>
                </div>

                <div className="demo-chat-scope">
                    <div className="demo-chat-header">
                        <h3>Bob</h3>
                    </div>

                    <div className="demo-chat-text">
                        {message.map((msg, index) => (
                            <>
                                {msg.addresse === "bob" || msg.author === "bob" ?
                                    < div key={index} className={msg.addresse === "bob" ? 'chat-right-side' : 'chat-left-side'}>
                                        <p><span>{msg.author}</span>: {msg.message}</p>
                                    </div >

                                    : ""}
                            </>
                        ))}
                    </div>
                    <div className="demo-chat-input-scope">
                        <MessagesInput friend={"Alice"} id={"bob"} />
                    </div>
                </div>
            </div>
        </>
    )
}