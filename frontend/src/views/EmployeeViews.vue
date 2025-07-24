<template>
  <Navbar />
  <div class="employee-view">
    <!-- Siphokazi -->
    <!-- <h1 class="text-center"><i>Attendance Records</i></h1>
    <table class="attendance-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th v-for="date in uniqueDates" :key="date">{{ date }}</th>
          <th>Leave Request</th>
        </tr>
      </thead>
      <tbody v-if="attendanceAndLeave.length">
        <tr v-for="record in attendanceAndLeave" :key="record.employeeId">
          <td>{{ record.employeeId }}</td>
          <td>{{ record.name }}</td>
          <td v-for="date in uniqueDates" :key="record.employeeId + date">
            <span v-if="getStatusByDate(record.attendance, date)">
              {{ getStatusByDate(record.attendance, date) }}
            </span>
            <span v-else>-</span>
          </td>
          <td>
            <span v-if="record.leaveRequests && record.leaveRequests.length">
              <span
                :style="{
                  color: getLeaveColor(record.leaveRequests[0].status),
                }"
              >
                {{ record.leaveRequests[0].status }} -
                {{ record.leaveRequests[0].reason }}
              </span>
            </span>
            <button v-else @click="submitLeaveRequest(record)">
              Request Leave
            </button>
          </td>
        </tr>
      </tbody>
    </table> -->

    <!-- Aisha -->

    <div class="content-grid mt-5">
      <EmployeeComp
        :employees="employees"
        @request-submitted="handleNewRequest"
      />

      <AttendanceComp :employees="employees" class="attendance-display" />
    </div>
  </div>
  <footer />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import EmployeeComp from "@/components/EmployeeComp.vue";
import AttendanceComp from "@/components/AttendanceComp.vue";


// Employees data for Aisha's section
const employees = ref([
  {
    employeeId: 1,
    name: "Sibongile Nkosi",
    attendance: [
      { date: "2025-07-25", status: "Present" },
      { date: "2025-07-26", status: "Absent" },
    ],
    leaveRequests: [
      { date: "2025-07-22", reason: "Sick Leave", status: "Approved" },
    ],
  },
  {
    employeeId: 2,
    name: "Lungile Moyo",
    attendance: [
      { date: "2025-07-25", status: "Present" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      {
        date: "2025-07-15",
        reason: "Family Responsibility",
        status: "Denied",
      },
    ],
  },
  {
    employeeId: 3,
    name: "Thabo Molefe",
    attendance: [
      { date: "2025-07-25", status: "Present" },
      { date: "2025-07-26", status: "Absent" },
    ],
    leaveRequests: [
      {
        date: "2025-07-10",
        reason: "Medical Appointment",
        status: "Approved",
      },
    ],
  },
  {
    employeeId: 4,
    name: "Keshav Naidoo",
    attendance: [
      { date: "2025-07-25", status: "Present" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      { date: "2025-07-20", reason: "Bereavement", status: "Approved" },
    ],
  },
  {
    employeeId: 5,
    name: "Zanele Khumalo",
    attendance: [
      { date: "2025-07-25", status: "Absent" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      { date: "2024-12-01", reason: "Childcare", status: "Pending" },
    ],
  },
  {
    employeeId: 6,
    name: "Sipho Zulu",
    attendance: [
      { date: "2025-07-25", status: "Absent" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      { date: "2025-07-18", reason: "Sick Leave", status: "Approved" },
    ],
  },
  {
    employeeId: 7,
    name: "Naledi Moeketsi",
    attendance: [
      { date: "2025-07-25", status: "Absent" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      { date: "2025-07-22", reason: "Vacation", status: "Pending" },
    ],
  },
  {
    employeeId: 8,
    name: "Farai Gumbo",
    attendance: [
      { date: "2025-07-25", status: "Absent" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      {
        date: "2025-07-18",
        reason: "Medical Appointment",
        status: "Approved",
      },
    ],
  },
  {
    employeeId: 9,
    name: "Karabo Dlamini",
    attendance: [
      { date: "2025-07-25", status: "Absent" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      { date: "2025-07-19", reason: "Childcare", status: "Denied" },
    ],
  },
  {
    employeeId: 10,
    name: "Fatima Patel",
    attendance: [
      { date: "2025-07-25", status: "Absent" },
      { date: "2025-07-26", status: "Present" },
    ],
    leaveRequests: [
      { date: "2024-12-03", reason: "Childcare", status: "Pending" },
    ],
  },
]);

const handleNewRequest = (request) => {
  const employee = employees.value.find(
    (emp) => emp.employeeId == request.employeeId
  );
  if (employee) {
    employee.leaveRequests.push({
      date: request.date,
      reason: request.reason,
      status: "Pending",
    });
  }
};

// Siphokazi's code
const attendanceAndLeave = ref([]);

const uniqueDates = computed(() => {
  if (!Array.isArray(attendanceAndLeave.value)) return [];
  const dateSet = new Set();
  attendanceAndLeave.value.forEach((record) => {
    if (Array.isArray(record.attendance)) {
      record.attendance.forEach((entry) => {
        if (entry.date) dateSet.add(entry.date);
      });
    }
  });
  return Array.from(dateSet).sort();
});

function getStatusByDate(attendanceArray, date) {
  const entry = attendanceArray.find((a) => a.date === date);
  return entry ? entry.status : null;
}

function getAttendanceRecord(status) {
  if (status === "Present") return "Present";
  if (status === "Absent") return "Absent";
  return "status";
}

function getLeaveColor(status) {
  switch (status) {
    case "Approved":
      return "green";
    case "Denied":
      return "red";
    case "Pending":
      return "orange";
    default:
      return "black";
  }
}

function submitLeaveRequest(record) {
  alert(`Leave request Submitted for ${record.name}`);
}

async function fetchAttendanceData() {
  try {
    const response = await fetch("/attendance.json");
    const data = await response.json();

    if (!Array.isArray(data.attendanceAndLeave)) {
      console.error("😒expected array but got", data);
    }

    attendanceAndLeave.value = data.attendanceAndLeave;
    console.log("✅", attendanceAndLeave.value);
  } catch {
    console.error("Error fetching attendance data");
  }
}

onMounted(() => {
  fetchAttendanceData();
});
</script>

<style scoped>
.employee-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.employee-form h1 {
  color: #2199ea !important;
  text-align: center;
  margin-bottom: 30px;
}

h1 h2 h3 h4 {
  color: #2199ea !important;
  text-align: center;
  margin-bottom: 30px;
}
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.content-grid > *:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.attendance-display {
  background-color: #eeeeee;
  padding: 20px;
  border-radius: 8px;
}

/* Siphokazi
.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: "Segoe UI", sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.attendance-table th {
  background-color: #2d3e50;
  color: #ffffff;
  text-align: center;
  justify-content: center;
  padding: 12px;
}

.attendance-table td {
  padding: 12px;
  text-align: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
}

.attendance-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.attendance-display {
  min-width: 400px;
  width: 100%;
  box-sizing: border-box;
}

.attendance-table td {
  padding: 12px;
  text-align: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
}



.attendance-table tr:hover {
  background-color: #f1f7ff;
}

.attendance-table td button {
  padding: 6px 10px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.attendance-table td button:hover {
  background-color: #005ea2;
}

.attendance-table td span {
  font-weight: 500;
} */
</style>
