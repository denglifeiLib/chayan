import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

Vue.use(Router);


export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '',
            redirect: '/login',
        },{
            path: '/login',
            component: () => import('@/views/account/Login.vue')
        }, {
            path: '/home',  // 概览
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
            path: '/live', // 直播管理
            component: Layout,
            children: [{
                path: '',
                redirect: 'list',
            }, {
                path: 'list',
                name: 'live_list',
                component: () => import('@/views/live/List.vue')
            }, {
                path: 'base_info',
                name: 'live_base_info',
                component: () => import('@/views/live/StepBaseInfo.vue')
            }, {
                path: 'layout',
                name: 'live_layout',
                component: () => import('@/views/live/StepLayout.vue')
            }, {
                path: 'elements',
                name: 'live_elements',
                component: () => import('@/views/live/Elements.vue')
            }, {
                path: 'plugin',
                name: 'live_plugin',
                component: () => import('@/views/live/Plugin.vue')
            }, {
                path: 'root',
                name: 'live_root',
                component: () => import('@/views/live/Root.vue')
            }, {
                path: 'release',
                name: 'live_release',
                component: () => import('@/views/live/Release.vue')
            }, {
                path: 'ali',
                name: 'live_ali',
                component: () => import('@/views/live/Ali.vue')
            }, {
                path: 'category',
                name: 'live_category',
                component: () => import('@/views/live/Category.vue')
            }, {
                path: 'replay',
                name: 'live_replay',
                component: () => import('@/views/live/Replay.vue')
            }]
        }, {
            path: '/question',  // 问卷管理
            // name: 'question',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/question/list', 
                }, {
                    path: 'list',
                    name: 'question_list', // 问卷列表
                    component: () => import('@/views/questions/List.vue'),
                }, {
                    path: 'timu',
                    name: 'question_timu_list', // 问卷题目列表
                    component: () => import('@/views/questions/Timu.vue'),
                }, {
                    path: 'templates',
                    name: 'question_templates', // 题库
                    component: () => import('@/views/questions/Templates.vue'),
                }
            ]
        }, {
            path: '/partment',  // 部门分级设置
            // name: 'partment',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/partment/list',
                }, {
                    path: 'list',
                    name: 'partment_list',
                    component: () => import('@/views/partment/List.vue'),
                }, {
                    path: 'add',
                    name: 'partment_add',
                    component: () => import('@/views/partment/Add.vue'),
                }, {
                    path: 'Member',
                    name: 'partment_member',
                    component: () => import('@/views/partment/member.vue'),
                }, {
                    path: 'add_member',
                    name: 'partment_add_member',
                    component: () => import('@/views/partment/AddMember.vue'),
                }
            ]
        }, {
            path: '/analyse',  // 部门分级设置
            // name: 'analyse',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/analyse/index',
                }, {
                    path: 'live',
                    name: 'analyse_live_index',
                    component: () => import('@/views/Analyse/live/Index.vue'),
                }, {
                    path: 'live_member',
                    name: 'analyse_live_member',
                    component: () => import('@/views/Analyse/live/Member.vue'),
                }, {
                    path: 'live_partment',
                    name: 'analyse_live_partment',
                    component: () => import('@/views/Analyse/live/Partment.vue'),
                }, {
                    path: 'replay',
                    name: 'analyse_replay_index',
                    component: () => import('@/views/Analyse/replay/Index.vue'),
                }, {
                    path: 'replay_member',
                    name: 'analyse_replay_member',
                    component: () => import('@/views/Analyse/replay/Member.vue'),
                }, {
                    path: 'replay_partment',
                    name: 'analyse_replay_partment',
                    component: () => import('@/views/Analyse/replay/Partment.vue'),
                }
            ]
        }, {
            path: '/control',  // 部门分级设置
            // name: 'control',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/control/list',
                }, {
                    path: 'List',
                    name: 'control_list',
                    component: () => import('@/views/control/List.vue'),
                }, {
                    path: 'view',
                    name: 'control_view',
                    component: () => import('@/views/control/View2.vue'),
                }
            ]
        }, {
            path: '/actory',
            name: 'control_factory',
            component: () => import('@/views/control/Factory.vue'),
            children: [
                // {
                //     path: '',
                //     redirect: '/factory/view',
                // }, 
                {
                    path: 'view',
                    name: 'factory_view',
                    component: () => import('@/views/control/View.vue'),
                }, {
                    path: 'view_msg',
                    name: 'factory_view_msg',
                    component: () => import('@/views/control/View_msg.vue'),
                }, {
                    path: 'view_introduce',
                    name: 'factory_view_introduce',
                    component: () => import('@/views/control/View_introduce.vue'),
                }
            ]
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
