<template>
  <div :class="classObj">
      
    <section class="sidebar-container">
        <div class="logo_box">
            <!-- <icon name="logo" scale="4" style="color: #fff;"></icon> -->
            <!-- <icon name="logo_txt" scale="4" style="color: #fff;margin-left:4px;" :class="['logo_txt',{'hide': isCollapse}]"></icon> -->
        </div>
         <sub-nav :isCollapse="isCollapse" :submenuAll="submenuAll" :exData='exData'></sub-nav>
    </section>


    <section class="main-container">

        <div :class="['header', isCollapse ? 'longNav': 'shortNav']">
            <hamburger :toggle-click="toggleSideBar" :is-active="!isCollapse" class="hamburger-container" v-if="!unCollapsable" :applyModel="exData.applyModel"/>
            <div v-else></div>
            <h1 class="title">直播管理后台</h1>
            <div class="user_info">
                Admin
                <img src="../../assets/images/p_header.jpg" alt="" class="header_img">
            </div>
        </div>

        <section class="container-box">
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
            submenuAll: {
                home: [
                    {
                        title: '概览',
                        pathName: 'home_index',
                        icon: 'el-icon-s-home'
                    }, {
                        title: '直播管理',
                        icon: 'el-icon-guide',
                        children: [{
                            title: '直播',
                            pathName: 'live_list',
                        }, {
                            title: '直播分类',
                            pathName: 'live_category',
                        }, {
                            title: '回播',
                            pathName: 'live_replay',
                        }]
                    }, {
                        title: '问卷管理',
                        pathName: 'question_list',
                        icon: 'el-icon-document'
                    }, {
                        title: '实时控场',
                        pathName: 'control_list',
                        icon: 'el-icon-menu'
                    }, {
                        title: '部门分级设置',
                        pathName: 'partment_list',
                        icon: 'el-icon-office-building'
                    }, {
                        title: '数据统计',
                        icon: 'el-icon-data-analysis',
                        children: [{
                            title: '直播分析',
                            pathName: 'analyse_live_index',
                        }, {
                            title: '回播分析',
                            pathName: 'analyse_replay_index',
                        }]
                    }
                ]
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
         
        // this.__resizeHandler = debounce(() => {
        //     if (document.body.clientWidth < 1200) {
        //         this.isCollapse = true;
        //         this.unCollapsable = true;
        //     }else{
        //         this.unCollapsable = false;
        //     }
        // }, 100);
        // if (document.body.clientWidth < 1200) {
        //     this.isCollapse = true;
        //     this.unCollapsable = true;
        // }else{
        //     this.unCollapsable = false;
        // }
        // window.addEventListener('resize', this.__resizeHandler);
    },
    beforeDestroy() {
        // window.removeEventListener('resize', this.__resizeHandler);
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
                padding: 0 24px 0 18px;
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
                .title{
                    width: 100%;
                    padding-left: 15px;
                    font-size: 28px;
                }
                .hamburger-box{
                    flex-shrink: 0;
                    flex-grow: 0;
                }
                .user_info{
                    font-size: 18px;
                    white-space: nowrap;
                    .header_img{
                        width: 45px;
                        height: 45px;
                        margin-left: 15px;
                        border-radius: 45px;
                        vertical-align: middle;
                    }
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
