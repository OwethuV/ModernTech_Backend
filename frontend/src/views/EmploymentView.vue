<template>
  <Navbar />
  
  <!-- Main Directory View -->
  <div v-if="!showForm && !showDelete" class="directory-container">
    <div class="directory-header">
      <h2>Employee Directory</h2>
      <p>
        Meet our talented team members who drive innovation and excellence at
        Modern Tech Solutions.
      </p>
    </div>

    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name, position or department"
        class="search-bar"
      />
    </div>

    <div class="employee-grid">
      <manage-comp
        v-for="employee in filteredEmployees"
        :key="employee.employeeId"
        :employee="employee"
      />
    </div>

    <div class="action-buttons">
      <button @click="showForm = true" class="btn btn-primary">
        Add Employee
      </button>
      <button @click="showDelete = true" class="btn btn-danger">
        Delete Employee
      </button>
    </div>
  </div>

  <!-- Delete Dialog -->
  <div v-if="showDelete" class="dialog-overlay">
    <div class="delete-dialog">
      <h3>Delete Employee</h3>
      <label for="deleteEmployeeSelect">Select employee to delete:</label>
      <select
        v-model="employeeToDeleteId"
        id="deleteEmployeeSelect"
        class="form-control"
      >
        <option disabled value="">Select employee...</option>
        <option
          v-for="emp in employees"
          :key="emp.employeeId"
          :value="emp.employeeId"
        >
          {{ emp.name }}
        </option>
      </select>
      <div class="dialog-actions">
        <button
          :disabled="!employeeToDeleteId"
          @click="confirmDelete"
          class="btn btn-danger"
        >
          Confirm Delete
        </button>
        <button @click="cancelDelete" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  </div>

  <!-- Add Employee Form -->
  <div v-if="showForm" class="dialog-overlay">
    <form @submit.prevent="submitForm" class="add-form">
      <h3>Add New Employee</h3>
      <div class="form-group">
        <input v-model="form.name" placeholder="Name" required />
      </div>
      <div class="form-group">
        <input v-model="form.position" placeholder="Position" required />
      </div>
      <div class="form-group">
        <input v-model="form.department" placeholder="Department" required />
      </div>
      <div class="form-group">
        <input v-model="form.salary" placeholder="Salary" type="number" required />
      </div>
      <div class="form-group">
        <input v-model="form.contact" placeholder="Contact" required />
      </div>
      <div class="form-group">
        <input v-model="form.employmentHistory" placeholder="Employment History" />
      </div>
      <div class="form-group">
        <input v-model="form.imageUrl" placeholder="Image URL" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-success">
          Add Employee
        </button>
        <button type="button" @click="showForm = false" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import ManageComp from "@/components/ManageComp.vue";
import { ref, computed } from "vue";

const searchQuery = ref("");
const employees = ref([
  // Your employee data array remains the same
]);

const showForm = ref(false);
const showDelete = ref(false);
const employeeToDeleteId = ref("");
const form = ref({
  name: "",
  position: "",
  department: "",
  salary: "",
  contact: "",
  employmentHistory: "",
  imageUrl: ""
});

const filteredEmployees = computed(() => {
  if (!searchQuery.value) return employees.value;
  const query = searchQuery.value.toLowerCase();
  return employees.value.filter(emp =>
    emp.name.toLowerCase().includes(query) ||
    emp.position.toLowerCase().includes(query) ||
    emp.department.toLowerCase().includes(query)
  );
});

function submitForm() {
  const newId = employees.value.length
    ? Math.max(...employees.value.map(e => e.employeeId)) + 1
    : 1;
  employees.value.push({
    employeeId: newId,
    ...form.value
  });
  form.value = {
    name: "",
    position: "",
    department: "",
    salary: "",
    contact: "",
    employmentHistory: "",
    imageUrl: ""
  };
  showForm.value = false;
}

function confirmDelete() {
  const emp = employees.value.find(e => e.employeeId === employeeToDeleteId.value);
  if (emp && confirm(`Are you sure you want to delete ${emp.name}?`)) {
    employees.value = employees.value.filter(e => e.employeeId !== employeeToDeleteId.value);
    employeeToDeleteId.value = "";
    showDelete.value = false;
  }
}

function cancelDelete() {
  employeeToDeleteId.value = "";
  showDelete.value = false;
}
</script>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #5990cc;
  --danger-color: #e57373;
  --success-color: #567c95;
  --secondary-color: #6c757d;
  --text-color: #333;
  --light-text: #666;
  --border-color: #ccc;
  --background-light: #f5f5f5;
  --shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Main Container */
.directory-container {
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.directory-header {
  text-align: center;
  margin-bottom: 2rem;
}

.directory-header h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.directory-header p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--light-text);
  max-width: 800px;
  margin: 0 auto;
}

/* Search Bar */
.search-container {
  margin: 0 auto 2rem;
  max-width: 600px;
  padding: 0 1rem;
}

.search-bar {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: var(--transition);
}

.search-bar:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(89, 144, 204, 0.2);
}

/* Employee Grid */
.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
  margin-bottom: 2rem;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

/* Dialog Overlay */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

/* Delete Dialog */
.delete-dialog {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow);
}

.delete-dialog h3 {
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
}

/* Add Employee Form */
.add-form {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: var(--shadow);
}

.add-form h3 {
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(89, 144, 204, 0.2);
}

/* Form Actions */
.dialog-actions, .form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Button Styles */
.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-success {
  background-color: var(--success-color);
  color: white;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .employee-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .delete-dialog, .add-form {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .employee-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons, .dialog-actions, .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn {
    width: 100%;
  }
  
  .delete-dialog, .add-form {
    padding: 1rem;
  }
}
</style>