import {useNavigate} from "react-router-dom"
import { useEffect, useState} from "react";

interface FriendsProps {
    id?: string,
    name?: string,
}

export function SideBar({id}: FriendsProps){
    const [friends, setFriends] = useState<FriendsProps[]>([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getAllUsers()
        console.log("Current friends:", friends);
    },[id])
    
    const getAllUsers = async () => {
            
        const response = await fetch("https://extude.onrender.com/friends", {
            method: 'POST', 
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({"user_name": id })
        })

        const data = await response.json()
        console.log("esse é o data:", data);

        setFriends(Array.isArray(data.data) ? data.data : [])
    }


    const privateChatRedirect = async(friendName: any) => {        
        navigate(`/chat/${id}/${friendName}`)
    }


    return (
        <>
         <div id="chat-sidebar-scope">
                    <button id="chat-new-friend-btn" onClick={() => navigate(`/chat/${id}/new_friends`)}>
                        <p>New Friends</p>
                    </button>

                    {friends.map((friend, index) => (
                        <div key={index} className="chat-friends-contact" onClick={() => privateChatRedirect(friend.name)}>
                            <p>{friend.name}</p>
                        </div>
                    ))}
                </div>
        </>
    )
}