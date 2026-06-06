import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { roles } from "./auth/role.util";

const { admin, user } = roles;

const router = createBrowserRouter([
  {
    // path: "/",
    // element: (
    //   <ProtectedRoute>
    //     <MainLayout />
    //   </ProtectedRoute>
    // ),
    path: "/",
    element: <MainLayout />,
    // element: <PublicLayout />,
    // children: [
    //   { path: "/login", element: <LoginPage /> },
    // ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
