<template>
  <div :class="classObj">
    <section class="sidebar-container">
        <div class="logo_box">
            <icon name="logo" scale="4" style="color: #fff;"></icon>
            <icon name="logo_txt" scale="4" style="color: #fff;margin-left:4px;" :class="['logo_txt',{'hide': isCollapse}]"></icon>
        </div>
         <sub-nav :isCollapse="isCollapse" :submenuAll="submenuAll" :exData='exData'></sub-nav>
    </section>
    <section class="main-container">
        <div :class="['header', isCollapse ? 'longNav': 'shortNav']">
            <hamburger :toggle-click="toggleSideBar" :is-active="!isCollapse" class="hamburger-container" v-if="!unCollapsable" :applyModel="exData.applyModel"/>
            <div v-else></div>
            <main-nav @changeMenu="getPathInfo" :activeMenu="activeSubMenu" :unCollapsable="unCollapsable" :applyModel="exData.applyModel"></main-nav>
        </div>
        <section class="container-box">
            <!-- <icon name="sidebar_icon3" scale="2.5" class="subMenuIcon"></icon>
            <icon name="sidebar_icon4" scale="2.5" class="subMenuIcon"></icon>
            <icon name="sidebar_icon9" scale="2.5" class="subMenuIcon"></icon>
            <icon name="sidebar_icon10" scale="2.5" class="subMenuIcon"></icon>
            <icon name="sidebar_icon11" scale="2.5" class="subMenuIcon"></icon>
            <icon name="sidebar_icon12" scale="2.5" class="subMenuIcon"></icon> -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </section>
        <footer>CopyRight&#169China Pacific Insurance(group) Co.,Ltd.. All Rights Reserved</footer>
    </section>
  </div>
</template>

<script>

import Hamburger from '@/components/Hamburger'
import { SubNav, MainNav } from './components'
import Icon from 'vue-svg-icon/Icon.vue';
import { debounce } from '@/utils'

export default {
    name: 'HelloWorld',
    data () {
        return {
            unCollapsable: false,
            isCollapse: false,
            sidebar: {
                opened: true
            },
            path: '/home',
            activeSubMenu: 'home',
            activeSubMenuTitle: '',
            // mainMenu: {
            //     home: '察言启动器',
            //     monitor: '我的监控',
            //     clew: '我的线索',
            //     workflow: '工作流管理',
            // },
            submenuAll: {
                home: [
                    {
                        title: '首页',
                        pathName: 'home_index',
                        icon: 'sidebar_icon'
                    }, {
                        title: '应用',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon13'
                    }, {
                        title: '基础',
                        pathName: '',
                        icon: 'sidebar_icon5',
                        children: [{
                            title: '用户管理',
                            pathName: 'home_base_user',
                        }, {
                            title: '应用管理',
                            pathName: 'home_base_supply',
                        }, {
                            title: '开发服务',
                            pathName: 'home_base_server',
                        }]
                    }
                ],
                reptile: [
                    {
                        title: '应用列表',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon1'
                    }, {
                        title: '爬虫服务',
                        pathName: '',
                        icon: 'sidebar_icon7',
                        children: [{
                            title: '爬虫清单',
                            pathName: 'reptile_list',
                        }, {
                            title: '爬虫授权',
                            pathName: 'reptile_author',
                        }]
                    }
                ],
                data_manage: [
                    {
                        title: '应用列表',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon1'
                    }, {
                        title: '数据处理',
                        pathName: 'data_manage_list',
                        icon: 'sidebar_icon10'
                    }],
                data_transfer: [{
                        title: '应用列表',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon1'
                    }, {
                        title: '数据传输',
                        pathName: 'data_transfer_list',
                        icon: 'sidebar_icon4'
                    }
                ],
                timed_task: [
                    {
                        title: '应用列表',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon1'
                    }, {
                        title: '数据采集看板',
                        pathName: 'timed_task_view',
                        icon: 'sidebar_icon9'
                    }, {
                        title: '任务运行清单',
                        pathName: 'timed_task_list',
                        icon: 'sidebar_icon3'
                    }, {
                        title: '定时任务设置',
                        pathName: 'timed_task_set',
                        icon: 'sidebar_icon12'
                    }
                ],
                weix: [
                    {
                        title: '应用列表',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon1'
                    }, {
                        title: '微信看板',
                        pathName: 'weix_view',
                        icon: 'sidebar_icon8'
                    }, {
                        title: '触发事件清单',
                        pathName: 'weix_list',
                        icon: 'sidebar_icon6'
                    }, {
                        title: '监控设置',
                        pathName: '',
                        icon: 'sidebar_icon5',
                        children: [{
                            title: '事件触发规则',
                            pathName: 'weix_set_trigger'
                        }, {
                            title: '高频事件规则',
                            pathName: 'weix_set_high'
                        }, {
                            title: '知识库管理',
                            pathName: 'weix_set_store'
                        }]
                    }, {
                        title: '统计',
                        pathName: 'weix_total',
                        icon: 'sidebar_icon2'
                    }
                ],
                agent: [
                    {
                        title: '应用列表',
                        pathName: 'home_apply',
                        icon: 'sidebar_icon1'
                    }, {
                        title: '代理服务',
                        pathName: 'agent_server',
                        icon: 'sidebar_icon6'
                    }
                ],
            },
            exData: {
                applyModel: ''
            }
        };
    },
    created() {
        // this.getPathInfo();
    },
    mounted() {
         
        this.__resizeHandler = debounce(() => {
            if (document.body.clientWidth < 1200) {
                this.isCollapse = true;
                this.unCollapsable = true;
            }else{
                this.unCollapsable = false;
            }
        }, 100);
        if (document.body.clientWidth < 1200) {
            this.isCollapse = true;
            this.unCollapsable = true;
        }else{
            this.unCollapsable = false;
        }
        window.addEventListener('resize', this.__resizeHandler);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeHandler);
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.getPathInfo()
            },
            deep: true
        }
    },
    computed: {
        classObj() {
            return {
                'app-wrapper': true,
                hideSidebar: this.isCollapse,
                openSidebar: !this.isCollapse,
            };
        }
    },
    methods: {
        toggleSideBar() {
            if(!this.unCollapsable) {
                this.isCollapse = !this.isCollapse;
            }
        },
        getPathInfo() {
            // this.activeMainMenu = this.$route.path.split('/')[1]||'home';
            // this.activeSubMenu = this.$route.path.split('/')[2] || this.submenuAll[this.activeMainMenu][0].pathName;
            // this.activeSubMenuTitle = this.submenuAll[this.activeMainMenu].filter(item=> {
            //     return item.pathName === this.activeSubMenu;
            // })[0].title;
        }
    },
    components: {
        Icon,
        SubNav,
        MainNav,
        Hamburger
    },
}
</script>
<style lang="scss" scoped>
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        // min-width: 1200px;
        .sidebar-container{
            transition: width 0.28s;
            height: 100%;
            position: fixed;
            font-size: 0px;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
            // width: 256px;
            background: #3E4760;
            border-bottom: solid 1px #EBEEF5;
            .logo_box{
                display:flex;
                align-items: center;
                justify-content: center;
                padding: 17px 0;
                -webkit-transition: width .28s .1s;
                transition: width .28s.1s;
                background: #303851;
                img{
                    width: 162px;
                }
                .logo_txt{
                    -webkit-transition: width .28s .1s;
                    transition: width .28s.1s;
                    &.hide{
                        width: 0;
                    }
                }
            }
        }

        .main-container{
            position: relative;
            height: calc(100vh);
            -webkit-transition: margin-left .28s;
            transition: margin-left .28s;
            margin-left: 256px;
            background: #EBEEF5;
            overflow-y: scroll;
            padding-top: 65px;
            overflow-x: hidden;
            .header{
                position: fixed;
                top:0;
                left: 65px;
                right: 0;
                display: flex;
                height: 65px;
                justify-content: space-between;
                align-items: center;
                padding: 0 18px;
                background:rgba(255,255,255,1);
                border-bottom: solid 1px #EBEEF5;
                z-index: 10002;
                -webkit-transition: left .28s ;
                transition: left .28s;
                &.longNav{
                    left: 64px;
                }
                &.shortNav{
                    left: 256px;
                }
            }
            .container-box{
                padding: 0 24px 24px;
                .breadcrumb_wrap{
                    padding: 15px 0;
                }
            }
        }
        footer{
            font-size:12px;
            color:rgba(0,0,0,0.45);
            line-height:20px;
            padding: 10px;
            text-align: center;
        }
        
        &.openSidebar{
            position: fixed;
            top: 0;
        }
    }

    #app .hideSidebar .main-container {
        margin-left: 64px;
    }
    // @media (max-width: 1100px) {
    //     .app-wrapper .main-container{
    //         padding-top: 60px;
    //     }
    // }

</style>
