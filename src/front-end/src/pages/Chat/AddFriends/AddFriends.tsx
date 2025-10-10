import "./AddFriends.css"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import user from "./user.png"

export function AddFriends() {
    const { id } = useParams<{ id: string }>()

    const [FriendName, setFriendName] = useState<string>(String(id))

    const navigate = useNavigate()


    const AddNewFriend = async () => {

        console.log("this is the id:", id);


        if (FriendName === null || FriendName === undefined) return
        if (!FriendName.trim()) return

        if (typeof (id) !== "string") return

        console.log("this is the user id:", FriendName, "and this is your friend id:", id);


        const getFriendInfo = await fetch(`http://localhost:3000/student/${FriendName}`);
        const data = await getFriendInfo.json()

        console.log("this is the friend info:", data);


        const newFriendsQuery = {
            friend_email: data[0].name,
            name: id,
            status: "pending",
        }

        console.log("this is the query:", newFriendsQuery);


        const response = await fetch('http://localhost:3000/newfriends', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFriendsQuery)
        }
        )

        //id: 180bca53-d7dd-4468-b8e6-31306c731149

        if (!response.ok) {
            throw new Error("Have some wrong here")
        }


        navigate(`/chat/${id}`)

        return
    }


    return (
        <div id="AddFriends-scope">
            <div id="addfriends-menu">

                <div id="addfriends_logo">
                    <img src={user} alt="" id="user-img" />
                </div>

                <div id="addfriends_info">
                    <input type="text" placeholder="Numero (opcional)" onChange={(e) => console.log(e.target.value)} className="addfriend-btn" spellCheck="false" />
                    <input type="text" placeholder="Apelido (opcional)" onChange={(e) => console.log(e.target.value)} className="addfriend-btn" spellCheck="false" />
                    <input type="text" placeholder="Friend's Name" onChange={(e) => setFriendName(e.target.value)} className="addfriend-btn" spellCheck="false" />

                    <div id="addfriend-send-btn-scope">
                        <button onClick={() => AddNewFriend()} id="addfriend-send-btn">Criar Contato</button>
                        <p id="addfriend_voltar" onClick={() => navigate(`/chat/${id}`)}>Voltar</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

