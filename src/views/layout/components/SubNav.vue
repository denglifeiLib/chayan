<template>
    <el-menu 
        class="el-menu-vertical-demo" 
        :default-active="activeSubMenu" 
        :collapse="isCollapse"
        :router="true"
        background-color="#3E4760"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item :index="item.pathName" v-for="(item, index) in submenu" :key="index">
            <!-- <img :src="item.icon" alt=""> -->
            <icon :name="item.icon" scale="2.5" class="subMenuIcon"></icon>
            <span slot="title">{{item.title}}<img src="@/assets/images/pro.png" alt="" class="pro_img" v-if="item.hasPro"></span>
        </el-menu-item>
    </el-menu>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
    name: 'SubNav',
    data () {
        return {
            activeMainMenu: (this.$route.path.split('/')[1]||'home'),
            activeSubMenu: '',
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
        }
    },
    created() {
        this.submenu = this.submenuAll[this.activeMainMenu];
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
                this.submenu = this.submenuAll[this.activeMainMenu];
                this.activeSubMenu = this.$route.path.split('/')[2] || this.submenuAll[this.activeMainMenu][0].pathName;
            },
            deep: true
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$emit('changeMenu', key);
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
        .pro_img{
            padding-left: 10px;
            margin-top: -12px;
        }
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
        }
  }
  
</style>
