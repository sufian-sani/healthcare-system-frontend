# 🏥 Healthcare System – Frontend (React)

This is the **frontend** of the Healthcare System where patients can view doctors, search by specialization/location/availability, and book appointments. Built with **React (Vite)** and connected to a Django REST API.

---

## 🚀 Features

✅ **Doctor Registration Form** with dynamic **Division → District → Thana** selection  
✅ **Search Doctors** by **specialization, location, and available date**  
✅ **Responsive Doctor Listing** with profile details and schedule availability  
✅ **Appointment Booking Button** (navigates to doctor details page)  
✅ **Bootstrap 5 UI with React Hooks**  

---

## 🛠 Tech Stack

- **React 18 + Vite** (fast frontend development)  
- **Bootstrap 5** (styling)  
- **Axios** (API requests)  
- **React Router DOM** (navigation)  

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Doctor listing & search
│   │   ├── DoctorRegister.jsx    # Doctor registration form
│   │   ├── DoctorDetails.jsx     # Single doctor details & booking
│   │   └── Login.jsx             # (If authentication used)
│   ├── components/
│   │   └── Layout.jsx            # Common layout wrapper
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 🔥 Installation & Setup

### **1️⃣ Clone & Install**

```bash
git clone https://github.com/yourusername/healthcare-frontend.git
cd healthcare-frontend

npm install
```

### **2️⃣ Run Development Server**

```bash
npm run dev
```

By default, frontend will run at:  
👉 `http://localhost:5173/`

Make sure your **Django backend** is running at `http://127.0.0.1:8000/`.

---

## 🔗 API Connection

The frontend calls the following API endpoints from the Django backend:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `http://127.0.0.1:8000/api/users/doctors/` | Fetch all doctors (with optional filters) |
| `POST` | `http://127.0.0.1:8000/api/users/register/` | Register as a doctor |
| `GET`  | `http://127.0.0.1:8000/api/users/doctors/<id>/` | Get a single doctor with schedule |

---

## 🖼 Pages Overview

### ✅ **Home Page** (`Home.jsx`)  
- Displays doctor cards with details.  
- Search filters for **specialization, location, and date**.  
- Disabled booking button for incomplete doctor profiles.

### ✅ **Doctor Registration Page** (`DoctorRegister.jsx`)  
- Full form to register as a doctor.  
- Dynamic **Division → District → Thana** dropdowns.  
- Add multiple **available timeslots**.

### ✅ **Doctor Details Page** (`DoctorDetails.jsx`)  
- Shows doctor info and schedule.  
- Allows patients to select timeslot and book (if backend supports it).

---

## ✅ Future Enhancements

- Patient Dashboard (view booked appointments)  
- Doctor Dashboard (manage schedules)  
- Authentication & JWT Token integration  
- Profile picture upload for doctors  
