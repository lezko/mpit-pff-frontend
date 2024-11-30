import { createHashRouter, Navigate } from "react-router-dom";
import { FeedsListPage } from "@/pages/FeedsListPage.jsx";
import { FeedEditPage } from "@/pages/FeedEditPage.jsx";
import { HistoryPage } from "@/pages/HistoryPage.jsx";
import { Layout } from "@/components/Layout.jsx";

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <FeedsListPage />,
      },
      {
        path: "/feed/:feedId",
        element: <FeedEditPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
]);
