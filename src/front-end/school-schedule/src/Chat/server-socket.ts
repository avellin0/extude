import express from "express"
import cors from "cors"
import {Server, Socket} from "socket.io"


const server = 3030
const app = express()

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET','POST']
    }
})

app.use(cors())
app.use(express.json())


io.on("connection", (socket: Socket) => {
    console.log("User connected !"); 

    socket.on("port3003", data => {
        console.log("info received:", data);
        socket.data.authorId = data.authorid;
        console.log("User id:", data.authorid);
        
        io.emit('port3004', {
            message: data.message,
            authorId: socket.data.authorId,
            author: data.author
        })
    })

    //devo fazer criar uma porta para escutar(on) o chamado do front e enviar uma resposta(emit)
})


app.listen(3005, () => {
    console.log("chat esta funcionando!");
})