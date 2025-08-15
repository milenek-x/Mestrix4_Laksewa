// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotPasswordCode from "./pages/auth/ForgotPasswordCode";
import ForgotPasswordReset from "./pages/auth/ForgotPasswordReset";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/forgot-password-code", element: <ForgotPasswordCode /> },
  { path: "/forgot-password-reset", element: <ForgotPasswordReset /> },

  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <div>Dashboard</div> },
      { path: "dashboard", element: <div>Dashboard</div> },
      { path: "users", element: <div>User Management</div> },
      { path: "departments", element: <div>Department Management</div> },
      { path: "services", element: <div>Service Management</div> },
      { path: "settings", element: <div>Setting</div> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
