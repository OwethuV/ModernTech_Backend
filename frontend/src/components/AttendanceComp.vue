<template>
  <div class="attendance-system">
    <h1>Employee Attendance System</h1>

<!-- Employee Search Dropdown - 
 this lets you select an employee by name from a dropdown-->
    <div class="search-box">
      
      <select v-model="selectedEmployeeId" @change="selectEmployeeById" class="search-input">
        <option value="">Select employee...</option>
        <option v-for="emp in employees" :key="emp.employeeId" :value="emp.employeeId">
          {{ emp.name }}
        </option>
      </select>
    </div>

    <!-- Toggle Button for Add Employee Form - button toggles a form to add a new employee by name-->
    <button @click="showAddEmployeeForm = !showAddEmployeeForm" class="btn btn-primary" style="margin-bottom: 10px;">
      {{ showAddEmployeeForm ? 'Cancel' : 'Add New Employee' }}
    </button>

    <!-- Add New Employee Form -->
    <div v-if="showAddEmployeeForm" class="add-employee-form" style="margin-bottom: 20px;">
      <input
        v-model="newEmployeeName"
        placeholder="Enter new employee name"
        class="form-control"
      />
      <button @click="addEmployee" class="btn btn-success" style="margin-top: 5px;">
        Add New Employee
      </button>
    </div>


    <!-- Selected Employee Form - if an employee is selected, shows their name, attendance records(with add/remove/edit), and leave requests (with add/remove/edit)-->
    <div v-if="selectedEmployee" class="employee-form">
      <h2>{{ selectedEmployee.name }}</h2>

      <!-- Attendance Records -->
      <div class="form-section">
        <h3>Attendance Records</h3>
        <table class="records-table" v-if="selectedEmployee.attendance.length > 0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in selectedEmployee.attendance" :key="index">
              <td>
                <input type="date" v-model="record.date" class="form-control" />
              </td>
              <td>
                <select v-model="record.status" class="form-control">
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </td>
              <td>
                <button @click="removeAttendance(index)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No attendance records.</p>
        <button @click="addAttendanceRecord" class="btn btn-primary">Add Attendance Record</button>
      </div>

      <!-- Leave Requests -->
      <div class="form-section">
        <h3>Leave Requests</h3>
        <table class="records-table" v-if="selectedEmployee.leaveRequests.length > 0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(request, index) in selectedEmployee.leaveRequests" :key="index">
              <td>
                <input type="date" v-model="request.date" class="form-control" />
              </td>
              <td>
                <select v-model="request.reason" class="form-control">
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Personal">Personal</option>
                  <option value="Family Responsibility">Family Responsibility</option>
                  <option value="Medical Appointment">Medical Appointment</option>
                  <option value="Bereavement">Bereavement</option>
                  <option value="Childcare">Childcare</option>
                </select>
              </td>
              <td>
                <select v-model="request.status" class="form-control">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                </select>
              </td>
              <td>
                <button @click="removeLeaveRequest(index)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No leave requests.</p>
        <button @click="addLeaveRequest" class="btn btn-primary">Add Leave Request</button>
      </div>

      <button @click="saveChanges" class="btn btn-success">Save Changes</button>
      <button @click="cancelEdit" class="btn btn-secondary" style="margin-left:10px;">Cancel</button>
      <button @click="deleteSelectedEmployee" class="btn btn-danger" style="margin-left:10px;">Delete</button>
    </div>

     <div v-else class="employee-list">
  <div v-if="search">
    <div
      v-for="employee in filteredEmployees"
      :key="employee.employeeId"
      class="employee-card"
      @click="selectEmployee(employee)"
    >
      {{ employee.name }}
    </div>
    
  </div>
  <div v-else class="no-results">
    
  </div>
</div>
    
  </div>
  
</template>

<script>
export default {
  name: 'AttendanceComp',
  props: {
    employees: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      search: '',
      selectedEmployee: null,
      selectedEmployeeId: '',
      newEmployeeName: '',
      showAddEmployeeForm: false
    }
  },
  computed: {
    filteredEmployees() {
      if (!this.search) return this.employees
      return this.employees.filter(emp =>
        emp.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
  selectEmployee(employee) {
    const clone = JSON.parse(JSON.stringify(employee));
    if (!Array.isArray(clone.attendance)) clone.attendance = [];
    if (!Array.isArray(clone.leaveRequests)) clone.leaveRequests = [];
    this.selectedEmployee = clone;
  },
  
  selectEmployeeById() {
    const emp = this.employees.find(e => e.employeeId == this.selectedEmployeeId)
    if (emp) this.selectEmployee(emp)
  },
  addEmployee() {
    if (!this.newEmployeeName.trim()) return
    this.$emit('add-employee', this.newEmployeeName.trim())
    this.newEmployeeName = ''
    this.showAddEmployeeForm = false
  },

  deleteSelectedEmployee() {
    if (this.selectedEmployee && confirm('Are you sure you want to delete this employee?')) {
      this.$emit('delete-employee', this.selectedEmployee.employeeId);
      this.selectedEmployee = null;
      this.selectedEmployeeId = '';
    }
  },
  addAttendanceRecord() {
    this.selectedEmployee.attendance.push({
      date: new Date().toISOString().split('T')[0],
      status: 'Present'
    })
  },
  removeAttendance(index) {
    this.selectedEmployee.attendance.splice(index, 1)
  },
  addLeaveRequest() {
    this.selectedEmployee.leaveRequests.push({
      date: new Date().toISOString().split('T')[0],
      reason: 'Personal',
      status: 'Pending'
    })
  },
  removeLeaveRequest(index) {
    this.selectedEmployee.leaveRequests.splice(index, 1)
  },
  saveChanges() {
    this.$emit('update-employee', JSON.parse(JSON.stringify(this.selectedEmployee)))
    alert('Changes saved successfully!')
    this.selectedEmployee = null
    this.selectedEmployeeId = ''
  },
  cancelEdit() {
    this.selectedEmployee = null
    this.selectedEmployeeId = ''
  }
}
}
  
</script>

<style scoped>
.attendance-system {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2vw;
  
}
.search-box {
  margin-bottom: 20px;
}
.search-input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #2199ea;
  border-radius: 4px;
  font-size: 1rem;
}
.employee-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}
.form-section {
  margin-bottom: 30px;
}
.records-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}
.records-table th, .records-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.records-table th {
  background-color: #f2f2f2;
}
.form-control {
  width: 100%;
  padding: 5px;
}
.btn {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-success {
  background-color: #28a745;
  color: white;
  padding: 8px 15px;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.employee-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.employee-card {
  padding: 15px;
  background: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}
.employee-card:hover {
  background: #e0e0e0;
}
@media (max-width: 900px) {
  .attendance-system {
    padding: 3vw 1vw;
  }
  .employee-list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
}
@media (max-width: 600px) {
  .attendance-system {
    padding: 2vw 0.5vw;
  }
  .employee-list {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .employee-card {
    padding: 10px;
  }
}
</style>