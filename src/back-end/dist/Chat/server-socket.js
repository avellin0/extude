"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const server = 3030;
const app = (0, express_1.default)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST']
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
io.on("connection", (socket) => {
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
        });
    });
    //devo fazer criar uma porta para escutar(on) o chamado do front e enviar uma resposta(emit)
});
app.listen(3005, () => {
    console.log("chat esta funcionando!");
});
