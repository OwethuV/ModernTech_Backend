<template>
  <Navbar />
  <div class="payroll">
    <h1><i>Compensation Information</i></h1>

    <!-- Responsive table container -->
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Hours</th>
            <th class="hide-mobile">Leave Deductions</th>
            <th>Salary</th>
            <th>Payslip</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in payrollData" :key="employee.employeeId">
            <td data-label="ID">{{ employee.employeeId }}</td>
            <td data-label="Name">{{ employee.name }}</td>
            <td data-label="Hours">{{ employee.hoursWorked }}</td>
            <td data-label="Leave" class="hide-mobile">{{ employee.leaveDeductions }}</td>
            <td data-label="Salary">R{{ employee.finalSalary }}</td>
            <td data-label="Payslip">
              <button @click="viewPayslip(employee)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedEmployee" ref="payslipSection">
      <Payslip :employee="selectedEmployee" />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Payslip from "@/components/Payslip.vue";
import { ref, onMounted } from "vue";

const payrollData = ref([]);
const selectedEmployee = ref(null);

const viewPayslip = (employee) => {
  selectedEmployee.value = employee;
  nextTick(() => {
    const section = this.$refs.payslipSection;
    if (section?.scrollIntoView) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
};

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8080/payroll_data.json");
    payrollData.value = (await response.json()).payrollData;
  } catch (error) {
    console.error("Error loading payroll data:", error);
  }
});
</script>

<style>
:root {
  --primary-color: #345678;
  --secondary-color: #f0f3f6;
  --text-color: #222;
  --border-color: #dee2e6;
  --white: #ffffff;
  --button-color: #4a90e2;
  --button-hover: #357ab8;
}

body {
  background-color: #f4f6f8;
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

.payroll {
  padding: clamp(0.5rem, 2vw, 2rem);
  max-width: 100vw;
  overflow-x: hidden;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-size: clamp(1.25rem, 4vw, 1.75rem);
}

/* Table container */
.table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: var(--white);
}

/* Main table styling */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--white);
}

/* Table headers */
.custom-table th {
  background-color: var(--primary-color);
  color: var(--white);
  font-weight: 600;
  padding: 0.75rem;
  text-align: center;
  position: sticky;
  top: 0;
}

/* Table cells */
.custom-table td {
  text-align: center;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.75rem;
}

/* Zebra striping */
.custom-table tr:nth-child(even) td {
  background-color: var(--secondary-color);
}

/* Button styles */
.custom-table button {
  padding: 0.5rem 1rem;
  background-color: var(--button-color);
  color: var(--white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.custom-table button:hover {
  background-color: var(--button-hover);
  transform: translateY(-1px);
}

/* Mobile-first responsive design */
@media (max-width: 767px) {
  .custom-table {
    width: 100%;
  }

  .custom-table thead {
    display: none;
  }

  .custom-table tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .custom-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    padding-left: 50%;
    position: relative;
    border-bottom: 1px solid var(--border-color);
    border-right: 0;
  }

  .custom-table td:last-child {
    border-bottom: 0;
  }

  .custom-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-right: 1rem;
    text-align: left;
    font-weight: bold;
    color: var(--primary-color);
  }

  .hide-mobile {
    display: none;
  }
}

/* Medium screens (tablets) */
@media (min-width: 768px) and (max-width: 1023px) {
  .custom-table th,
  .custom-table td {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .custom-table button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

/* Large screens (desktops) */
@media (min-width: 1024px) {
  .table-container {
    max-width: 1200px;
  }

  .custom-table {
    font-size: 1rem;
  }
}

/* Very small screens (mobile portrait) */
@media (max-width: 480px) {
  .custom-table td {
    padding-left: 40%;
  }

  .custom-table td::before {
    width: 35%;
  }

  .custom-table button {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
}

/* Print styles */
@media print {
  .Navbar, .Footer {
    display: none;
  }

  .payroll {
    padding: 0;
  }

  .custom-table {
    width: 100%;
    font-size: 12pt;
  }

  .custom-table th {
    background-color: var(--primary-color) !important;
    color: var(--white) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .custom-table button {
    display: none;
  }
}
</style>