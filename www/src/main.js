import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import API from './app/api'

import './assets/style.css'

/* Shoelace */
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/');

/* Font Awesome */
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'

/* add icons to the library */
library.add(faCirclePlus)

const api = new API()

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.provide('api', api)
app.mount('#app')
