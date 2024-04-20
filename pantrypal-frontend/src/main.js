import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'chart.js';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import store from './store/index.js'

createApp(App).use(router).use(Toast).use(VueChartkick).use(store).mount('#app')
