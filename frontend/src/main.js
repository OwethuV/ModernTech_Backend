import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'


import {Chart as ChartJS} from 'chart.js'
import { BarController, PieController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register
(BarController, PieController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend)

const pinia = createPinia(); 

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
