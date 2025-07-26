import {io} from "socket.io-client"
const socket = io("https://chat-service-0q56.onrender.com")

export {socket}