import { createBrowserRouter } from "react-router-dom";
import { Default } from '../pages/Default'
import Home from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import App from "../App";
import LoginPage from "../pages/LoginPage";

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
   path: "/home",
   element: <Home/>
 },
 {
   path: "/landingPage",
   element: <LandingPage/>
 },
 {
  path:"/login",
  element: <LoginPage/>
 }
])

