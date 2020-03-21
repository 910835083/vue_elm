import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './mock/mockServer'
import VueLazyload from 'vue-lazyload';
import loading from './assets/loading.gif'
import './filters/index'
Vue.use(VueLazyload, {
    loading
})
Vue.component(Button.name, Button);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')