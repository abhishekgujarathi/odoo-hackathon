// components/layout/AppSidebar.tsx

import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Vendors", path: "/vendors" },
  { name: "RFQs", path: "/rfqs" },
  { name: "Quotations", path: "/quotations" },
  { name: "Approvals", path: "/approvals" },
  { name: "Purchase Orders", path: "/purchase-orders" },
  { name: "Invoices", path: "/invoices" },
  { name: "Reports", path: "/reports" },
  { name: "Activity", path: "/activity" },
];

export default function AppSidebar() {
  return (
    <aside className="w-64 border-r">
      <div className="h-16 border-b flex items-center px-5">
        <h1 className="font-bold text-xl">
          VendorBridge
        </h1>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm
              ${isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}