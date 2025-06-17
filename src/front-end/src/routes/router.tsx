import { createBrowserRouter } from "react-router-dom";
import { Default } from '../pages/LandingPage/Default'
import Home from "../pages/Home/HomePage";
import LandingPage from "../pages/CourseLandingPage/LandingPage";
import App from "../App";
import {LoginPage} from "../pages/Login/LoginPage";
import {Register } from "../pages/RegisterNewUser/JoinPage";
import { AdmPage } from "../pages/Project/Project";
import { Download } from "../pages/Downloader/Download";
import {LibraryPage} from "../pages/Library/LibraryPage"
import LibraryBookPage from "../pages/Library/Books/LibraryBookPage";
import Chat from "../pages/Chat/Chat";
import { PrivateChat } from "../pages/Chat/Individual-chat/PrivateChat";
import { AddFriends } from "../pages/Chat/AddFriends/AddFriends";
import {UserProfile} from "../pages/profile/UserProfile"

export const router = createBrowserRouter([
 {
    path: "/",
    element: <Default/>
 },
 {
   path: "/app",
   element: <App/>
 },
 {
   path: "/home/:id",
   element: <Home/>
 },
 {
   path: "/landingPage",
   element: <LandingPage/>
 },
 {
  path:"/login",
  element: <LoginPage/>
 },
 {
  path: "/cadastro",
  element: <Register/>
 },
 {
  path: "/project/:id",
  element: <AdmPage/>
 },
 {
  path: "/Baixe",
  element: <Download/>
 },
 {
  path: "/library/:id",
  element: <LibraryPage/>
 },
 {
  path: "/book/:id/:book",
  element: <LibraryBookPage/>
 },
 {
  path: "/comunity/:id",
  element: <Home/>
 },
 {
  path: "/chat/:id",
  element:<Chat permission={true}/>
 },
 {
  path:"/chat/:id/:username",
  element: <PrivateChat/>
 },
 {
  path: "chat/:id/new_friends",
  element: <AddFriends/>
 },
 {
  path: "comunity/:id/:username/new_friends",
  element: <AddFriends/>
 },
 {
  path: "profile/:id",
  element: <UserProfile/>

 }
])

