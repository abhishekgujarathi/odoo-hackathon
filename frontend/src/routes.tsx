import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { roles } from "./auth/role.util";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import VendorsPage from "./pages/VendorsPage";
import VendorForm from "./pages/VendorForm";
import RFQForm from "./pages/RFQForm";
import QuotationComparisonPage from "./pages/QuotationComparisonPage";

const { admin, user } = roles;


const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute allowedRoles={[admin, user]}>
      <AppLayout />
    </ProtectedRoute>),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "vendors",
        element: <VendorsPage />,
      },
      {
        path: "vendors/add",
        element: <VendorForm />,
      },
      {
        path: "rfqs",
        element: <RFQForm />,
      },
      {
        path: "quotations",
        element: <QuotationComparisonPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);


// const router = createBrowserRouter([

//   {
//     // path: "/",
//     // element: (
//     //   <ProtectedRoute>
//     //     <MainLayout />
//     //   </ProtectedRoute>
//     // ),
//     path: "/",
//     element: <LoginPage />,
//     // element: <PublicLayout />,
//     // children: [
//     //   { path: "/login", element: <LoginPage /> },
//     // ],
//   },
//   { path: "/login", element: <LoginPage /> },
//   { path: "*", element: <ErrorPage /> },
// ]);

export default router;
