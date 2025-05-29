import Chat from "../Chat";
import { useParams } from "react-router-dom";



export function PrivateChat(){

    const {username} = useParams<{username: string}>()
    
    return (
        <>
            <Chat permission={false} address={username}/>
        </>
    )
}