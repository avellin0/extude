import { TeacheProto} from "../interfaces/Teachers-proto";

export class Teacher implements TeacheProto{
  constructor(public name: string, public subject: string , public classes: number[]){} 

  fullname(): string {
    return `${this.name}`
  }

  infoTeacher(): object{
    const user = {
      nome: this.name,
      materia: this.subject,
      turma: this.classes,
    }
    
    return user
  }
}