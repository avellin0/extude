import { StudentsProto } from "../interfaces/students-proto";

export class Students implements StudentsProto{
  constructor(public name: string, public second_name: string , public age: number, public classe: number){} 

  fullname(): string {
    return `${this.name} ${this.second_name}`
  }

  infoStudent(): object{
    const user = {
      nome: this.fullname(),
      turma: this.classe,
      idade: this.age
    }
    
    return user
  }
}