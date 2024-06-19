import { CreateClasses } from "../interfaces/Create-Classes-Proto";
import { TeacheProto } from "../interfaces/Teachers-proto";
import { StudentsProto } from "../interfaces/students-proto";
import { Students } from "./Students-factory";
import { Teacher } from "./Teacher-factory";

export class AbstractClassesFactory implements CreateClasses{
  createStudents(First_Name: string, second_name: string, age: number , classe: number): StudentsProto {
    return new Students(First_Name, second_name, age, classe)
  }

  createTeachers(id:number, name: string, subject: string,classes: number[], access:number): TeacheProto {
     const new_teacher = new Teacher(id,name,subject,classes,access)
      new_teacher.createTeacher(id,name,subject,access)

      return new_teacher
    }
}
