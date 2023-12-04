import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./admin/admin.tsx";
import Home from "./home/home.tsx";
import "./index.css";
import { Layout } from "./layout.tsx";
import Login from "./login/login.tsx";
import Profile from "./profile/profile.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "admin", element: <Admin /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
