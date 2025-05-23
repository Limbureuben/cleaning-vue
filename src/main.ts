import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle'

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .mount('#app')
