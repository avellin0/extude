import { TeacheProto} from "../interfaces/Teachers-proto";
import { db } from "../database/client-db";

export class Teacher implements TeacheProto{
  name: string;
  subject: string;
  access: number;

  fullname(): string {
    return `${this.name}`
  }

  async createTeacher(userid:number,name:string,subject:string,access:number){
      const pushTeacher = await db.query('INSERT INTO teachers(teacher_id,name,subject,access) VALUES($1,$2,$3,$4);',[userid,name,subject,access])
        return pushTeacher
    }

  infoTeacher(): object{
    const user = {
      nome: this.name,
      materia: this.subject,
      permissao: this.access,
    }
    
    return user
  }
}