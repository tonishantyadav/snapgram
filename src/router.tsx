import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@components/layouts';
import { ExplorePage } from '@pages/explore';
import { HomePage } from '@pages/home';
import { PostCreatePage, PostDetailPage, PostSavedPage } from '@post/pages';
import { UserProfilePage, UserSigninPage, UserSignupPage } from '@user/pages';
import ErrorPage from '@pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/signin', element: <UserSigninPage /> },
      { path: '/signup', element: <UserSignupPage /> },
      { path: '/profile/:id', element: <UserProfilePage /> },
      { path: '/create', element: <PostCreatePage /> },
      { path: '/saved', element: <PostSavedPage /> },
      { path: '/post/:id', element: <PostDetailPage /> },
      { path: '/explore', element: <ExplorePage /> },
    ],
  },
]);

export default router;
