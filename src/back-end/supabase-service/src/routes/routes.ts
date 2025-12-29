import { Router } from "express";
const route = Router()


import {CreateUser} from "../controller/User.controller/CreateUser"
import {GetStudentByEmail} from '../controller/User.controller/getStudents'
import { VerifyAccountLogin } from "../controller/User.controller/VerifyUserLogin";

import {GetId} from "../controller/User.controller/GetIndentificator"

import {CreateNotes} from '../controller/notes.controller/CreateNotes'

import {GetLastSave} from '../controller/notes.controller/GetLastSave'
import { GetUser } from "../controller/User.controller/GetUser";

import { CreateFriends } from "../controller/friends.controller/CreateFriends";
import { GetFriends } from "../controller/friends.controller/GetFriends";

import { CreateTimerController } from "../controller/timer.controller/CreateTimer";
import { GetTimer } from "../controller/timer.controller/GetTimer";
import { UpdateTimer } from "../controller/timer.controller/UpdateTimer";
import { GetYesterdayTimer } from "../controller/timer.controller/GetYesterdayTimer";
import { BestTimer } from "../controller/timer.controller/BestTimer";

const create = new CreateUser()

const getUserInfo = new GetUser()
const verifyAccount = new VerifyAccountLogin()

const students = new GetStudentByEmail()
const getStudentid = new GetId()

const notes = new CreateNotes()
const lastMessage = new GetLastSave()

const friends = new CreateFriends()
const getFriends = new GetFriends()

const createTimer = new CreateTimerController()
const getTimer = new GetTimer()
const updateTimer = new UpdateTimer()
const getYesterdayTimer = new GetYesterdayTimer()
const bestTimer = new BestTimer()

route.post('/create_account', create.handle)

route.get('/student/:email', students.handle)
route.get('/student_id/:email', getStudentid.handle)
route.post("/verify_account", verifyAccount.handle)


route.post('/notes', notes.handle)
route.get('/lastNote/:user_name', lastMessage.handle)

route.post('/userInfo', getUserInfo.handle)

route.post('/friends', getFriends.handle)
route.post('/newfriends', friends.handle)


route.post('/create_timer', createTimer.handle)
route.post('/get_timer', getTimer.handle)
route.post('/update_timer', updateTimer.handle)
route.post('/get_yesterday_timer', getYesterdayTimer.handle)
route.post('/get_best_timer', bestTimer.handle)

export {route}