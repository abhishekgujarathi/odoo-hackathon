import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
<<<<<<< HEAD
=======
import ProtectedRoute from "./auth/ProtectedRoute";
import { roles } from "./auth/role.util";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import VendorsPage from "./pages/VendorsPage";
import VendorForm from "./pages/VendorForm";
import RFQForm from "./pages/RFQForm";
import QuotationComparisonPage from "./pages/QuotationComparisonPage";
>>>>>>> 18585d1393006221ba19828d9dcc4c9d1d8013ee

// Pages
import Dashboard from "./pages/Dashboard";
import VendorsPage from "./pages/VendorsPage";
import VendorForm from "./pages/VendorForm";
import RFQForm from "./pages/RFQForm";
import { ErrorBoundary } from "./components/ErrorBoundary";
import QuotationComparisonPage from "./pages/QuotationComparisonPage";


const router = createBrowserRouter([
<<<<<<< HEAD
  // Public routes
  { path: "/login", element: <LoginPage /> },

  // Protected routes (with sidebar)
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "vendors/add", element: <VendorForm /> },
      { path: "vendors/:id/edit", element: <ErrorBoundary><VendorForm /></ErrorBoundary> },
      { path: "rfqs", element: <Navigate to="/" replace /> },
      { path: "rfqs/create", element: <RFQForm /> },
      { path: "quotations", element: <QuotationComparisonPage /> },
      { path: "approvals", element: <Navigate to="/" replace /> },
      { path: "purchase-orders", element: <Navigate to="/" replace /> },
      { path: "invoices", element: <Navigate to="/" replace /> },
      { path: "reports", element: <Navigate to="/" replace /> },
      { path: "activity", element: <Navigate to="/" replace /> },
    ],
  },

  // Catch-all
  { path: "*", element: <ErrorPage /> },
=======
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
>>>>>>> 18585d1393006221ba19828d9dcc4c9d1d8013ee
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
