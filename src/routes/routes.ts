import { Router } from "express";
const route = Router()

<<<<<<< HEAD
=======
import {CreateUser} from "../controller/CreateUser"
const create = new CreateUser()

route.post('/create_account', create.handle)
>>>>>>> schedule_2.0

export {route}