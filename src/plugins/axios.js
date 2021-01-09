import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = 'http://api-todolist.test/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';


Vue.prototype.$axios = axios;