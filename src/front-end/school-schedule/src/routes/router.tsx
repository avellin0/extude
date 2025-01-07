import { createBrowserRouter } from "react-router-dom";
import { Default } from '../pages/Default'
import Home from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import App from "../App";
import {LoginPage} from "../pages/LoginPage";
import {Register } from "../pages/JoinPage";
import { AdmPage } from "../pages/Project";
import { Download } from "../pages/Download";
import {LibraryPage} from "../pages/LibraryPage"
import LibraryBookPage from "../pages/LibraryBookPage";
import Chat from "../pages/Chat";
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
  element: <Chat/>
 }
])

