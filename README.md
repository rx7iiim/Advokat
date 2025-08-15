# 🧑‍⚖️ Suits - Lawyers' Website  

A full-stack web application for managing lawyers, clients, cases, and subscriptions.  

[Watch the demo video](https://drive.google.com/file/d/1qftSte8MIs8hNTV4EnmdFxUHUbRMxizL/view?usp=drive_link)


## 🚀 Tech Stack  
- **Frontend:** nextjs ⚛️  
- **Backend:** NestJS 🏗️  
- **Database:** PostgreSQL (Hosted on Neon) 🗄️  
- **Authentication:** session-based-auth 🔑  
- **Deployment:** vercel 🌍  

---

## 📌 Features  
✅ User Authentication (Clients, Lawyers, Admins)  
✅ Lawyer Profile & Specialization Management  
✅ Case Tracking System  
✅ Subscription Plans & Payments  
✅ Appointment Scheduling (Agenda)  
✅ Dashboard for Admins & Managers  

---

## 📁 Project Structure  
```
/suits-project  
 ├── frontend/     # nextjs   
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
cd suits  
```

### 2️⃣ Backend Setup (NestJS)  
```sh
cd backend  
npm install  
cp .env.example .env  # Configure environment variables  
npm run start:dev  
```
👉 **API Runs on:** `http://localhost:5000`  

### 3️⃣ Frontend Setup (React + Vite)  
```sh
cd frontend  
npm install  
npm run dev  
```
👉 **UI Runs on:** `http://localhost:5173`  

---

## 📚 Database Configuration  
- **DBMS:** PostgreSQL (Neon)  
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
👥 **Team Members:** 6  suits
