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
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ getAttendance(employee) }}</td>
            <td>{{ getProductivity(employee).toFixed(1) }}</td>
            <td>{{ getTotal(employee).toFixed(1) }}</td>
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

.Review {
  padding: 1rem;
}

/* Make table scrollable on small screens */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.review-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius: 8px;
  min-width: 600px; /* Table will scroll on narrow screens */
}

.review-table th,
.review-table td {
  padding: 1rem;
  text-align: center;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  color: #222;
  white-space: normal; /* Let text wrap */
  word-break: break-word;
}

.review-table th {
  background-color: #345678;
  color: #ffffff;
  font-weight: 600;
}

/* Zebra striping */
.review-table tr:nth-child(even) td {
  background-color: #f0f3f6;
}

/* Responsive font sizes */
@media (max-width: 600px) {
  .review-table {
    font-size: 12px;
  }
  .Review {
    padding: 0.5rem;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .review-table {
    font-size: 14px;
  }
  .Review {
    padding: 1rem;
  }
}

@media (min-width: 1025px) {
  .review-table {
    font-size: 16px;
  }
  .Review {
    padding: 2rem;
  }
}


/* Buttons styling */
button {
  padding: 0.7rem 1.5rem;
  background-color: #345678;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #2b4564;
}

/* Ratings section styles */
.ratings h2 {
  color: #345678;
}

.ratings li {
  color: #444;
  font-size: 1.1rem;
}


</style>