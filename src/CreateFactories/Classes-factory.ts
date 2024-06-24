import { CreateClasses } from "../interfaces/Create-Classes-Proto";
import { TeacheProto } from "../interfaces/Teachers-proto";
import { StudentsProto } from "../interfaces/students-proto";
import { Students } from "./Students-factory";
import { Teacher } from "./Teacher-factory";

export class AbstractClassesFactory implements CreateClasses{
  createStudents(userid:number, First_Name: string, age: number , classe: number, access:number): StudentsProto {

    const new_student = new Students(userid,First_Name, age,classe,access)
    new_student.createStudents(userid,First_Name,age,classe,access)
    
    return new_student
  }

  createTeachers(id:number, name: string, subject: string,classes: number[], access:number): TeacheProto {
    
     const new_teacher = new Teacher(id,name,subject,classes,access)
      new_teacher.createTeacher(id,name,subject,access)

      return new_teacher
    }
}
