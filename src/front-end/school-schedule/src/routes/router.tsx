import { createBrowserRouter } from "react-router-dom";
import { CreateStudent } from '../pages/CreateStudentsPage';
import { Default } from "@/layout/Default";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: 'login', // Remover a barra invertida inicial
        element: <CreateStudent />
      }
    ]
  }
]);

export default router;
