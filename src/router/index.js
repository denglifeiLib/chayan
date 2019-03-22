import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

Vue.use(Router);


export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '',
            redirect: '/home',
        }, {
            path: '/home',
            component: Layout,
            children: [{
                path: '',
                redirect: 'update'
            }, {
                path: 'update',
                name: 'update',
                component: () => import('@/views/starter/Update.vue')
            }]
        }, {
            path: '/monitor',
            component: Layout,
            children: [{
                path: '',
                redirect: 'strategy'
            }, {
                path: 'strategy',
                name: 'strategy',
                component: () => import('@/views/monitor/Strategy.vue'),
            }, {
                path: 'channel',
                name: 'channel',
                component: () => import('@/views/monitor/Channel.vue'),
            }, {
                path: 'account',
                name: 'account',
                component: () => import('@/views/monitor/Account.vue'),
            }, {
                path: 'customized',
                name: 'customized',
                component: () => import('@/views/monitor/Customized.vue'),
            }]
        }, {
            path: '/clew',
            component: Layout,
            children: [{
                path: '',
                redirect: 'analysis'
            }, {
                path: 'analysis',
                name: 'analysis',
                component: () => import('@/views/clew/Analysis.vue'),
            }, {
                path: 'library',
                name: 'library',
                component: () => import('@/views/clew/Library.vue'),
            }, {
                path: 'workbench',
                name: 'workbench',
                component: () => import('@/views/clew/Workbench.vue'),
            }, {
                path: 'customer_service',
                name: 'customer_service',
                component: () => import('@/views/clew/Customer_service.vue'),
            }]
        }, {
            path: '/workflow',
            component: Layout,
            children: [{
                path: '',
                redirect: 'subaccount'
            }, {
                path: 'privilege',
                name: 'privilege',
                component: () => import('@/views/workflow/Privilege.vue'),
            }, {
                path: 'subaccount',
                name: 'subaccount',
                component: () => import('@/views/workflow/subaccount.vue'),
            }]
        }
    ]
})
