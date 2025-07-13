# 📊 IPO Admin API

A secure and scalable backend REST API built with **Node.js**, **Express.js**, and **MongoDB** to manage IPO listings, company data, and regulatory document uploads. Designed for an **admin dashboard** and **mobile app integration**.

---

## 🚀 Features

- ✅ Admin login with JWT authentication
- ✅ Role-based access control (Admin/Public)
- ✅ CRUD operations for Companies and IPOs
- ✅ Upload and download RHP/DRHP documents
- ✅ Dashboard statistics for Admins
- ✅ Public API endpoints for mobile apps

---

## 🛠️ Tech Stack

| Layer         | Technology           |
|---------------|----------------------|
| Backend       | Node.js + Express.js |
| Database      | MongoDB + Mongoose   |
| Auth          | JWT (admin only)     |
| File Upload   | Multer (local)       |
| API Format    | REST (JSON)          |
| Testing Tool  | Postman              |

---

## 📁 Folder Structure

ipo-admin-api/
├── config/ # DB connection
├── controllers/ # Business logic
├── middlewares/ # Auth & role checks
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── uploads/ # Uploaded PDFs
├── .env.example # Environment config sample
├── server.js # App entry point
├── README.md # Project documentation



---

## ⚙️ .env Format

Create a `.env` file in the root with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
UPLOAD_FOLDER=uploads


# Install dependencies
npm install

# Start the development server
npm run dev

# OR for production
node server.js

🔐 Authentication & Authorization
Type	Role	Access Scope
Public	User	View IPOs, Download RHP/DRHP PDFs
Private	Admin	Create/Edit/Delete IPOs, Manage Companies & Docs

🔍 API Endpoints Summary
📁 Auth
Method	Endpoint	Description	Access
POST	/api/auth/login	Admin Login (JWT)	Public


🏢 Companies
Method	Endpoint	Description	Access
GET	/api/companies	List all companies	Public
POST	/api/companies	Add a company	Admin
GET	/api/companies/:id	Get company details	Public
PUT	/api/companies/:id	Update company	Admin
DELETE	/api/companies/:id	Delete company	Admin

📈 IPOs
Method	Endpoint	Description	Access
GET	/api/ipos	Get all IPOs (paginated)	Public
GET	/api/ipos/search?q=	Search IPOs	Public
GET	/api/ipos/:id	Get IPO details	Public
POST	/api/ipos	Create new IPO	Admin
PUT	/api/ipos/:id	Update IPO	Admin
DELETE	/api/ipos/:id	Delete IPO	Admin

📄 Documents
Method	Endpoint	Description	Access
POST	/api/ipos/:id/upload	Upload RHP/DRHP PDF	Admin
GET	/api/ipos/:id/download	Download RHP/DRHP PDF	Public
DELETE	/api/ipos/:id/delete-doc	Delete IPO Document	Admin

📊 Admin Dashboard
Method	Endpoint	Description	Access
GET	/api/admin/stats	View total IPOs & companies	Admin
GET	/api/admin/logs	View login logs (if built)	Admin

