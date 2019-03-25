<template>
  <div :class="classObj">
    <section class="sidebar-container">
        <div class="logo_box">
            <!-- <img src="@/assets/images/logo.png" alt="" class="logo"> -->
        </div>
         <sub-nav :isCollapse="isCollapse" :submenuAll="submenuAll"></sub-nav>
    </section>
    <section class="main-container">
        <div class="header">
            <hamburger :toggle-click="toggleSideBar" :is-active="!isCollapse" class="hamburger-container" v-if="!unCollapsable"/>
            <div v-else></div>
            <main-nav @changeMenu="getPathInfo" :activeMenu="activeSubMenu" :unCollapsable="unCollapsable"></main-nav>
        </div>
        <section class="container-box">
            <div class="breadcrumb_wrap">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>{{mainMenu[activeMainMenu]}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{activeSubMenuTitle}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </section>
    </section>
  </div>
</template>

<script>

import Hamburger from '@/components/Hamburger'
import { SubNav, MainNav } from './components'
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
            activeMainMenu: 'home',
            activeSubMenu: 'home',
            activeSubMenuTitle: '',
            mainMenu: {
                home: '察言启动器',
                monitor: '我的监控',
                clew: '我的线索',
                workflow: '工作流管理',
            },
            submenuAll: {
                home: [{
                    title: '更新启动器',
                    pathName: 'update',
                    icon: require('@/assets/images/starts-1.png')
                }],
                monitor: [{
                    title: '监控策略',
                    pathName: 'strategy',
                    icon: require('@/assets/images/monitor-1.png')
                }, {
                    title: '监控渠道管理',
                    pathName: 'channel',
                    icon: require('@/assets/images/monitor-2.png')
                }, {
                    title: '定制监控渠道',
                    pathName: 'customized',
                    icon: require('@/assets/images/monitor-3.png')
                }, {
                    title: '账号库',
                    pathName: 'account',
                    icon: require('@/assets/images/monitor-4.png')
                }],
                clew: [{
                    title: '智能分析',
                    pathName: 'analysis',
                    icon: require('@/assets/images/clew-1.png')
                }, {
                    title: '线索库',
                    pathName: 'library',
                    icon: require('@/assets/images/clew-2.png')
                }, {
                    title: '工作台',
                    pathName: 'workbench',
                    icon: require('@/assets/images/clew-3.png')
                }, {
                    title: '智能客服',
                    pathName: 'customer_service',
                    icon: require('@/assets/images/clew-4.png')
                }],
                    workflow: [{
                    title: '子账号管理',
                    pathName: 'subaccount',
                    icon: require('@/assets/images/workflow-1.png')
                }, {
                    title: '权限管理',
                    pathName: 'privilege',
                    icon: require('@/assets/images/workflow-2.png')
                }]
            }
        };
    },
    created() {
        this.getPathInfo();
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
                openSidebar: !this.isCollapse
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
            this.activeMainMenu = this.$route.path.split('/')[1]||'home';
            this.activeSubMenu = this.$route.path.split('/')[2] || this.submenuAll[this.activeMainMenu][0].pathName;
            this.activeSubMenuTitle = this.submenuAll[this.activeMainMenu].filter(item=> {
                return item.pathName === this.activeSubMenu;
            })[0].title;
        }
    },
    components: {
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
                height:96px;
                background: #303851 url('../../assets/images/logo.png') center no-repeat;
                background-size: 90%;
                img{
                    width: 162px;
                }
            }
        }

        .main-container{
            height: calc(100vh);
            -webkit-transition: margin-left .28s;
            transition: margin-left .28s;
            margin-left: 256px;
            position: relative;
            background: #EBEEF5;
            overflow-y: scroll;
            .header{
                display: flex;
                // height:96px;
                justify-content: space-between;
                align-items: center;
                padding: 0 18px;
                background:rgba(255,255,255,1);
                border-bottom: solid 1px #EBEEF5;
            }
            .container-box{
                padding: 16px 24px 24px;
                .breadcrumb_wrap{
                    padding-bottom: 42px;
                }
            }
        }
        
        &.openSidebar{
            position: fixed;
            top: 0;
        }
    }

    #app .hideSidebar .main-container {
        margin-left: 64px;
    }

</style>
