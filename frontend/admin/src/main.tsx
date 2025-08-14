// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotPasswordCode from "./pages/auth/ForgotPasswordCode";
import ForgotPasswordReset from "./pages/auth/ForgotPasswordReset";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/forgot-password-code", element: <ForgotPasswordCode /> },
  { path: "/forgot-password-reset", element: <ForgotPasswordReset /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
