# 🧑‍⚖️ Suits - Lawyers' Website  

A full-stack web application for managing lawyers, clients, cases, and subscriptions.  

## 🚀 Tech Stack  
- **Frontend:** nextjs ⚛️  
- **Backend:** NestJS 🏗️  
- **Database:** PostgreSQL  🗄️  
- **Authentication:** session based 🔑  
- **Deployment:** vercel 🌍  

---

## 📌 Features  
✅ User Authentication (Managers, Lawyers, Admins)  
✅ Lawyer Profile & Specialization Management  
✅ Case Tracking System  
✅ Subscription Plans & Payments  
✅ Appointment Scheduling (Agenda)  
✅ Dashboard for Admins & Managers  

---

## 📁 Project Structure  
```
/suits-project  
 ├── frontend/     # React + Vite (UI)  
 ├── backend/      # NestJS (API)  
 ├── database/     # PostgreSQL Schema & Migrations  
 ├── docs/         # Documentation & ERD  
 ├── README.md     # Project Documentation  
```

---

## 💻 Setup & Installation  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/rx7iiim/Advokat
cd Advokat  
```

### 2️⃣ Backend Setup (NestJS)  
```sh
cd backend  
npm install  
cp .env  # Configure environment variables  
npm run start:dev  
```
👉 **API Runs on:** `http://localhost:5008`  

### 3️⃣ Frontend Setup (React + Vite)  
```sh
cd frontend  
npm install  
npm run dev  
```
👉 **UI Runs on:** `http://localhost:3000`  

---

## 📚 Database Configuration  
- **DBMS:** PostgreSQL 
- **Migrations:** TypeORM  

To apply database migrations:  
```sh
cd backend  
npm run migration:run  
```

---

## 🚀 Team  
👨‍💻 **Project Name:** Advokat  
📌 **University Level:** 2CP (Second-Year Computer Science)  
👥 **Team Members:** 6  
