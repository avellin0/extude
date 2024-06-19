import { TeacheProto } from "./Teachers-proto";
import { StudentsProto } from "./students-proto";

export interface CreateClasses {
  createStudents(userid:number , First_Name: string, age: number, classe: number,access:number): StudentsProto
  createTeachers(id:number  , name: string, subject: string,classes: number[], access: number): TeacheProto
}