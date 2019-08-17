import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/index.vue')
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
