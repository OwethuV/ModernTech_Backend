<template>
  <div class="home">
    <div class="hero p-5 text-center">
      <h1><strong class="text-white">Welcome to ModernTech Solutions</strong></h1>
      <p class="text-white">Take Control of Your Workforce. Fast, Simple, and All in One Place.</p>
      <router-link to="/login" class="btn btn-primary mt-3 btn-lg">Log In</router-link>

      <!-- Scroll Down Button -->
      <button class="scroll-down-btn" @click="scrollToDashboard">
        <span class="arrow">⇩⇩⇩</span>
      </button>
    </div>

    <!-- Employee Data Dashboard Section -->
    <div id="dashboard-section" class="dashboard-container py-5">
      <h2 class="text-center mb-4">Employee Data Overview</h2>
      <div class="row justify-content-center">
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Total Employees</h5>
              <p class="card-text display-4">{{ dashboardData.totalEmployees }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Avg. Monthly Salary</h5>
              <p class="card-text display-4">R{{ dashboardData.averageSalary.toLocaleString() }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Avg. Hours Worked</h5>
              <p class="card-text display-4">{{ dashboardData.averageHoursWorked.toFixed(1) }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Departments</h5>
              <p class="card-text display-4">{{ dashboardData.totalDepartments }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Pending Leave Requests</h5>
              <p class="card-text display-4">{{ dashboardData.pendingLeaveRequests }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-4">
          <div class="card text-center h-100">
            <div class="card-body">
              <h5 class="card-title">Avg. Leave Deductions</h5>
              <p class="card-text display-4">{{ dashboardData.averageLeaveDeductions.toFixed(1) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
</script>

<script>
import employeeInfo from '@/../public/employee_info.json';
import attendanceData from '@/../public/attendance.json';
import payrollData from '@/../public/payroll_data.json';

export default {
  name: 'HomeView',
  data() {
    return {
      dashboardData: {
        totalEmployees: 0,
        averageSalary: 0,
        averageHoursWorked: 0,
        totalDepartments: 0,
        pendingLeaveRequests: 0,
        averageLeaveDeductions: 0
      }
    };
  },
  mounted() {
    this.calculateDashboardData();
  },
  methods: {
    calculateDashboardData() {
      // Total Employees
      this.dashboardData.totalEmployees = employeeInfo.employeeInformation.length;

      // Average Salary
      const totalSalary = payrollData.payrollData.reduce((sum, emp) => sum + emp.finalSalary, 0);
      this.dashboardData.averageSalary = totalSalary / payrollData.payrollData.length;

      // Average Hours Worked
      const totalHoursWorked = payrollData.payrollData.reduce((sum, emp) => sum + emp.hoursWorked, 0);
      this.dashboardData.averageHoursWorked = totalHoursWorked / payrollData.payrollData.length;

      // Total Departments
      const departments = new Set(employeeInfo.employeeInformation.map(emp => emp.department));
      this.dashboardData.totalDepartments = departments.size;

      // Pending Leave Requests
      this.dashboardData.pendingLeaveRequests = attendanceData.attendanceAndLeave.reduce((count, emp) => {
        return count + emp.leaveRequests.filter(req => req.status === 'Pending').length;
      }, 0);

      // Average Leave Deductions
      const totalLeaveDeductions = payrollData.payrollData.reduce((sum, emp) => sum + emp.leaveDeductions, 0);
      this.dashboardData.averageLeaveDeductions = totalLeaveDeductions / payrollData.payrollData.length;
    },
    scrollToDashboard() {
      const dashboardSection = document.getElementById('dashboard-section');
      if (dashboardSection) {
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style>
/* Hero styling */
.hero {
  background-image: url("https://cdn.pixabay.com/photo/2024/06/22/18/09/ai-generated-8846757_1280.jpg");
  background-size: cover;
  background-position: center;
  /* Center the background image */
  height: 100vh;
  display: flex;
  /* Use flexbox for vertical centering of content */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* Needed for absolute positioning of the button */
}

.hero h1 {
  margin-top: 0;
  /* Reset margin-top as flexbox handles centering */
  font-size: 3.5rem;
  /* Adjust font size for better impact */
  text-shadow: 4px 4px 16px #000000;
}

.hero p {
  font-size: 1.5rem;
  /* Adjust font size */
  text-shadow: 2px 2px 8px #000000;
  margin-bottom: 2rem;
  /* Space below paragraph */
}

/* Scroll Down Button Styling */
.scroll-down-btn {
  position: absolute;
  bottom: 30px;
  /* Position from the bottom */
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  /* Transparent white border */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  justify-content: center;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  /* Initial glow */
  animation: pulse 2s infinite;
  /* Pulsing animation */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: auto;
  height: auto;
}

.scroll-down-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  /* Slight background on hover */
  color: white;
  border-color: white;
  transform: translateX(-50%) scale(1.1);
  /* Gets slightly bigger */
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
  /* Stronger glow on hover */
  animation: none;
  /* Stop pulsing on hover */
}

.arrow {
  font-size: 2.5rem;
  animation: bounce 2s infinite;
  color: #ffffff;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Pulsing animation for the button */
@keyframes pulse {
  0% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    transform: translateX(-50%) scale(1);
  }

  50% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
    transform: translateX(-50%) scale(1.05);
  }

  100% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    transform: translateX(-50%) scale(1);
  }
}

/* Dashboard Section Styling */
.dashboard-container {
  background-color: #f8f9fa;
  /* Light background for the dashboard */
  padding: 50px 0;
  overflow-x: hidden;
}

.dashboard-container h2 {
  color: #343a40;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.dashboard-container .card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  background-color: #ffffff;
}

.dashboard-container .card:hover {
  transform: translateY(-5px);
}

.dashboard-container .card-title {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 15px;
}

.dashboard-container .card-text.display-4 {
  font-size: 3rem;
  font-weight: bold;
  color: #007bff;
}
</style>