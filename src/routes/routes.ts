import { Router } from "express";
const route = Router()

import {CreateTeachers} from '../controller/CreateTeachers'
import { getTeachers } from "../controller/getTeachers";

const teachers = new CreateTeachers()
const getteachers = new getTeachers()

import { signIn } from "../auth/auth-client";
import { authmiddleware } from "../middleware/middleware";

route.post('/teste', teachers.handle)
route.post('/token', signIn)
route.get('/teachers', authmiddleware(['professor']), getteachers.handle)

export {route}