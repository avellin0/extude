import { AdapterServer} from "./server/Adapter-Server";
import { AbstractClassesFactory } from "./CreateFactories/Classes-factory";
import { ServerProtocol } from "./interfaces/Adapter-Server-Protocol";


function RunServerAdapter(server: ServerProtocol): void{
    const create_teacher = new AbstractClassesFactory() 

    if(server){
        console.log("Server is running");
    }else {
        console.log(" server is falled")
    }
}

RunServerAdapter(new AdapterServer())