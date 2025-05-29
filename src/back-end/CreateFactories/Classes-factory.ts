import { CreateClasses } from "../interfaces/Create-Classes-Proto";
import { StudentsProto } from "../interfaces/students-proto";
import { Students } from "./Students-factory";

export class AbstractClassesFactory implements CreateClasses{
  createUser(userid:number, name: string, email: string , password: string, permission:string): StudentsProto {

    const new_student = new Students(userid,name,email,password,permission)
    new_student.createStudents(userid,name,email,password,permission)
    
    return new_student
  }
}
