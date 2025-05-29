import "./AddFriends.css"
import {socket} from "../connect/socket"
import {useState} from "react"
import { useParams, useNavigate} from "react-router-dom"

export function AddFriends () {
    const {id} = useParams<{id: string}>()
    
    const [Name, setName] = useState<string>()
    const [Friendid, setFriendid] = useState<string>()
       
    const navigate = useNavigate()


    const AddNewFriend = async() => {

    if(Friendid === null || Friendid === undefined) return
        if(!Friendid.trim()) return

    if(typeof(id) !== "string") return

    console.log(Friendid, id);
    

    const response = await fetch('http://localhost:3000/newfriends',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friendOf: id?.toString().slice(1),
                id: Friendid
            })
        }
    )

    if(!response.ok){
        throw new Error("Have some wrong here")
    }


        socket.emit("port3005", {
            friendOf: id,
            name: Name,
            id: Friendid 
        })

        navigate(`/comunity/${id}`)

      return 
    }


    return (
        <div id="AddFriends-scope">
            <h1>Hello new Friend!</h1>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="id" onChange={(e) => setFriendid(e.target.value)}/>
            <button onClick={() => AddNewFriend()}>Save</button>
        </div>
    )
}

