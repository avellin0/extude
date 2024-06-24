import { db } from "../database/client-db";
import { ProxyCacheStudent, StudentsProto } from "../interfaces/students-proto";

export class Students implements StudentsProto{
  constructor(public userid: number, public name: string,public age: number, public classe: number, public access: number){} 

  async createStudents(id:number, name:string,age:number,classe:number,access:number){
    const addStudents = await db.query('INSERT INTO students(student_id,name,age,access) VALUES($1,$2,$3,$4)',[id,name,age,access])
    return addStudents
  }

  async infoStudent(): Promise<ProxyCacheStudent[]>{
    return new Promise((resolve) => {
      resolve([
        {
          userid: this.userid, 
          name: this.name,
          age: this.age,
          classe: this.classe,
          access: this.access
        }
      ]);
    });
  };
};