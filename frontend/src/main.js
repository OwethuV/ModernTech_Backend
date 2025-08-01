import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import router from './router'
import Navbar from './components/Navbar.vue' // Adjust path if needed

import { createPinia } from 'pinia'

import {Chart as ChartJS} from 'chart.js'
import { BarController, PieController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(
  BarController, PieController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend
)

const pinia = createPinia(); 

const app = createApp(App)
app.component('Navbar', Navbar) // Register globally
app.use(store)
app.use(router)
app.use(pinia)
app.mount('#app')