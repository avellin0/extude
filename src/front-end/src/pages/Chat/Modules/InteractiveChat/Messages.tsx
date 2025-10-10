import { useEffect, useRef, useState } from "react"
import { socket } from "../../connect/socket"
import "./Messages.css"

interface MessageProps {
    friend: any
    id: any
}

export function MessagesInput({ friend, id }: MessageProps) {
    const textRef = useRef<HTMLInputElement>(null)
    const [text, setText] = useState<string>('')
    const [address, setAddress] = useState<string>('')




    useEffect(() => {

        setAddress(friend)
    })

    const sendMessage = async () => {
        if (!text.trim()) return

        const messageQuery = {
            message: text,
            author: id,
            addresse: address
        }

        if (messageQuery) {
            socket.emit("port3003", messageQuery)
        }

        const createMessage = {
            id: id as string,
            message: text,
            sendTo: address
        }

        console.log(createMessage);

        if (id !== "bob" || id !== "Alice") {

            fetch('https://chat-service-tjzg.onrender.com/create_message', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(createMessage)
            })
        }

            setText('')
            if (textRef.current) textRef.current.value = ''
        }

        return (
            <>

                <div id="chat-text-input-scope">
                    <input
                        type="text"
                        id="chat-input"
                        ref={textRef}
                        value={text}
                        onChange={(e) => setText(e.currentTarget.value)}
                        placeholder="Hey what's up :) "
                        onKeyDown={(e) => { e.key === 'Enter' && sendMessage() }}
                    />
                    <button id="chat-submit-btn" onClick={sendMessage}>Enviar</button>
                </div>
            </>
        )
    }