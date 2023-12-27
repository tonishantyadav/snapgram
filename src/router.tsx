import { createBrowserRouter } from 'react-router-dom';
import {
  CreatePostPage,
  ErrorPage,
  HomePage,
  Layout,
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
      { path: '/create', element: <CreatePostPage /> },
      { path: '/saved', element: <SavePostsPage /> },
      { path: '/post/:id', element: <PostDetailPage /> },
    ],
  },
]);

export default router;
