import { AbstractClassesFactory } from "./controller/Classes-factory";

const turma = new AbstractClassesFactory()

const turma1 = turma.createStudents('Davi', 'avelino',17,3002)
const turma2 = turma.createTeachers('Monica', 'ingles')

console.log(turma1.infoStudent())
console.log(`\n -------`);
console.log(turma2.infoTeacher());

