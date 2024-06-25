import { Router } from "express";
const route = Router()

import {CreateTeachers} from '../controller/CreateTeachers'
import { CreateStudents } from "../controller/CreateStudents";
import { getTeachers } from "../controller/getTeachers";
import { getStudents } from "../controller/getStudents";
import { getStudentsInfo } from "../controller/getStudentinfo";

const teachers = new CreateTeachers()
const students = new CreateStudents()
const getteachers = new getTeachers()
const getstudents = new getStudents()
const getstudentinfo = new getStudentsInfo()

import { signInTeacher } from "../auth/CreateTeacherToken";
import { signInStudent } from "../auth/CreateStudentToken";

import { authMiddleware } from "../middleware/middleware";

route.post('/new_teacher', teachers.handle)
route.post('/new_student', students.handle)
route.post('/teacher_token', signInTeacher)
route.post('/student_token', signInStudent)
route.get('/teachers', authMiddleware(['professor']), getteachers.handle)
route.get('/students', authMiddleware(['aluno','professor']), getstudents.handle)
route.get('/teste',authMiddleware(['aluno','professor']), getstudentinfo.handle)


export {route}