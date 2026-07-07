import { createBrowserRouter } from "react-router-dom";
// import { Default } from '../pages/LandingPage/Default'
// import Home from "../pages/Home/HomePage";
// import LandingPage from "../pages/CourseLandingPage/LandingPage";
// import { LoginPage } from "../pages/Login/LoginPage";
// import { Register } from "../pages/RegisterNewUser/JoinPage";
// import { Download } from "../pages/Downloader/Download";


// import { UserProfile } from "../pages/profile/UserProfile"
// // import { Chat } from "../pages/Chat/Chat"
// import { AddFriends } from "../pages/Chat/AddFriends/AddFriends"
// import { PersonalBooks } from '../pages/Library/pages/PrivateBooks/personalBook';
// import { TranslateEpub } from '../pages/Library/pages/Translate/Translate';
// import { PageNotFound } from '../pages/Library/pages/PageNotFound/PageNotFound';
// import { EbookReader } from "../pages/Library/pages/NewEbook/book_reader";
// import { Post } from "../pages/Post/Post";
// import { CreatePost } from "../pages/Post/CreatePost/CreatePost";

// import Library from "../pages/Library/pages/web_library/LibraryPage";

// import { BookReader } from "../pages/Library/pages/book_reader/book_reader";
// import { Legendas } from "../pages/Legendas/Legendas";
// // import { Demo } from "../pages/Chat/Demo/Demo";
// import { Preview } from "@/pages/Post/Preview/Preview";
// import { Schedule } from "@/pages/profile/src/modules/schedule/schedule";
// import { Reading } from "@/pages/Library/pages/reading/reading";
// import { Posted } from "@/pages/Post/Posted/Posted";



import { StudyFlow2 } from "@/pages/testePages/videos/StudyFlow2";
import { BookLibrary } from "@/pages/testePages/library/Library";
import { Page } from "@/pages/testePages/landingPage/LandingPage"
import HomePage from "@/pages/testePages/home/HomePage";
import { ChatPage } from "@/pages/testePages/chat/Chat";
import { Translate } from "@/pages/testePages/translate/Translate";
import { Login } from "@/pages/testePages/login/Login";
import { Biblioteca } from "@/pages/testePages/biblioteca/Biblioteca";
import { Cadastro } from "@/pages/testePages/cadastro/Cadastro";
import GrupoEstudo from "@/pages/testePages/grupos/GrupoEstudo";
import { Metas } from "@/pages/testePages/metas/Metas";
import { Grupo } from "@/pages/testePages/grupos/grupoInfo/Grupo";
import { Pomodoro } from "@/pages/testePages/pomodoro/Pomodoro";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />
  },
  {
    path: "/pomodoro/:name/:id",
    element: <Pomodoro />
  },
  {
    path: "/metas/:name/:id",
    element: <Metas />
  },
  {
    path: "/grupo/:name/:id",
    element: <Grupo />
  },
  {
    path: "/grupos/:name/:id",
    element: <GrupoEstudo />
  },
  {
    path: "/biblioteca/:name/:id",
    element: <Biblioteca />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/traduzir/:name/:id",
    element: <Translate />
  },
  {
    path: "/chat/:name/:id",
    element: <ChatPage />
  },
  {
    path: "/home/:name/:id",
    element: <HomePage />
  },
  {
    path: "/books/:name/:id",
    element: <BookLibrary />
  },
  {
    path: "/videos/:name/:id",
    element: <StudyFlow2 />
  },

  //---------------------------------------


  // {
  //   path: "/home/:name/:id",
  //   element: <Home />
  // },
  // {
  //   path: "/landingPage",
  //   element: <LandingPage />
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />
  // },
  // {
  //   path: "/cadastro",
  //   element: <Register />
  // },

  // {
  //   path: "/Baixe",
  //   element: <Download />
  // },
  // {
  //   path: "/library/:name/:id",
  //   element: <Library />
  // },
  // {
  //   path: "/book/:name/:id/:book_name/:author",
  //   element: <EbookReader />,
  // },
  // {
  //   path: "/personal_book/:name/:id",
  //   element: <PersonalBooks mobile={false} />
  // },
  // {
  //   path: "/m_personal_book",
  //   element: <PersonalBooks mobile={true} />
  // },
  // {
  //   path: "/translate",
  //   element: <TranslateEpub />
  // },
  // {
  //   path: "/favorites",
  //   element: <PageNotFound />
  // },
  // {
  //   path: "/reading/:name/:id",
  //   element: <Reading />
  // },
  // {
  //   path: "/comunity/:id",
  //   element: <Home />
  // },
  // {
  //   path: "/chat/:id",
  //   element: <Chat />
  // },
  // {
  //   path: "/chat/recruiter",
  //   element: <Demo />
  // },
  // {
  //   path: "/chat/:username/:id",
  //   element: <Chat />
  // },
  //   {
  //     path: "/chat/:id/new_friends",
  //     element: <AddFriends />
  //   },
  //   {
  //     path: "/comunity/:id/:username/new_friends",
  //     element: <AddFriends />
  //   },
  //   {
  //     path: "/profile/:name/:id",
  //     element: <UserProfile />
  //   },
  //   {
  //     path: "/schedule/:name/:id",
  //     element: <Schedule />
  //   },
  //   {
  //     path: "/book/:name",
  //     element: <BookReader />,
  //   },
  //   {
  //     path: "/legendas",
  //     element: <Legendas />
  //   },
  //   {
  //     path: "/post/:id",
  //     element: <Post />
  //   },
  //   {
  //     path: "/create_post/:username/:id",
  //     element: <CreatePost />
  //   },
  //   {
  //     path: '/create_post/:username/:id/preview',
  //     element: <Preview />
  //   },
  //   {
  //     path: "/projects/:name/:id",
  //     element: <Posted />
  //   }
])

