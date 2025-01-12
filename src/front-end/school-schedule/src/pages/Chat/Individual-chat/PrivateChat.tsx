import { useParams } from "react-router-dom"
import Chat from "../Chat";


export function PrivateChat(){

    const {username} = useParams()

    const teste = () => {
        if(username){
            console.log("url:", username);
            return true
        }      

        return false
    }


    return (
        <>
            <Chat permission={teste()}/>
        </>
    )
}