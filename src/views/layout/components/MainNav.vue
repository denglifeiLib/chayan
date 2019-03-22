<template>
  <div class="main-nav">
      <el-menu 
        :default-active="activeMenu" 
        class="el-menu-horizontal" 
        mode="horizontal"
        :router="true"
        :collapse="isCollapse"
        background-color="#fff"
        text-color="#303133"
        active-text-color="#409EFF">
            <el-menu-item index="/home">
                <img src="@/assets/images/Settings-1.png" alt="">察言启动器
                <span class="red">（未安装）</span>
            </el-menu-item>
            <el-menu-item index="/monitor">
                <img src="@/assets/images/Settings-2.png" alt="">我的监控
                <MsgNum :isRead="false" num="19"/>
            </el-menu-item>
            <el-menu-item index="/clew">
                <img src="@/assets/images/Settings-3.png" alt="">我的线索
                <MsgNum :isRead="true" num="99"/>
            </el-menu-item>
            <el-menu-item index="/workflow">
                <img src="@/assets/images/Settings-4.png" alt="">工作流管理
                <MsgNum :isRead="true" num="16"/>
            </el-menu-item>
            <el-submenu index="/">
                <template slot="title"><span class="user" style="backgroundImage:url(@/assets/images/Settings-3.png)"></span>账户管理</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-menu>
  </div>
</template>

<script>
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
    components: {
        MsgNum
    },
}
</script>
<style lang="scss">
.main-nav{
    width: 810px;
  .el-menu-horizontal{
        border-right: 0;
        .el-menu-item{
            position: relative;
            height: 96px;
            line-height: 96px;
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
        .el-menu-item.is-active{
            border-bottom: 5px solid #409EFF!important;
        }
        .user{
            display: inline-block;
            width:42px;
            height:42px;
            margin-right: 8px;
            border-radius: 50%;
            background:rgba(230,241,252,1);
            border:1px solid rgba(96,178,255,1);
        }
        .el-submenu > div {
            height: 96px!important;
            line-height: 96px!important;
            &:hover{
                background:#fff!important;
            }
        }
        .el-submenu.is-active >div{
            border-bottom: 5px solid #409EFF!important;
        }
    }
  }
</style>
