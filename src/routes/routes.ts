import { Router } from "express";
const route = Router()

import {CreateTeachers} from '../controller/CreateTeachers'
import { getTeachers } from "../controller/getTeachers";
import { getStudents } from "../controller/getStudents";

const teachers = new CreateTeachers()
const getteachers = new getTeachers()
const getstudents = new getStudents()

import { signInTeacher } from "../auth/CreateTeacherToken";
import { signInStudent } from "../auth/CreateStudentToken";

import { authMiddleware } from "../middleware/middleware";

route.post('/teste', teachers.handle)
route.post('/teacher_token', signInTeacher)
route.post('/student_token', signInStudent)
route.get('/teachers', authMiddleware(['professor']), getteachers.handle)
route.get('/students', authMiddleware(['aluno']), getstudents.handle)


export {route}