import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// project_all

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home'
        }, {
            path: '/home',
            name: 'home',
            redirect: '/project_all',
            component: () => import('@/views/layout.vue'),
            children: [
                {
                    path: '/project_all',
                    name: 'project_all',
                    component: () => import('@/views/project_all.vue')
                }, {
                    path: '/project_classified',
                    name: 'project_classified',
                    component: () => import('@/views/project_classified.vue')
                }, {
                    path: '/recycle',
                    name: 'recycle',
                    component: () => import('@/views/recycle.vue')
                }, {
                    path: '/member',
                    name: 'member',
                    component: () => import('@/views/member.vue')
                }
            ]
        }, {
            path: '/set',
            name: 'set',
            component: () => import('@/views/set/index.vue'),
            children: [
                {
                    path: '/set/personal_info',
                    name: 'personal_info',
                    component: () => import('@/views/set/personal_info.vue')
                }, {
                    path: '/set/account_pwd',
                    name: 'account_pwd',
                    component: () => import('@/views/set/account_pwd.vue')
                }, {
                    path: '/set/other_platform',
                    name: 'other_platform',
                    component: () => import('@/views/set/other_platform.vue')
                }
            ]
        }, {
            path: '/process',
            name: 'process',
            component: () => import('@/views/process.vue')
        }, {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue')
        }, {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register.vue')
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
