import { createBrowserRouter } from 'react-router-dom';
import {
  ErrorPage,
  HomePage,
  Layout,
  ProfilePage,
  SavePostsPage,
  SigninFormPage,
  SignupFormPage,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/signin', element: <SigninFormPage /> },
      { path: '/signup', element: <SignupFormPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/save-posts', element: <SavePostsPage /> },
    ],
  },
]);

export default router;
