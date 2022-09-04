import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import PostCreate from "./pages/PostCreate";
import UserProfilePage from "./pages/UserProfilePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "/help",
      element: <HelpPage />,
      id: 2,
    },
    {
      link: "/profile/:id",
      element: <UserProfilePage />,
      id: 3,
    },
    {
      link: "/chats",
      element: <ChatPage />,
      id: 4,
    },
    {
      link: "/upload",
      element: <PostCreate />,
      id: 5,
    },
    {
      link: "/postdetail/:id",
      element: <PostDetailsPage />,
      id: 6,
    },
    {
      link: "/favorites",
      element: <FavoritesPage />,
      id: 7,
    }

  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((route) => (
        <Route path={route.link} element={route.element} key={route.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
