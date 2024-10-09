import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout, RequireAuth } from "./App.jsx";
import Home from "./routes/Homepage/Home";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Listpage from "./routes/ListPage/Listpage.jsx";
import Detail from "./routes/DetailPage/Detail.jsx";
import Profile from "./routes/ProfilePage/Profile.jsx";
import Register from "./routes/register/Register.jsx";
import Login from "./routes/login/Login.jsx";
import { AuthContext, AuthContextProvider } from "./context/AuthContext.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage.jsx";
import NewPostPage from "./routes/newPostPage/NewPostPage.jsx";
import { listPageLoader, singlePostLoader } from "./lib/loader.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        loader: listPageLoader,
        element: <Listpage />,
      },
      {
        path: "/item/:id",
        loader: singlePostLoader,
        element: <Detail />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
      },
      {
        path: "/add-post",
        element: <NewPostPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </StrictMode>
  </AuthContextProvider>
);
