import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/index'
        }, {
            path: '/index',
            name: 'home_index',
            component: () => import('@/views/home_index.vue')
        }, {
            path: '/bang',
            name: 'bang',
            component: () => import('@/views/home_bang.vue')
        }, {
            path: '/msg',
            name: 'msg',
            component: () => import('@/views/home_msg.vue')
        }, {
            path: '/msg/:id',
            name: 'msg_detail',
            component: () => import('@/views/msg_detail.vue'),
        }, {
            path: '/my',
            name: 'my',
            component: () => import('@/views/home_my.vue')
        }, {
            path: '/my/customer',
            name: 'customer',
            component: () => import('@/views/my_customer.vue')
        }, {
            path: '/my/customer/baogao',
            name: 'baogao',
            component: () => import('@/views/baogao.vue'),
            redirect: '/my/customer/baogao/tab1',
            children: [
                {
                    path: 'tab1',
                    name: 'baogao_tab1',
                    component: () => import('@/views/baogao_tab1')
                }, {
                    path: 'tab2',
                    name: 'baogao_tab2',
                    component: () => import('@/views/baogao_tab2')
                }
            ]
        }, {
            path: '/my/customer/baogao_add',
            name: 'baogao_add',
            component: () => import('@/views/baogao_add')
        }, {
            path: '/my/customer/baogao_view_1',
            name: 'baogao_view_1',
            component: () => import('@/views/baogao_view_1')
        }, {
            path: '/my/customer/zheng',
            name: 'zheng',
            component: () => import('@/views/zheng')
        }, {
            path: '/ketang_index',
            name: 'ketang_index',
            component: () => import('@/views/ketang_index')
        }, {
            path: '/ketang_detail',
            name: 'ketang_detail',
            component: () => import('@/views/ketang_detail')
        }, {
            path: '/ketang_lianxi',
            name: 'ketang_lianxi',
            component: () => import('@/views/ketang_lianxi')
        }, {
            path: '/ketang_lianxi_result',
            name: 'ketang_lianxi_result',
            component: () => import('@/views/ketang_lianxi_result')
        }, {
            path: '/shequ',
            name: 'shequ',
            component: () => import('@/views/shequ'),
            redirect: '/shequ/shequ_tab1',
            children: [
                {
                    path: 'shequ_tab1',
                    name: 'shequ_tab1',
                    component: () => import('@/views/shequ_tab1')
                }, {
                    path: 'shequ_tab2',
                    name: 'shequ_tab2',
                    component: () => import('@/views/shequ_tab2')
                }
            ]
        }, {
            path: '/shequ_detail',
            name: 'shequ_detail',
            component: () => import('@/views/shequ_detail')
        }, {
            path: 'shequ_search',
            name: 'shequ_search',
            component: () => import('@/views/shequ_search')
        }, {
            path: '/shequ_ask_question',
            name: 'shequ_ask_question',
            component: () => import('@/views/shequ_ask_question')
        }, {
            path: '/my/customer/zheng_fenxi',
            name: 'zheng_fenxi',
            component: () => import('@/views/zheng_fenxi')
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
