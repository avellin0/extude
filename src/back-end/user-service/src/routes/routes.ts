import { Router } from "express";
const route = Router()

import {CreateUser} from "../../src/controller/User.controller/CreateUser"
import {GetStudents} from '../controller/User.controller/getStudents'
import {GetId} from "../controller/User.controller/GetIndentificator"
import {CreateNotes} from '../../src/controller/notes.controller/CreateNotes'
import {GetLastSave} from '../../src/controller/notes.controller/GetLastSave'
import { GetUser } from "../controller/User.controller/GetUser";
import { CreateFriends } from "../../src/controller/friends.controller/CreateFriends";
import { GetFriends } from "../../src/controller/friends.controller/GetFriends";

const create = new CreateUser()
const students = new GetStudents()
const getStudentid = new GetId()
const notes = new CreateNotes()
const lastMessage = new GetLastSave()
const getUserInfo = new GetUser()
const friends = new CreateFriends()
const getFriends = new GetFriends()


route.post('/create_account', create.handle)
route.post('/students', students.handle)
route.get('/student_id/:email', getStudentid.handle)
route.post('/notes', notes.handle)
route.get('/lastNote/:id', lastMessage.handle)
route.post('/userInfo', getUserInfo.handle)
route.post('/friends', getFriends.handle)
route.post('/newfriends', friends.handle)

export {route}