// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import WeVue from 'we-vue';
import 'we-vue/lib/style.css'
import './assets/css/reset.less';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// import { Button, Dialog } from 'element-ui';

// Vue.use(Button)
// Vue.use(Dialog)

Vue.use(VueAwesomeSwiper)
Vue.use(WeVue);

import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);


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
