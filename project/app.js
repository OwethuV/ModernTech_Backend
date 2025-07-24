const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./config/db'); //  MySQL connection pool

//  Middleware: Parses JSON body early
app.use(express.json());

//   Payroll Routes const
const payrollRoutes = require('./routes/payrollRoutes');
app.use('/payroll', payrollRoutes);

// Attendance Routes const
 const attendanceRoutes = require('./routes/attendanceRoutes');
 app.use('/attendance', attendanceRoutes);

// Leave request Route const
const leaveRoutes = require('./routes/leaveRoutes');
app.use('/leave', leaveRoutes);

// departments
const departmentRoutes = require('./routes/departmentRoutes');
app.use('/api/departments', departmentRoutes);

// Login 
const loginRoutes = require('./routes/loginRoutes');
app.use('/api/login', loginRoutes);

// Performance
const performanceRoutes = require('./routes/performanceRoutes');
app.use('/performance', performanceRoutes);

//  Test Route - Landing page
app.get('/', (req, res) => {
  res.send('ModernTech HR is live!');
});

//  Test Route - DB Connection Status
app.get('/db-status', async (req, res) => {
  try {
    const [results] = await db.execute('SELECT 1 + 1 AS result');
    res.send(`Database connected! Result: ${results[0].result}`);
  } catch (err) {
    console.error(' DB connection test failed:', err.message);
    res.status(500).send('Database not connected ');
  }
});

//  Catch-All 404 Route
app.use((req, res) => {
  res.status(404).send(' Route not found');
});

//  Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log( `Server live at http://localhost:${PORT}`);
});