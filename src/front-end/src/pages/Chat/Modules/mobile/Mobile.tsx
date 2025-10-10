import "./Mobile.css"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface FriendsProps {
    id: string,
    name: string,
    userId: string
}

export function Mobile() {
    const [open, setOpen] = useState(false)
    const [friends, setFriends] = useState<FriendsProps[]>([])


    const { id} = useParams<{ id: string, friends_id: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        getAllUsers()

    }, [])

    const privateChatRedirect = (friendName: string) => {
        navigate(`/chat/${id}/${friendName}`)
    }

    const getAllUsers = async () => {

        const response = await fetch("http://localhost:3000/friends", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ "user_name": id })
        })

        const data = await response.json()
        
        console.log("esse é o data:", data.data[0]);

        setFriends(Array.isArray(data.data) ? data.data : [])
    }


    return (
        <>
            {/* MOBILE HEADER */}
            {window.innerWidth < 550 && (
                <div className="header-chat-config">
                    <h2><span>You</span></h2>
                    <div>
                        <div className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                            <span className="bar bar1"></span>
                            <span className="bar bar2"></span>
                            <span className="bar bar3"></span>
                        </div>
                        <div className={`sidebar ${open ? 'show' : ''}`}>
                            {friends.map((friend, index) => (
                                <div key={index} className="chat-friends-contact" onClick={() => privateChatRedirect(friend.name)}>
                                    <p>{friend.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}