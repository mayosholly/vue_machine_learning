import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import './assets/style.css'
import store from './store'; // Vuex store




// createApp(App).mount('#app')
const app = createApp(App)

app.use(store)

app.use(router)
app.mount('#app')