# ModernTech HR System

A full-stack HR management system built with Vue.js (front-end), Node.js (back-end), and MySQL (database). This app simulates employee data handling, payroll processing, attendance tracking, and secure login with hashed passwords.

---

## Features

- Secure user login with hashed passwords (bcrypt)
- Role-based access structure (HR, manager, employee)
- Centralized employee profile management
- Submit and manage time-off requests
- Automated payroll calculations
- Track employee attendance
- Responsive front-end interface (mobile/tablet friendly)
- RESTful API integration using Express

---

## Technologies Used

### Front-End
- Vue.js (Vue CLI)
- Vue Router
- Vuex (State Management)
- Axios
- Bootstrap
- Animate.css
- Font Awesome

### Back-End
- Node.js
- Express.js
- MySQL (via mysql2/promise)
- bcrypt (for password hashing)
- dotenv (for environment variables)
- CORS (for cross-origin API access)

---

## Database Structure

Key tables include:
- `employee_info`
- `departments`
- `login`
- `attendance`
- `payroll`
- `performance_review`
- `leave_requests`

Each table is normalized up to 3NF and uses foreign keys to maintain relational integrity.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/OwethuV/ModernTech_Solutions.git
cd ModernTech_Solutions
```
### 2. Install back-end dependencies

```bash
cd frontend
npm install
```

### 3. Install back-end dependencies

```bash
cd ../backend
npm install
```

### 4. Configure .env for backend
Create a .env file inside the /backend folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=moderntech_db
```

### 5. Start servers
Back-End (Node)
```bash
cd backend
node --watch index.js
```
Front-End (Vue)
```bash
cd frontend
npm run serve
```

## API Endpoints
| Method | Route                | Purpose                    |
| ------ | -------------------- | -------------------------- |
| POST   | /api/login           | User login                 |
| GET    | /api/employees       | Get all employees          |
| POST   | /api/attendance      | Submit attendance          |
| GET    | /api/attendance/\:id | Get attendance by employee |
| POST   | /api/payroll         | Calculate/store payroll    |

All endpoints return JSON. Auth may be required for protected routes

## Usage
1. Log in with a registered user.

2. View employees and performance records.

3. Submit attendance or leave requests.

4. View or generate payroll summaries.

5. Admins can manage users and departments.

## Team
- Aisha Kabanga
- Siphokazi Limba
- Hanaa Richards
- Owethu Valantiya

## License
This project is for educational purposes only.
