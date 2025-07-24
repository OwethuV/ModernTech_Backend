<template>
<form @submit.prevent="submitForm" class="center">
  <label for="name">Name:</label>
  <input id="name" v-model="form.name" required />

  <label>Position:</label>
  <input type="text" v-model="form.position" required />

  <label>Department:</label>
  <input type="text" v-model="form.department" required />

  <label>Working Days:</label>
  <input type="number" v-model.number="form.workingDays" required />

  <label>Days Present:</label>
  <input type="number" v-model.number="form.daysPresent" required /> 

  <label>Hours Worked:</label>
  <input type="number" v-model.number="form.hoursWorked" required />

  <label>Leave Deductions:</label>
  <input type="number" v-model.number="form.leaveDeductions" required />

  <button type="submit">Submit</button>
</form>
    
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  position: '',
  department: '',
  workingDays: '',
  daysPresent: '',
  hoursWorked: '',
  leaveDeductions: ''
})

const submitForm = () => {
  router.push({
    path: '/performancereview',
    query: { ...form }
  })
}
</script> 