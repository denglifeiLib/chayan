<template>
    <el-menu 
        class="el-menu-vertical-demo" 
        :default-active="activeSubMenu" 
        :collapse="isCollapse"
        :router="false"
        background-color="#3E4760"
        text-color="#fff"
        @select="handleSelect"
        active-text-color="#fff">
        <div  v-for="(item, index) in submenu" :key="index">
             <!-- :route="{name: item.pathName}" -->
            <el-menu-item :index="item.pathName"  v-if="!item.children || item.children.lenght === 0">
                <icon :name="item.icon" scale="2.5" class="subMenuIcon"></icon>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu index="sub" v-else>
                <template slot="title">
                    <icon :name="item.icon" scale="2.5" class="subMenuIcon"></icon>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item-group>
                    
                    <!-- <el-menu-item-group> -->
                        <!-- :route="{name: subItem.pathName}" -->
                        <el-menu-item :index="subItem.pathName" v-for="(subItem,i) in item.children" :key="`${index}-${i}`"><span class="sub_menu">{{subItem.title}}</span></el-menu-item>
                    <!-- </el-menu-item-group> -->
                </el-menu-item-group>
            </el-submenu>
        </div>
    </el-menu>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
    name: 'SubNav',
    data () {
        return {
            activeMainMenu: (this.$route.path.split('/')[1]||'home'),
            activeSubMenu: (this.$route.path.split('/')[1]||'home'),
            submenu: [],
            sidebar: {
                opened: true
            }
        };
    },
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        },
        submenuAll: {
            type: Object,
            default: ()=> []
        },
        exData: {
            type: Object,
            default: ()=> {}
        }
    },
    created() {
        this.applyModelMap = {
            reptile: '爬虫服务',
            data_manage: '数据处理',
            data_transfer: '数据传输',
            timed_task: '定时任务',
            weix: '微信服务',
            agent: '代理服务',
        }
        this.submenu = this.submenuAll[this.activeMainMenu] || this.submenuAll['home'];
        this.exData.applyModel = this.applyModelMap[this.activeMainMenu] || ''
    },
    mounted() {
        this.$nextTick(()=> {
            this.activeSubMenu = this.$route.path.split('/')[2] || this.submenuAll[this.activeMainMenu][0].pathName;
        })
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.activeMainMenu = this.$route.path.split('/')[1]||'home';
                this.submenu = this.submenuAll[this.activeMainMenu] || this.submenuAll['home'];
                this.activeSubMenu = this.$route.path.split('/')[2] || this.submenuAll[this.activeMainMenu][0].pathName;

                this.exData.applyModel = this.applyModelMap[this.activeMainMenu] || ''
            },
            deep: true
        }
    },
    methods: {
      handleSelect(key, keyPath) {
          console.log(22222, key, keyPath)
          this.$router.push({name: key})
        // this.$emit('changeMenu', key);
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
    components: {Icon},
}
</script>
<style lang="scss" scoped>
    .el-menu{
        border-right: 0;
        // .pro_img{
        //     padding-left: 10px;
        //     margin-top: -12px;
        // }
    }
   .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 256px;
        min-height: 100%;
  }
  .el-menu-vertical-demo{
        .el-menu{
            border-right: 0;
        }
        .el-menu-item.is-active{
            background:#409EFF!important;
        }
        .subMenuIcon{
            margin-right: 10px;
            vertical-align: middle;
        }
  }
  .el-menu-item-group__title>span{
      font-size: 14px;
    //   line-height: 56px;
      color: #fff;
  }
  .sub_menu{
      padding-left: 35px;
  }
  
</style>
