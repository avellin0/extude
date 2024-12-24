import { Router } from "express";
const route = Router()

import {CreateUser} from "../controller/CreateUser"
import {GetStudents} from '../controller/getStudents'
import {GetId} from "../controller/GetIndentificator"
import {CreateNotes} from '../controller/CreateNotes'
import {GetLastSave} from '../controller/GetLastSave'

const create = new CreateUser()
const students = new GetStudents()
const getStudentid = new GetId()
const notes = new CreateNotes()
const lastMessage = new GetLastSave()

route.post('/create_account', create.handle)
route.post('/students', students.handle)
route.get('/student_id/:email', getStudentid.handle)
route.post('/notes', notes.handle)
route.get('/lastMessage/:id', lastMessage.handle)

export {route}