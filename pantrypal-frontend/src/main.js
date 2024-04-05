import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App).use(router).use(Toast).mount('#app')
