<template>
  <div class="main-nav">
      <el-menu 
        :default-active="activeMenu" 
        class="el-menu-horizontal" 
        mode="horizontal"
        :router="false"
        :collapse="isCollapse"
        background-color="#fff"
        @select="handleSelect"
        text-color="#303133"
        active-text-color="#409EFF">
            <el-menu-item index="msg_list">
                <icon name="top_icon-4" scale="3" class="icon_img"></icon>系统消息
                <MsgNum :isRead="false" num="16"/>
            </el-menu-item>
            <el-submenu index="/">
                <template slot="title"><span class="user" style="backgroundImage:url(@/assets/images/Settings-3.png)">开渊</span>账户管理</template>
                <el-menu-item index="2-4-1"><i class="el-icon-document"></i>消息<span class="msg_red"></span></el-menu-item>
                <el-menu-item index="2-4-2"><i class="el-icon-date"></i>账户余额</el-menu-item>
                <el-menu-item index="2-4-3"><i class="el-icon-setting"></i>设置</el-menu-item>
                <el-menu-item index="2-4-4"><i class="el-icon-d-arrow-right"></i>退出账号</el-menu-item>
            </el-submenu>
        </el-menu>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import MsgNum from '@/components/MsgNum'
export default {
    name: 'MainNav',
    data () {
        return {
            activeMenu: '/'+ (this.$route.path.split('/')[1]||'home'),
            sidebar: {
                opened: true
            }
        };
    },
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.activeMenu = '/'+ (this.$route.path.split('/')[1]||'home');
            },
            deep: true
        }
    },
    computed: {
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened
            };
        }
    },
    methods: {
        handleSelect(name) {
            this.$router.push({name})
        }
    },
    components: {
        MsgNum,
        Icon
    },
}
</script>
<style lang="scss">
.msg_red{
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 4px;
    vertical-align: middle;
    background: #ff3636;
    margin-left: 20px;
}
.main-nav{
  .el-menu-horizontal{
        border: 0;
        .el-menu-item{
            position: relative;
            height: 64px;
            line-height: 64px;
            border-color: #fff;
            &:hover{
                background:#fff!important;
            }
            .red{
                position: absolute;
                font-size:12px;
                left: 40%;
                line-height: 125px;
                color:rgba(255,54,54,1);
            }
        }
        // .el-menu-item.is-active{
        //     border-bottom: 5px solid #409EFF!important;
        // }
        .user{
            display: inline-block;
            width:42px;
            height:42px;
            margin-right: 8px;
            border-radius: 50%;
            font-size:13px;
            color:rgba(2,133,255,1);
            text-align: center;
            line-height: 40px;
            background:rgba(230,241,252,1);
            border:1px solid rgba(96,178,255,1);
        }
        .el-submenu > div {
            height: 64px!important;
            line-height: 64px!important;
            &:hover{
                background:#fff!important;
            }
        }
        .el-submenu.is-active >div{
            border-bottom: 5px solid #409EFF!important;
        }
    }
  }
// @media (min-width: 750px) and (max-width: 1100px) {
//     .main-nav{
//         .el-menu-horizontal{
//             .el-menu-item{
//                 height: 60px;
//                 line-height: 60px;
//                 font-size: 12px;
//                 padding: 0 8px;
//                 .icon_img{
//                     width: 18px;
//                 }
//                 .red{
//                     left: 27%;
//                     line-height: 90px;
//                 }
//             }
//             .el-submenu__title{
//                 font-size: 12px;
//                 padding: 0 8px;
//             }
//             .el-submenu > div {
//                 height: 60px!important;
//                 line-height: 60px!important;
//                 &:hover{
//                     background:#fff!important;
//                 }
//             }
//             .user{
//                 width:30px;
//                 height:30px;
//                 font-size:12px;
//                 line-height: 28px;
//             }
//         }
//     }
// }
// @media (max-width: 750px) {
//     .main-nav{
//         .el-menu-horizontal{
//             .el-menu-item{
//                 height: 60px;
//                 line-height: 60px;
//                 font-size: 12px;
//                 padding: 0 5px;
//                 .icon_img{
//                     display: none;
//                     width: 16px;
//                 }
//                 .red{
//                     left: 7%;
//                     line-height: 90px;
//                 }
//             }
//             .el-submenu__title{
//                 font-size: 12px;
//                 padding: 0 5px;
//             }
//             .el-submenu > div {
//                 height: 60px!important;
//                 line-height: 60px!important;
//                 &:hover{
//                     background:#fff!important;
//                 }
//             }
//             .user{
//                 display: none;
//                 width:20px;
//                 height:20px;
//             }
//         }
//     }
// }

</style>
