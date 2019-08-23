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
            path: '/zheng_customer',
            name: 'zheng_customer',
            component: () => import('@/views/zheng_customer.vue')
        }, {
            path: '/zheng_baogao',
            name: 'baogao',
            component: () => import('@/views/baogao.vue'),
            redirect: '/zheng_baogao/tab1',
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
            path: '/zheng_baogao_add',
            name: 'baogao_add',
            component: () => import('@/views/baogao_add')
        }, {
            path: '/zheng_baogao_view_1',
            name: 'baogao_view_1',
            component: () => import('@/views/baogao_view_1')
        }, {
            path: '/zheng',
            name: 'zheng',
            component: () => import('@/views/zheng')
        }, {
            path: '/zheng_fenxi',
            name: 'zheng_fenxi',
            component: () => import('@/views/zheng_fenxi')
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
            path: '/shequ_search',
            name: 'shequ_search',
            component: () => import('@/views/shequ_search')
        }, {
            path: '/shequ_ask_question',
            name: 'shequ_ask_question',
            component: () => import('@/views/shequ_ask_question')
        }, {
            path: '/shequ_reply_question',
            name: 'shequ_reply_question',
            component: () => import('@/views/shequ_reply_question')
        }, {
            path: '/shequ_reply_detail',
            name: 'shequ_reply_detail',
            component: () => import('@/views/shequ_reply_detail')
        }, {
            path: '/my_set',
            name: 'my_set',
            component: () => import('@/views/my_set')
        }, {
            path: '/my_set_name',
            name: 'my_set_name',
            component: () => import('@/views/my_set_name')
        }, {
            path: '/my_set_pwd',
            name: 'my_set_pwd',
            component: () => import('@/views/my_set_pwd')
        }, {
            path: '/my_set_team',
            name: 'my_set_team',
            component: () => import('@/views/my_set_team')
        }, {
            path: '/my_customer',
            name: 'my_customer',
            component: () => import('@/views/my_customer')
        }, {
            path: '/my_sheet',
            name: 'my_sheet',
            component: () => import('@/views/my_sheet')
        }, {
            path: '/my_vip',
            name: 'my_vip',
            component: () => import('@/views/my_vip')
        }, {
            path: '/my_vip_pay_result',
            name: 'my_vip_pay_result',
            component: () => import('@/views/my_vip_pay_result')
        }, {
            path: '/my_question',
            name: 'my_question',
            component: () => import('@/views/my_question')
        }, {
            path: '/my_answer',
            name: 'my_answer',
            component: () => import('@/views/my_answer')
        }, {
            path: '/my_statistics_zheng',
            name: 'my_statistics_zheng',
            component: () => import('@/views/my_statistics_zheng')
        }, {
            path: '/my_statistics_learn',
            name: 'my_statistics_learn',
            component: () => import('@/views/my_statistics_learn')
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
