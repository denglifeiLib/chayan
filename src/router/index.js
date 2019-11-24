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
            path: '/faq',
            name: 'faq',
            component: () => import('@/views/home_faq.vue')
        }, {
            path: '/my',
            name: 'my',
            component: () => import('@/views/home_my.vue')
        }, {
            path: '/watch_history',
            name: 'watch_history',
            component: () => import('@/views/history/watch_history.vue')
        }, {
            path: '/share_history',
            name: 'share_history',
            component: () => import('@/views/history/share_history.vue')
        }, {
            path: '/faq_history',
            name: 'faq_history',
            component: () => import('@/views/history/faq_history.vue')
        }, {
            path: '/search',
            name: 'search',
            component: () => import('@/views/search/index.vue')
        }, {
            path: '/apply',
            name: 'apply',
            component: () => import('@/views/search/apply.vue')
        }, {
            path: '/apply_result',
            name: 'apply_result',
            component: () => import('@/views/search/apply_result.vue')
        }, {
            path: '/vedio',
            name: 'vedio',
            redirect: '/vedio/article',
            component: () => import('@/views/vedio/index.vue'),
            children: [
                {
                    path: 'article',
                    name: 'vedio_article',
                    component: () => import('@/views/vedio/article.vue'),
                }, {
                    path: 'qa',
                    name: 'vedio_qa',
                    component: () => import('@/views/vedio/qa.vue'),
                }, {
                    path: 'msg',
                    name: 'vedio_msg',
                    component: () => import('@/views/vedio/msg.vue'),
                }
            ]
        }, {
            path: '/share',
            name: 'vedio_share',
            component: () => import('@/views/vedio/share.vue'),
        }, {
            path: '/share_open',
            name: 'share_open',
            component: () => import('@/views/vedio/share_open.vue'),
        }, {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        }
    ]
})
