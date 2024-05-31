import { Router } from "express";
const route = Router()

import {CreateTeachers} from '../controller/CreateTeachers'
const teachers = new CreateTeachers()

route.post('/teste', teachers.handle)

export {route}