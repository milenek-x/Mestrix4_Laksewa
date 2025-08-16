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
import Roles from "./pages/roles/Role";
import UserList from "./pages/users/UserList";
import DepartmentList from "./pages/departments/DepartmentList";
import ServiceList from "./pages/services/ServiceList";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  // Public / Auth routes
  { path: "/", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/forgot-password-code", element: <ForgotPasswordCode /> },
  { path: "/forgot-password-reset", element: <ForgotPasswordReset /> },

  // App routes (with sidebar via MainLayout)
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <Roles /> },
      { path: "roles", element: <Roles /> },
      { path: "users", element: <UserList /> },
      { path: "departments", element: <DepartmentList /> },
      { path: "services", element: <ServiceList /> },
      { path: "settings", element: <div>Setting</div> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap your entire application with AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);