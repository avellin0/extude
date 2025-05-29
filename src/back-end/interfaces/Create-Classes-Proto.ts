import { TeacheProto } from "./Teachers-proto";
import { StudentsProto } from "./students-proto";

export interface CreateClasses {
  createUser(userid:number , name: string, email: string, password: string , permission: string): StudentsProto
}