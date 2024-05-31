import { AdapterServer} from "./server/Adapter-Server";
import { AbstractClassesFactory } from "./CreateFactories/Classes-factory";
import { ServerProtocol } from "./interfaces/Adapter-Server-Protocol";


function RunServerAdapter(server: ServerProtocol): void{
    if(server){
        console.log("Server is running");
    }else {
        console.log(" server is falled")
    }
}


const turma = new AbstractClassesFactory()

const turma1 = turma.createStudents('Davi', 'avelino',17,3002)
const turma2 = turma.createTeachers('Monica', 'ingles')

console.log(turma1.infoStudent())
console.log(`\n -------`);
console.log(turma2.infoTeacher());


RunServerAdapter(new AdapterServer())