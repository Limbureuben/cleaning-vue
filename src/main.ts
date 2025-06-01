import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Vue3Toastify from 'vue3-toastify'

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .use(Vue3Toastify, {
    position: 'top-right',
    autoClose: 3000
  })
  .mount('#app')
