<template>
  <div class="dashboard">
    <h1>Employee Dashboard</h1>
    <div class="charts">
      <div class="chart-container">
        <h2>Salary Distribution</h2>
        <BarChart :data="salaryData" :options="salaryOptions" />
      </div>
      <div class="chart-container">
        <h2>Department Overview</h2>
        <PieChart :data="departmentData" :options="departmentOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar, Pie } from "vue-chartjs";
import { Chart, reg0 } from "chart.js";

export default {
  components: {
    BarChart: Bar,
    PieChart: Pie,
  },
  data() {
    return {
      employees: [
        {
          position: "Software Engineer",
          department: "Development",
          salary: 70000,
          employmentHistory: "Joined in 2015, promoted to Senior in 2018",
        },
        {
          position: "HR Manager",
          department: "HR",
          salary: 80000,
          employmentHistory: "Joined in 2013, promoted to Manager in 2017",
        },
        {
          position: "Quality Analyst",
          department: "QA",
          salary: 55000,
          employmentHistory: "Joined in 2018",
        },
        {
          position: "Sales Representative",
          department: "Sales",
          salary: 60000,
          employmentHistory: "Joined in 2020",
        },
        {
          position: "Marketing Specialist",
          department: "Marketing",
          salary: 58000,
          employmentHistory: "Joined in 2019",
        },
        {
          position: "UI/UX Designer",
          department: "Design",
          salary: 65000,
          employmentHistory: "Joined in 2016",
        },
        {
          position: "DevOps Engineer",
          department: "IT",
          salary: 72000,
          employmentHistory: "Joined in 2017",
        },
        {
          position: "Content Strategist",
          department: "Marketing",
          salary: 56000,
          employmentHistory: "Joined in 2021",
        },
        {
          position: "Accountant",
          department: "Finance",
          salary: 62000,
          employmentHistory: "Joined in 2018",
        },
        {
          position: "Customer Support Lead",
          department: "Support",
          salary: 58000,
          employmentHistory: "Joined in 2016",
        },
      ],
      salaryOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Salary Distribution by Position",
          },
        },
      },
      departmentOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Department Overview",
          },
        },
      },
    };
  },
  computed: {
    salaryData() {
      if (!this.employees || this.employees.length === 0) {
        return { labels: [], datasets: [] }; // Return empty data structure
      }
      return {
        labels: this.employees.map((emp) => emp.position),
        datasets: [
          {
            label: "Salary",
            data: this.employees.map((emp) => emp.salary),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
    },
    departmentData() {
      if (!this.employees || this.employees.length === 0) {
        return { labels: [], datasets: [] }; // Return empty data structure
      }
      const departmentCounts = this.employees.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      }, {});
      return {
        labels: Object.keys(departmentCounts),
        datasets: [
          {
            label: "Departments",
            data: Object.values(departmentCounts),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
          },
        ],
      };
    },
  },
};
</script>

<style>
h1 h2 h3 h4 {
  color: #2199ea !important;
  text-align: center;
  margin-bottom: 30px;
}

.dashboard {
  padding: 20px;
  text-align: center;
}
.charts {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.chart-container {
  width: 45%;
  margin: 20px 0;
  height: 400px; /* Set a fixed height for the charts */
}
</style>
