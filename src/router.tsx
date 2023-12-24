import { createBrowserRouter } from 'react-router-dom';
import {
  CreatePostPage,
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
      { path: '/profile/:id', element: <ProfilePage /> },
      { path: '/create-post', element: <CreatePostPage /> },
      { path: '/save-posts', element: <SavePostsPage /> },
    ],
  },
]);

export default router;
