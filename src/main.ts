import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle'

import 'bootstrap/dist/js/bootstrap.bundle.min.js' // This is CRITICAL for dropdowns!
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .mount('#app')
