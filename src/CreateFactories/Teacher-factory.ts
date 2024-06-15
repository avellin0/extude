import { TeacheProto} from "../interfaces/Teachers-proto";

export class Teacher implements TeacheProto{
  constructor(public name: string, public subject: string , public classes: number[], readonly userid: number){} 

  fullname(): string {
    return `${this.name}`
  }

  infoTeacher(): object{
    const user = {
      nome: this.name,
      materia: this.subject,
      turma: this.classes,
      id: this.userid
    }
    
    return user
  }
}