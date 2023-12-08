import { Experimental_CssVarsProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./admin/admin.tsx";
import { store } from "./core/store.ts";
import { BookDetails } from "./home/bookDetails.tsx";
import Home from "./home/home.tsx";
import "./index.css";
import { Layout } from "./layout.tsx";
import Login from "./login/login.tsx";
import { SignUp } from "./login/signUp.tsx";
import Profile from "./profile/profile.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books/:id", element: <BookDetails /> },
      { path: "admin", element: <Admin /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <Login /> },
      { path: "login/signup", element: <SignUp /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Experimental_CssVarsProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Experimental_CssVarsProvider>
  </React.StrictMode>
);
