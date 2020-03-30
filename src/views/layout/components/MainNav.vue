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
                <icon name="icon_message" scale="2" class="icon_img"></icon>
                系统消息
                <MsgNum :isRead="false" num="16"/>
            </el-menu-item>
            <el-submenu index="/">
                <template slot="title"><span class="user" style="backgroundImage:url(@/assets/images/Settings-3.png)">开渊</span>账户管理</template>
                <el-menu-item index="2-4-1"><div><icon name="icon-test-1" scale="2" class="icon_img"></icon><span style="padding-left:14px;">修改密码</span></div></el-menu-item>
                <el-menu-item index="2-4-4"><icon name="icon-test" scale="2" class="icon_img"></icon><span style="padding-left:14px;">退出账号</span></el-menu-item>
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
        applyModel: {
            type: String,
            default: ''
        },
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

</style>
