import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { roles } from "./auth/role.util";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import QuotationComparisonPage from "./pages/QuotationComparisonPage";
import RFQForm from "./pages/RFQForm";
import VendorForm from "./pages/VendorForm";
import VendorsPage from "./pages/VendorsPage";

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
        path: "vendors/:id/edit",
        element: <VendorForm />
      },
      {
        path: "rfqs",
        element: <RFQForm />,
      },
      {
        path: "quotations",
        element: <QuotationComparisonPage />,
      },
      {
        path: "approvals",
        element: <Dashboard />,
      },
      {
        path: "purchase-orders",
        element: <Dashboard />,
      },
      {
        path: "invoices",
        element: <Dashboard />,
      },
      {
        path: "reports",
        element: <Dashboard />,
      },
      {
        path: "activity",
        element: <Dashboard />,
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

export default router;
