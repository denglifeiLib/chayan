// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import WeVue from 'we-vue';
import 'we-vue/lib/style.css'
import './assets/css/reset.css';

Vue.use(WeVue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app', 
    router,  
    components: {
        App
    }, 
    template: '<App/>'
})
