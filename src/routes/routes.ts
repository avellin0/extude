import { Router } from "express";
const route = Router()

import {CreateTeachers} from '../controller/CreateTeachers'
const teachers = new CreateTeachers()

import { signIn } from "../auth/auth-client";

route.post('/teste', teachers.handle)
route.post('/token', signIn)

export {route}