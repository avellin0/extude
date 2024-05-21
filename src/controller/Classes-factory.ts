import { CreateClasses } from "../interfaces/Create-Classes-Proto";
import { TeacheProto } from "../interfaces/Teachers-proto";
import { StudentsProto } from "../interfaces/students-proto";
import { Students } from "./Students-factory";
import { Teacher } from "./Teacher-factory";

export class AbstractClassesFactory implements CreateClasses{
  createStudents(First_Name: string, second_name: string, age: number , classe: number): StudentsProto {
    return new Students(First_Name, second_name, age, classe)
  }

  createTeachers(name: string, subject: string): TeacheProto {
    return new Teacher(name, subject, [3001,3002,2001,2002])
  }
}
