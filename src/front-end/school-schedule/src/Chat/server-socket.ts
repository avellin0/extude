import express from "express"
import cors from "cors"
import {Server, Socket} from "socket.io"


const server = 3030
const app = express()
const io = new Server(server)

app.use(cors())
app.use(express.json())


io.on("connection", (socket: Socket) => {
    console.log("User connected !"); 

    //devo fazer criar uma porta para escutar(on) o chamado do front e enviar uma resposta(emit)
})


app.listen(3005, () => {
    console.log("chat esta funcionando!");
})