<template>
  <div :class="classObj">
    <section class="sidebar-container">
        <div class="logo_box">
            <icon name="logo" scale="4" style="color: #fff;"></icon>
            <icon name="logo_txt" scale="6" style="color: #fff;" v-show="!isCollapse"></icon>
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
        <footer>Copyright @ 2019 上海察言网络科技有限公司</footer>
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
                    icon: 'slide_icon-7'
                }],
                monitor: [{
                    title: '监控策略',
                    pathName: 'strategy',
                    icon: 'slide_icon-8'
                }, {
                    title: '监控渠道管理',
                    pathName: 'channel',
                    icon: 'slide_icon-9'
                }, {
                    title: '定制监控渠道',
                    pathName: 'customized',
                    icon: 'slide_icon-10',
                    hasPro: true
                }, {
                    title: '账号库',
                    pathName: 'account',
                    icon: 'slide_icon-11'
                }],
                clew: [{
                    title: '智能分析',
                    pathName: 'analysis',
                    icon: 'slide_icon-2'
                }, {
                    title: '线索库',
                    pathName: 'library',
                    icon: 'slide_icon-4',
                    hasPro: true
                }, {
                    title: '工作台',
                    pathName: 'workbench',
                    icon: 'slide_icon'
                }, {
                    title: '智能客服',
                    pathName: 'customer_service',
                    icon: 'slide_icon-5',
                    hasPro: true
                }],
                    workflow: [{
                    title: '子账号管理',
                    pathName: 'subaccount',
                    icon: 'slide_icon-3'
                }, {
                    title: '权限管理',
                    pathName: 'privilege',
                    icon: 'slide_icon-6'
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
                padding: 10px 0;
                img{
                    width: 162px;
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

</style>
