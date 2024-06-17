import { TeacheProto} from "../interfaces/Teachers-proto";
import { db } from "../database/client-db";

export class Teacher implements TeacheProto{
  constructor(public name: string, public subject: string , public access: number, readonly userid: number){} 

  fullname(): string {
    return `${this.name}`
  }

  infoTeacher(): object{
    const user = {
      nome: this.name,
      materia: this.subject,
      permissao: this.access,
      id: this.userid
    }
    

    return user
  }
}