import "./AddFriends.css"
import {socket} from "../../../Chat/socket"
import {useState} from "react"
import { useParams, useNavigate} from "react-router-dom"

interface AddFriendProps{
    friendOf: string,
    id: string
}

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
    
    
    const info: AddFriendProps = {friendOf: "0ba92eeb-8226-425c-8f49-db82fea62424" , id: "b3eea576-6dae-4b46-9b1d-7ca0659c1fff"}


    console.log("Estou enviando isso aqui:",info)

    const response = await fetch('http://localhost:3000/newfriends',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
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


// RELATORIO+++++
/*
    pelo visto preciso achar uma forma de enviar o ID do usuario principal (que vem pelo params) 
    e enviar o ID do amigo do usuario (informado no input); 
    porém o código não está entendendo de forma dinamica e assincrona, mas aceita se forçarmos os IDs 
    Ache uma forma de trocar o "friendOf" e "id" por valores automaticos 
    
    principal erro : linha 33 
    
    obs: Talvez o erro esteja nas coisas mais basicas, tenta refazer o jeito em que as informações são obtidas

    Boa sorte! 
*/