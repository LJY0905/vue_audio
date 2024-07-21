import { createApp } from 'vue'

import App from './App.vue'

import { Progress } from 'vant';

import 'vant/lib/index.css';

const app = createApp(App)
app.use(Progress);
app.mount('#app')
