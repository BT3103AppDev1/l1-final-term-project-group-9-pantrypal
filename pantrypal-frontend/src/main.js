import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(Toast).use(VueChartkick).mount('#app')
