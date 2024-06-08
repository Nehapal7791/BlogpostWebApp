import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import PostDetail from "./Pages/PostDetail";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import UserProfile from "./Pages/UserProfile";
import CreatePost from "./Pages/CreatePost";
import CategoryPosts from "./Pages/CategoryPosts";
import Authors from "./Pages/Author";
import AuthorPosts from "./Pages/AuthorPosts";
import Dashboard from "./Pages/Dashboard";
import EditPost from "./Pages/EditPost";
import Register from "./Pages/Register";
import DeletePost from "./Pages/DeletePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile/:id",
        element: <UserProfile />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
      {
        path: "posts/categories/:category",
        element: <CategoryPosts />,
      },
      {
        path: "posts/users/:id",
        element: <AuthorPosts />,
      },
      {
        path: "myposts/:id",
        element: <Dashboard />,
      },
      {
        path: "myposts/:id/delete",
        element: <DeletePost />,
      },
      {
        path: "posts/:id/edit",
        element: <EditPost />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
