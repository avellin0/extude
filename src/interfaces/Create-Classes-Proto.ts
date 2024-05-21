import { TeacheProto } from "./Teachers-proto";
import { StudentsProto } from "./students-proto";

export interface CreateClasses {
  createStudents(First_Name: string, second_name: string, age: number, classe: number): StudentsProto
  createTeachers(name: string, subject: string): TeacheProto
}