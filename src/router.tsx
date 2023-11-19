import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  ErrorPage,
  HomePage,
  SigninFormPage,
  SignupFormPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signin", element: <SigninFormPage /> },
      { path: "/signup", element: <SignupFormPage /> },
    ],
  },
]);

export default router;
