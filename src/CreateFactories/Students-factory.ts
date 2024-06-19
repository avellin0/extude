import { db } from "../database/client-db";
import { StudentsProto } from "../interfaces/students-proto";

export class Students implements StudentsProto{
  constructor(public userid: number, public name: string,public age: number, public classe: number, public access){} 

  async createStudents(id:number, name:string,age:number,classe:number,access:number){
    const addStudents = await db.query('INSERT INTO students(student_id,name,age,access) VALUES($1,$2,$3,$4)',[id,name,age,access])
    return addStudents
  }

  infoStudent(): object{
    const user = {
      nome: this.name,
      turma: this.classe,
      idade: this.age
    }
    
    return user
  }
}