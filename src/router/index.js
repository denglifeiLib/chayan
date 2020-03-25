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
        },{
            path: '/login',
            component: () => import('@/views/account/Login.vue')
        }, {
            path: '/msg', // 消息
            component: Layout,
            children: [{
                path: '',
                redirect: 'msg',
            }, {
                path: 'msg',// 消息 ---- 列表
                name: 'msg_list',
                component: () => import('@/views/msg/List.vue')
            }, {
                path: 'msg/:id',// 消息 ---- 详情
                name: 'msg_detail',
                component: () => import('@/views/msg/Detail.vue'),
            }]
        }, {
            path: '/home',  // 首页
            redirect: 'home/index',
            component: Layout,
            children: [{
                path: '',
                redirect: 'index',
            }, {
                path: 'index',
                name: 'home_index',
                component: () => import('@/views/home/Index.vue'),
            }]
        }, {
            path: '/control_panel',  // 监控面板
            name: 'control_panel',
            component: Layout,
            children: [{
                path: '',
                name: 'control_panel_index',
                redirect: '/control_panel/device',
                component: () => import('@/views/ControlPanel/Index.vue'),
                children: [{
                    path: 'device',
                    name: 'control_panel_device',
                    component: () => import('@/views/ControlPanel/Device.vue'),
                }, {
                    path: 'member',
                    name: 'control_panel_member',
                    component: () => import('@/views/ControlPanel/Member.vue'),
                }]
            }]
        }, {
            path: '/sets',
            component: Layout,
            children: [{
                path: '',
                redirect: 'device_manage',
            }, {
                path: 'device_manage',//应用 --- 代理服务
                name: 'device_manage',
                component: () => import('@/views/sets/DeviceManage.vue'),
            }, {
                path: 'banner_manage',//应用 --- 代理服务
                name: 'banner_manage',
                component: () => import('@/views/sets/BannerManage.vue'),
            }, {
                path: 'account_manage',//应用 --- 代理服务
                name: 'account_manage',
                component: () => import('@/views/sets/Account.vue'),
            }]
        }, {
            path: '/check_report',  // 检查报告
            component: Layout,
            children: [{
                path: '',
                name: 'check_report',
                component: () => import('@/views/Report/Index.vue')
            }]
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
