<template>
  <Navbar />
  <div class='Review' id="app">
    <h1>Performance Reviews</h1>

    <!-- Wrap the table in a responsive scrollable container -->
    <div class="table-wrapper">
      <table class="review-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Position</th>
            <th>Department</th>
            <th>Attendance (/10)</th>
            <th>Productivity (/10)</th>
            <th>Total (/20)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.employeeId">
            <td data-label="Employee">{{ employee.name }}</td>
            <td data-label="Position">{{ employee.position }}</td>
            <td data-label="Department">{{ employee.department }}</td>
            <td data-label="Attendance">{{ getAttendance(employee) }}</td>
            <td data-label="Productivity">{{ getProductivity(employee).toFixed(1) }}</td>
            <td data-label="Total">{{ getTotal(employee).toFixed(1) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import Footer from '@/components/Footer.vue'

const employees = ref([
 
  {
            employeeId: 1,
            name: "Sibongile Nkosi",
            position: "Software Engineer",
            department: "Development",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 160,
            leaveDeductions: 8  
        },
        {
            employeeId: 2,
            name: "Lungile Moyo",
            position: "HR Manager",
            department: "HR",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 150,
            leaveDeductions: 10
        },
        {
             employeeId: 3,
             name: "Thabo Molefe",
             position: "Quality Analyst",
             department: "QA",
             workingDays:30, // we calculated 5 days a week and 4 weeks a month 30 days
             daysPresent: 26, // 1 absent times 4 meaning 1 absentizim per week
             hoursWorked: 170,
             leaveDeductions: 4,
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "position": "Sales Representative",
            "department": "Sales",
             workingDays:30,
             daysPresent: 26,
            "hoursWorked": 165,
            "leaveDeductions": 6,
        },
        {
            employeeId: 5,
            name: "Zanele Khumalo",
            position: "Marketing Specialist",
            department: "Marketing",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 158,
            leaveDeductions: 5,
        },
        {
            employeeId: 6,
            name: "Sipho Zulu",
            position: "UI/UX Designer",
            department: "Design",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 168,
            leaveDeductions: 2,
        },
        {
            employeeId: 7,
            name: "Naledi Moeketsi",
            position: "DevOps Engineer",
            department: "IT",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 175,
            leaveDeductions: 3,
        },
        {
            employeeId: 8,
            name: "Farai Gumbo",
            position: "Content Strategist",
            department: "Marketing",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 160,
            leaveDeductions: 0,
        },
        {
            employeeId: 9,
            name: "Karabo Dlamini",
            position: "Accountant",
            department: "Finance",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 155,
            leaveDeductions: 5,
        },
        {
            employeeId: 10,
            name: "Fatima Patel",
            position: "Customer Support Lead",
            department: "Support",
            workingDays:30,
            daysPresent: 26,
            hoursWorked: 162,
            leaveDeductions: 4,

        }
  
])

const getAttendance = (emp) => {
  if(!emp.workingDays || emp.daysPresent === undefined) return 0
  return Math.round((emp.daysPresent/ emp.workingDays) * 10) 
}
const getProductivity = (emp) => Math.min(10, emp.hoursWorked/17)
const getTotal = (emp) => getAttendance(emp) + getProductivity(emp)
</script>

<style>
:root {
  --primary-color: #345678;
  --secondary-color: #f0f3f6;
  --text-color: #222;
  --border-color: #dee2e6;
  --white: #ffffff;
}

.Review {
  padding: 1rem;
  max-width: 100vw;
  overflow-x: hidden;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-size: clamp(1.5rem, 4vw, 2rem);
}

/* Table container */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

/* Table styles */
.review-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--white);
}

.review-table th,
.review-table td {
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.review-table th {
  background-color: var(--primary-color);
  color: var(--white);
  font-weight: 600;
  position: sticky;
  top: 0;
}

/* Zebra striping */
.review-table tr:nth-child(even) td {
  background-color: var(--secondary-color);
}

/* Responsive table - stack on small screens */
@media (max-width: 768px) {
  .review-table {
    border: 0;
  }

  .review-table thead {
    display: none;
  }

  .review-table tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .review-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    padding-left: 50%;
    position: relative;
    border-bottom: 1px solid var(--border-color);
    border-right: 0;
  }

  .review-table td:last-child {
    border-bottom: 0;
  }

  .review-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-right: 1rem;
    text-align: left;
    font-weight: bold;
    color: var(--primary-color);
  }
}

/* Medium screens */
@media (min-width: 769px) and (max-width: 1024px) {
  .review-table {
    font-size: 14px;
  }
  
  .review-table th,
  .review-table td {
    padding: 0.8rem;
  }
}

/* Large screens */
@media (min-width: 1025px) {
  .table-wrapper {
    max-width: 1200px;
  }
  
  .review-table {
    font-size: 16px;
  }
}

/* Print styles */
@media print {
  .review-table {
    width: 100%;
    font-size: 12pt;
  }
  
  .review-table th {
    background-color: var(--primary-color) !important;
    color: var(--white) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .Navbar, .Footer {
    display: none;
  }
}
</style>