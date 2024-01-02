import { createBrowserRouter } from 'react-router-dom';
import {
  ErrorPage,
  HomePage,
  Layout,
  PostCreatePage,
  PostDetailPage,
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
      { path: '/profile/:id', element: <ProfilePage /> },
      { path: '/create', element: <PostCreatePage /> },
      { path: '/saved', element: <SavePostsPage /> },
      { path: '/post/:id', element: <PostDetailPage /> },
    ],
  },
]);

export default router;
