<<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1><strong>Welcome to ModernTech Solutions</strong></h1>
        <p>Take Control of Your Workforce. Fast, Simple, and All in One Place.</p>
        <router-link to="/login" class="login-btn">Log In</router-link>
      </div>

      <!-- Scroll Down Button -->
      <button class="scroll-down-btn" @click="scrollToDashboard">
        <span class="arrow">↓</span>
      </button>
    </div>

    <!-- Employee Data Dashboard Section -->
    <div id="dashboard-section" class="dashboard-container">
      <h2>Employee Data Overview</h2>
      <div class="dashboard-grid">
        <div class="dashboard-card" v-for="(card, index) in dashboardCards" :key="index">
          <h3>{{ card.title }}</h3>
          <p>{{ card.value }}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';
import employeeInfo from '@/../public/employee_info.json';
import attendanceData from '@/../public/attendance.json';
import payrollData from '@/../public/payroll_data.json';

const dashboardData = ref({
  totalEmployees: 0,
  averageSalary: 0,
  averageHoursWorked: 0,
  totalDepartments: 0,
  pendingLeaveRequests: 0,
  averageLeaveDeductions: 0
});

const dashboardCards = computed(() => [
  { title: 'Total Employees', value: dashboardData.value.totalEmployees },
  { title: 'Avg. Monthly Salary', value: `R${dashboardData.value.averageSalary.toLocaleString()}` },
  { title: 'Avg. Hours Worked', value: dashboardData.value.averageHoursWorked.toFixed(1) },
  { title: 'Departments', value: dashboardData.value.totalDepartments },
  { title: 'Pending Leave Requests', value: dashboardData.value.pendingLeaveRequests },
  { title: 'Avg. Leave Deductions', value: dashboardData.value.averageLeaveDeductions.toFixed(1) }
]);

const calculateDashboardData = () => {
  // Total Employees
  dashboardData.value.totalEmployees = employeeInfo.employeeInformation.length;

  // Average Salary
  const totalSalary = payrollData.payrollData.reduce((sum, emp) => sum + emp.finalSalary, 0);
  dashboardData.value.averageSalary = totalSalary / payrollData.payrollData.length;

  // Average Hours Worked
  const totalHoursWorked = payrollData.payrollData.reduce((sum, emp) => sum + emp.hoursWorked, 0);
  dashboardData.value.averageHoursWorked = totalHoursWorked / payrollData.payrollData.length;

  // Total Departments
  const departments = new Set(employeeInfo.employeeInformation.map(emp => emp.department));
  dashboardData.value.totalDepartments = departments.size;

  // Pending Leave Requests
  dashboardData.value.pendingLeaveRequests = attendanceData.attendanceAndLeave.reduce((count, emp) => {
    return count + emp.leaveRequests.filter(req => req.status === 'Pending').length;
  }, 0);

  // Average Leave Deductions
  const totalLeaveDeductions = payrollData.payrollData.reduce((sum, emp) => sum + emp.leaveDeductions, 0);
  dashboardData.value.averageLeaveDeductions = totalLeaveDeductions / payrollData.payrollData.length;
};

const scrollToDashboard = () => {
  const dashboardSection = document.getElementById('dashboard-section');
  if (dashboardSection) {
    dashboardSection.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  calculateDashboardData();
});
</script>

<style>
/* Base Styles */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
  --white: #ffffff;
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url("https://cdn.pixabay.com/photo/2024/06/22/18/09/ai-generated-8846757_1280.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  color: var(--white);
}

.hero-content {
  max-width: 800px;
  padding: 0 1rem;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  line-height: 1.2;
}

.hero p {
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}

.login-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.login-btn:hover {
  background-color: #0069d9;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* Scroll Down Button */
.scroll-down-btn {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: var(--transition);
  animation: pulse 2s infinite;
}

.scroll-down-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border-color: var(--white);
  transform: translateX(-50%) scale(1.1);
  animation: none;
}

.arrow {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
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

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* Dashboard Section */
.dashboard-container {
  padding: 4rem 1rem;
  background-color: var(--light-color);
}

.dashboard-container h2 {
  text-align: center;
  color: var(--dark-color);
  margin-bottom: 3rem;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.dashboard-card {
  background: var(--white);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.dashboard-card h3 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.dashboard-card p {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: bold;
  color: var(--primary-color);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }
  
  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 450px;
  }
  
  .dashboard-card {
    padding: 1.5rem;
  }
  
  .scroll-down-btn {
    width: 40px;
    height: 40px;
  }
  
  .arrow {
    font-size: 1.2rem;
  }
}
</style>