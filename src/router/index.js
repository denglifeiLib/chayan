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
            path: '/home',  // 首页
            component: Layout,
            children: [{
                path: '',
                redirect: 'index',
            }, {
                path: 'index',
                name: 'home_index',
                component: () => import('@/views/home/Index.vue'),
            }, {
                path: 'apply', // 应用
                name: 'home_apply',
                component: () => import('@/views/Apply.vue'),
            }, {
                path: 'base_user', //基础 --- 用户管理
                redirect: 'base_user/list',
                name: 'home_base_user',
                component: () => import('@/views/base/User.vue'),
                children: [{
                    path: 'list',
                    name: 'home_base_user_list',
                    component: () => import('@/views/base/User_list.vue'),
                }, {
                    path: 'root',
                    name: 'home_base_user_root',
                    component: () => import('@/views/base/User_root.vue'),
                }]
            }, {
                path: 'base_supply', //基础 --- 应用管理
                name: 'home_base_supply',
                component: () => import('@/views/base/Supply.vue'),
            }, {
                path: 'base_server',//基础 --- 开发服务
                name: 'home_base_server',
                component: () => import('@/views/base/Server.vue'),
            }]
        }, {
            path: '/reptile',//应用 --- 爬虫 --- 爬虫清单
            component: Layout,
            children: [{
                path: '',
                redirect: 'list',
            }, {
                path: 'list',
                name: 'reptile_list',
                component: () => import('@/views/apply/reptile/List.vue'),
            }, {
                path: 'author',//应用 --- 爬虫 --- 爬虫授权
                name: 'reptile_author_0',
                component: () => import('@/views/apply/reptile/Author.vue'),
                children: [{
                    path: '',
                    redirect: 'reptile_author_list',
                }, {
                    path: 'reptile_author_list',//应用 --- 代理服务
                    name: 'reptile_author',
                    component: () => import('@/views/apply/reptile/Author_list.vue')
                }, {
                    path: 'reptile_author_set',//应用 --- 代理服务
                    name: 'reptile_author_set',
                    component: () => import('@/views/apply/reptile/Author_set.vue'),
                }]
            }]
        }, {
            path: '/data_manage',//应用 --- 爬虫 --- 爬虫清单
            component: Layout,
            children: [{
                path: '',
                redirect: 'list',
            }, {
                path: 'list',//应用 --- 数据处理
                name: 'data_manage_list',
                component: () => import('@/views/apply/data_manage/List.vue'),
            }, {
                path: 'detail',//应用 --- 数据处理
                name: 'data_manage_detail',
                component: () => import('@/views/apply/data_manage/Detail.vue'),
            }]
        }, {
            path: '/data_transfer',//应用 --- 爬虫 --- 爬虫清单
            component: Layout,
            children: [{
                path: '',
                redirect: 'list',
            }, {
                path: 'list',//应用 --- 数据处理
                name: 'data_transfer_list',
                component: () => import('@/views/apply/data_transfer/List.vue'),
            }]
        }, {
            path: '/timed_task',
            component: Layout,
            children: [{
                path: '',
                redirect: 'view',
            }, {
                path: 'view',//应用 --- 定时任务 ---- 数据采集看板
                name: 'timed_task_view',
                component: () => import('@/views/apply/timed_task/View.vue'),
            }, {
                path: 'list',//应用 --- 定时任务 ---- 任务运行清单
                name: 'timed_task_list',
                component: () => import('@/views/apply/timed_task/List.vue'),
            }, {
                path: 'set',//应用 --- 定时任务 ---- 定时任务设置
                name: 'timed_task_set',
                component: () => import('@/views/apply/timed_task/Set.vue')
            }]
        }, {
            path: '/weix',
            component: Layout,
            children: [{
                path: '',
                redirect: 'view',
            }, {
                path: 'view',//应用 --- 微信服务 ---- 微信看板
                name: 'weix_view',
                component: () => import('@/views/apply/weix/View.vue'),
            }, {
                path: 'list',//应用 --- 微信服务 ---- 触发事件清单
                name: 'weix_list',
                component: () => import('@/views/apply/weix/List.vue'),
            }, {
                path: 'set_trigger',//应用 --- 微信服务 ---- 事件触发规则
                name: 'weix_set_trigger',
                component: () => import('@/views/apply/weix/Set_trigger.vue'),
            }, {
                path: 'set_high',//应用 --- 微信服务 ---- 高频事件规则
                name: 'weix_set_high',
                component: () => import('@/views/apply/weix/Set_high.vue'),
            }, {
                path: 'set_store',//应用 --- 微信服务 ---- 知识库管理
                name: 'weix_set_store',
                component: () => import('@/views/apply/weix/Set_store.vue'),
            }, {
                path: 'set_total',//应用 --- 微信服务 ---- 统计
                name: 'weix_total',
                component: () => import('@/views/apply/weix/Total.vue'),
            }]
        }, {
            path: '/agent',
            component: Layout,
            children: [{
                path: '',
                redirect: 'agent_server',
            }, {
                path: 'agent_server',//应用 --- 代理服务
                name: 'agent_server',
                component: () => import('@/views/apply/agent/Agent_server.vue'),
            }]
        }, {
            path: '/msg',
            component: Layout,
            children: [{
                path: '',
                redirect: 'msg',
            }, {
                path: 'msg',//应用 --- 代理服务
                name: 'msg_list',
                component: () => import('@/views/msg/List.vue')
            }, {
                path: 'msg/:id',//应用 --- 代理服务
                name: 'msg_detail',
                component: () => import('@/views/msg/Detail.vue'),
            }]
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
