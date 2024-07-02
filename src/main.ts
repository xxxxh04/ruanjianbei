import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' //Vue的专属状态管理库
import {createPersistedState } from "pinia-persistedstate-plugin"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia();
const persistedState = createPersistedState()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

pinia.use(persistedState);

app.use(ElementPlus)

app.use(router)

app.use(pinia);

app.mount('#app')
