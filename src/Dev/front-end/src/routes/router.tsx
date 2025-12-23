import { createBrowserRouter } from "react-router-dom";
import { Default } from '../pages/LandingPage/Default'
import Home from "../pages/Home/HomePage";
import LandingPage from "../pages/CourseLandingPage/LandingPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { Register } from "../pages/RegisterNewUser/JoinPage";
import { AdmPage } from "../pages/Project/Project";
import { Download } from "../pages/Downloader/Download";


import { UserProfileTimer } from "../pages/profile/src/App"
import { UserProfile } from "../pages/profile/UserProfile"
import { Chat } from "../pages/Chat/Chat"
import { AddFriends } from "../pages/Chat/AddFriends/AddFriends"
import { PersonalBooks } from '../pages/Library/pages/PrivateBooks/personalBook';
import { TranslateEpub } from '../pages/Library/pages/Translate/Translate';
import { PageNotFound } from '../pages/Library/pages/PageNotFound/PageNotFound';
import { EbookReader } from "../pages/Library/pages/NewEbook/book_reader";

import Library from "../pages/Library/pages/web_library/LibraryPage";

import { BookReader } from "../pages/Library/pages/book_reader/book_reader";
import { Legendas } from "../pages/Legendas/Legendas";
import { Demo } from "../pages/Chat/Demo/Demo";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />
  },
  {
    path: "/home/:id",
    element: <Home />
  },
  {
    path: "/landingPage",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/cadastro",
    element: <Register />
  },
  {
    path: "/project/:id",
    element: <AdmPage />
  },
  {
    path: "/Baixe",
    element: <Download />
  },
  {
    path: "/library/:id",
    element: <Library />
  },
  {
    path: "/book/:name",
    element: <EbookReader />,
  },
  {
    path: "/personal_book",
    element: <PersonalBooks mobile={false} />
  },
  {
    path: "/m_personal_book",
    element: <PersonalBooks mobile={true} />
  },
  {
    path: "/translate",
    element: <TranslateEpub />
  },
  {
    path: "/favorites",
    element: <PageNotFound />
  },
  {
    path: "/reading",
    element: <PageNotFound />
  },
  {
    path: "/comunity/:id",
    element: <Home />
  },
  {
    path: "/chat/:id",
    element: <Chat />
  },
  {
    path: "/chat/recruiter",
    element: <Demo />
  },
  {
    path: "/chat/:id/:username",
    element: <Chat />
  },
  {
    path: "chat/:id/new_friends",
    element: <AddFriends />
  },
  {
    path: "comunity/:id/:username/new_friends",
    element: <AddFriends />
  },
  {
    path: "profile/:id",
    element: <UserProfile />
  },
  {
    path: "profile-timer/:id",
    element: <UserProfileTimer />
  },
  {
    path: "/book/:name",
    element: <BookReader />,
  },
  {
    path: "/legendas",
    element: <Legendas />
  }
])

