import { useEffect } from "react";
import { Mobile } from "../Modules/mobile/Mobile";
import { SideBar } from "../Modules/sidebar/SideBar";
import { useParams } from "react-router-dom";


export function PrivateChat() {

    const {id,username} = useParams<{id: string, username: string}>()

    useEffect(() => {
        console.log("this is friend name:", username);
    }, [username])

    return (
        <>
            <div id="body">
                <div id="chat-body-scope">
                    <Mobile/>
                    
                    
                </div>
            </div>
        </>
    )
}