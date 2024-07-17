import { Router } from "express";
const rota = Router()

import {CreateUser} from '../controller/CreateUser'
const user = new CreateUser()

rota.post('/create_account', user.handle)

export {rota}