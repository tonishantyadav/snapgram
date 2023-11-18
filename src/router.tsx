import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, HomePage, Layout, SigninPage, SignupPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signin", element: <SigninPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

export default router;
