import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, HomePage, Layout } from './pages';
import { PostCreatePage, PostDetailPage, PostSavedPage } from './post';
import { ProfilePage, SigninFormPage, SignupFormPage } from './user';

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
      { path: '/saved', element: <PostSavedPage /> },
      { path: '/post/:id', element: <PostDetailPage /> },
    ],
  },
]);

export default router;
