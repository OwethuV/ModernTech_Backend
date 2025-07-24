<template>
  <div class="attendance-view">
    <AttendanceComp
      :employees="employees"
      @add-employee="handleAddEmployee"
      @delete-employee="handleDeleteEmployee"
      @update-employee="handleUpdateEmployee"
    />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/Footer.vue";
</script>

<script>
import AttendanceComp from "@/components/AttendanceComp.vue";
import { useEmployeeStore } from "@/store/employeeStore";
import { computed } from "vue";

export default {
  components: { AttendanceComp },
  setup() {
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);

    // Add employee
    function handleAddEmployee(name) {
      const newId = employees.value.length
        ? Math.max(...employees.value.map((e) => e.employeeId)) + 1
        : 1;
      employeeStore.employees.push({
        employeeId: newId,
        name,
        attendance: [],
        leaveRequests: [],
      });
    }

    // Delete employee
    function handleDeleteEmployee(employeeId) {
      employeeStore.employees = employeeStore.employees.filter(
        (e) => e.employeeId !== employeeId
      );
    }

    // Update employee
    function handleUpdateEmployee(updatedEmployee) {
      const idx = employeeStore.employees.findIndex(
        (e) => e.employeeId === updatedEmployee.employeeId
      );
      if (idx !== -1) {
        employeeStore.employees[idx] = updatedEmployee;
      }
    }
    return {
      employees,
      handleAddEmployee,
      handleDeleteEmployee,
      handleUpdateEmployee,
    };
  },
};
</script>
