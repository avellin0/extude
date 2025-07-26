import {Server, Socket} from "socket.io"

const server = 3030

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET','POST']
    }
})

io.on("connection", (socket: Socket) => {
    console.log("User connected !"); 

    socket.on("port3003", data => {
        console.log("info received:", data);
        socket.data.authorId = data.authorid;
        console.log("User id:", data.authorid);
        
        io.emit('port3004', {
            message: data.message,
            authorId: socket.data.authorId,
            author: data.author,
            addresse: data.addresse
        })
    })
})
