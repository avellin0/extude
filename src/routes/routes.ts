import { Router } from "express";
const route = Router()

import {CreateTeachers} from '../controller/CreateTeachers'
import {signIn} from '../auth/auth-client'

const teachers = new CreateTeachers()


route.post('/teste', teachers.handle)
route.post('/token', signIn)

export {route}