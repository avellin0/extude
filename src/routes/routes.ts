import { Router } from "express";
const route = Router()

import {CreateUser} from "../controller/CreateUser"
const create = new CreateUser()

route.post('/create_account', create.handle)

export {route}