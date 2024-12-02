import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "@/router";

import App from './App.vue'
import i18n from './i18n'

import './style.scss'

const app = createApp(App)

const pinia = createPinia()

app
  .use(i18n)
  .use(pinia)
  .use(router)
  .mount('#app')
