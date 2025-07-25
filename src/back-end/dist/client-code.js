"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Adapter_Server_1 = require("./server/Adapter-Server");
function RunServer(server) {
    if (server) {
        server.isRunning();
        console.log('Server is running...');
    }
    else {
        console.log('Server is Falled');
    }
}
RunServer(new Adapter_Server_1.AdapterServer());
