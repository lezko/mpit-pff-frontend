import { createHashRouter, Navigate } from 'react-router-dom';
import { FeedsListPage } from '@/pages/FeedsListPage.jsx';
import { FeedEditPage } from '@/pages/FeedEditPage.jsx';

export const router = createHashRouter([
    {
        path: '/',
        element: <Navigate to="/home"/>,
    },
    {
        path: '/home',
        element: <FeedsListPage/>
    },
    {
        path: '/feed/:feedId',
        element: <FeedEditPage/>
    }
])
