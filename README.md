# Vendor Management & Procurement System (Odoo Hackathon)

A comprehensive, end-to-end B2B Vendor Management and Procurement software solution built for the Odoo Hackathon. This platform streamlines the entire procurement lifecycle—from vendor onboarding and management to Request for Quotations (RFQs), PO generation, and Invoicing.

## 🌟 Key Features

* **Role-Based Access Control (RBAC):** Secure access separated by user roles including Admin, Procurement Officer, Manager, and external Vendors.
* **Vendor Directory:** Maintain a centralized, searchable repository of all supplier profiles, tax information (GST/PAN), and contact details.
* **RFQ Management (Request for Quotation):** Procurement officers can draft detailed RFQs with line items and broadcast them to a targeted list of registered vendors.
* **Quotation & Bidding Portal:** Vendors have their own portal to review invited RFQs and submit competitive quotations.
* **Approval Workflows:** Multi-tier approval processes for high-value purchase orders and quotations.
* **Purchase Orders & Invoicing:** Seamlessly convert winning bids into Purchase Orders and track subsequent Invoices.
* **Modern UI/UX:** Responsive, accessible, and fast interface built with React, Tailwind CSS, and Shadcn UI.

## 🏗️ Technology Stack

### Backend
* **Framework:** .NET 8.0 ASP.NET Core Web API
* **Language:** C#
* **ORM:** Entity Framework Core
* **Database:** SQL Server
* **Authentication:** JWT (JSON Web Tokens) with BCrypt Password Hashing
* **Architecture:** N-Tier Architecture (Controllers, Services, Repositories)

### Frontend
* **Framework:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Components:** shadcn/ui (Radix UI)
* **Form Handling:** React Hook Form + Zod Schema Validation
* **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or Developer edition)

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Update the Database Connection String in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=OdooProcurementDb;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```
3. Run Entity Framework migrations to create the database schema:
   ```bash
   dotnet ef database update
   ```
4. Start the backend server (starts on `https://localhost:7111` or `http://localhost:5033`):
   ```bash
   dotnet run
   ```
   *Note: The database is automatically seeded with initial Admin and Vendor accounts upon creation.*

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary NPM dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the URL provided by Vite (usually `http://localhost:5173`).

## 📁 Project Structure

```text
odoo-hackathon/
│
├── backend/                  # .NET Core Web API
│   ├── Controllers/          # API Endpoints (Auth, RFQ, Vendors)
│   ├── Data/                 # Entity Framework DbContext & Seeders
│   ├── Models/               # Entities, DTOs, and Enums
│   ├── Repositories/         # Data Access Layer
│   └── Services/             # Business Logic Layer
│
└── frontend/                 # React Application
    ├── public/               # Static Assets
    ├── src/
    │   ├── api/              # Axios API Clients
    │   ├── components/       # Reusable UI Components (Shadcn)
    │   ├── pages/            # Application Pages (Dashboard, RFQ, etc.)
    │   ├── schemas/          # Zod Validation Schemas
    │   └── App.tsx           # Main Application Router
```

## 🔒 Security & Best Practices
* **Password Hashing:** All user passwords are encrypted using BCrypt before database persistence.
* **CORS:** Cross-Origin Resource Sharing is strictly configured to allow only the React frontend domains.
* **Global Error Handling:** Clean RESTful error responses mapped to proper HTTP status codes.
* **Transaction Management:** Multi-table inserts (like RFQs + Line Items) are wrapped in atomic database transactions to guarantee data integrity.

---
*Developed for the Odoo Hackathon*
