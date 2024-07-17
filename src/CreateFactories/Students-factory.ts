import crypto from 'node:crypto'
import { db } from "../database/client-db";
import { ProxyCacheStudent, StudentsProto } from "../interfaces/students-proto";

export class Students implements StudentsProto{
  constructor(public userid: number, public name: string,public email: string, public password: string, public permission: string){} 

  
  async createStudents(id:number, name:string,email:string,password:string, permission:string){
    

    const HashPassword = crypto.createHash('sha256').update(password).digest('hex')
    
    const addStudents = await db.query('INSERT INTO Usuario(userId,name,email,password,permission) VALUES($1,$2,$3,$4,$5)',[id,name,email,HashPassword,permission])
    return addStudents
  }

  async infoStudent(): Promise<ProxyCacheStudent[]>{
    return new Promise((resolve) => {
      resolve([
        {
          userid: this.userid, 
          name: this.name,
          email: this.email,
          password: this.password,
          permission: this.permission
        }
      ]);
    });
  };
};