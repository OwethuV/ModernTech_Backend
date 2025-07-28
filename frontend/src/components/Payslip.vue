<template>
  <div v-if="employee" class="payslip-container">
    <h3>
      Payslip for {{ employee.name }} (Employee {{ employee.employeeId }})
    </h3>
    <ul>
      <li><strong>Hours Worked: </strong>{{ employee.hoursWorked }}</li>
      <li><strong>Leave Deductions: </strong>{{ employee.leaveDeductions }}</li>
      <li><strong>Final Salary: </strong>{{ employee.finalSalary }}</li>
      <li><strong>Estimated Annual Income: </strong>{{ annualIncome }}</li>
    </ul>
  </div>
  <h3></h3>
</template>

<script>
export default {
  name: "Payslip",
  props: {
    employee: {
      type: Object,
      require: true,
    },
  },
  computed: {
    annualIncome() {
      return this.employee.finalSalary * 12;
    },
  },
};
</script>
<style>
.payslip-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", sans-serif;
  color: #2c3e50;
}

.payslip-container h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.payslip-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.payslip-container li {
  margin: 0.75rem 0;
  padding: 0.5rem 1rem;
  background-color: #f9f9f9;
  border-left: 4px solid #3498db;
  border-radius: 6px;
}

.payslip-container strong {
  display: inline-block;
  width: 180px;
  color: #34495e;
}

h1 h2 h3 h4 {
  color: #2199ea !important;
  text-align: center;
  margin-bottom: 30px;
}
</style>
