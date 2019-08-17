<template>
  <div id="app">
    <wv-header :title="header_title" :fixed="true" background-color="#ffffff" v-if="header_show">
        <div class="btn-back" slot="left">
            <i class="iconfont icon-back" @click="$router.push('/')"></i>
        </div>
        <div class="btn-menu" slot="right">
            <i class="iconfont icon-menu" @click="$router.push('/')"></i>
        </div>
    </wv-header>
    <router-view v-on:header="header"/>
  </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            header_show: true,
            header_title: ''
        }
    },
    methods:{
        //是否显示头部
        header(opt) {
            this.header_show = opt.show;
            this.header_title = opt.title
        },
        //是否显示底部
        footer(bool) {
         this.footer_show = bool;
        }
    }
};
</script>
<style lang="less">
#app {
    .wv-header{
        .wv-header-title{
            color: #000;
            font-size: 18px;
        }   
    }
}
</style>

