import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

let loading = false;
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  loading = true;
  config.params = {...config.params, icode: '123456'}
  return config;
})
axios.interceptors.response.use(config => {
  loading = false;
})
createApp(App).use(store).use(router).mount('#app')
