<template>
  <div id="app" class="app">
    <wv-header :title="header_title" :fixed="true" :background-color="headerColor" v-if="header_show" :class="`${headerType||''} ${headerClass}`">
        <div class="out_back" slot="left" @click="backAction" v-if="back">
            <icon :name="['black', 'blue'].indexOf(headerType)>-1 ? 'bar_icon_bs':'back'" scale="2.5" class="tab_icon"></icon>
        </div>
        <div class="btn-menu" slot="right" v-html="right" @click="right_callback($event)"></div>
        <div class="btn-menu" @click="right_callback($event)" slot="right">
            <icon name="sq_icon_more" scale="0.5" v-if="headerClass==='more'"></icon>
        </div>
        
    </wv-header>
    <router-view v-on:header="header" @tabbar="tabbar"/>
    <wv-tabbar :fixed="true" v-if="tabbar_show">
        <wv-tabbar-item to="/index" :is-on="tabbar_active === 0">
            <span slot="icon" style="display: inline-block; position: relative;">
                <icon :name="tabbar_active === 0 ? 'tab_icon_1_s':'tab_icon_1_n'" scale="3.5" class="tab_icon"></icon>
            </span>
            首页
        </wv-tabbar-item>
        <wv-tabbar-item to="/bang" :is-on="tabbar_active === 1">
            <span slot="icon" style="display: inline-block; position: relative;">
                <icon :name="tabbar_active === 1 ? 'tab_icon_2_s':'tab_icon_2_n'" scale="3.5" class="tab_icon"></icon>
            </span>
            榜单
        </wv-tabbar-item>
        <wv-tabbar-item to="/msg" :is-on="tabbar_active === 2">
            <span slot="icon" style="display: inline-block; position: relative;">
                <icon :name="tabbar_active === 2 ? 'tab_icon_3_s':'tab_icon_3_n'" scale="3.5" class="tab_icon"></icon>
                <wv-badge style="position: absolute;top:4px;right: 8px;" :is-dot="true"></wv-badge>
            </span>
            消息
        </wv-tabbar-item>
        <wv-tabbar-item to="/my" :is-on="tabbar_active === 3">
            <span slot="icon" style="display: inline-block; position: relative;">
                <icon :name="tabbar_active === 3 ? 'tab_icon_4_s':'tab_icon_4_n'" scale="3.5" class="tab_icon"></icon>
            </span>
            我的
        </wv-tabbar-item>
    </wv-tabbar>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
    name: "App",
    data() {
        return {
            header_show: true,
            header_title: '',
            tabbar_show: false,
            tabbar_active: 0,
            right: '',
            right_callback: ()=>{},
            back: true,
            headerColor: '#fff',
            headerType: 'white',
            headerClass: '',
            backAction: ()=>{this.$router.go(-1)},
            cusHeadOpt: {},
            cusTabOpt: {}
        }
    },
    watch: {
        '$route.path': function() {
            this.header(this.cusHeadOpt);
            this.tabbar();
        }
    },
    methods:{
        //是否显示头部
        header(opt) {
            this.cusHeadOpt = opt;
            const initOpt = {
                show: true,
                title: '',
                right: '',
                back: true,
                headerClass: '',
                headerType: 'white',//'blue' 'black'
                right_callback: ()=>{},
                backAction: ()=>{this.$router.go(-1)}
            }
            const lastOpt = Object.assign({}, initOpt, opt);
            this.header_show = lastOpt.show;
            this.header_title = lastOpt.title;
            this.headerType = lastOpt.type;
            this.headerColor = lastOpt.type === 'blue' ? '#1D77DE' : lastOpt.type === 'black' ? '#1E1E20' :'#ffffff' ;
            this.right = lastOpt.right;
            this.headerClass = lastOpt.headerClass;
            if(lastOpt.back==='0'){
                this.back = false
            } else {
                this.back = true
            };
            if(lastOpt.right_callback){
                this.right_callback = lastOpt.right_callback
            };
            if(lastOpt.backAction){
                this.backAction = lastOpt.backAction
            };
        },
        //是否显示底部
        tabbar(opt) {
            this.cusTabOpt = opt;
            const initOpt = {
                show: false,
                active: 0
            }
            const lastOpt = Object.assign({}, initOpt, opt);
            this.tabbar_show = lastOpt.show;
            this.tabbar_active = lastOpt.active;
            
        }
    },
    components: {Icon}
};
</script>
<style lang="less">
.app {
    min-height: 100%;
    // height: 100%;
    .wv-header{
        padding: 0 20px;
        justify-content: center;
        .wv-header-title{
            color: #000;
            font-size: 18px;
            max-width: 70%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
        }
        &.blue,&.black{
            .wv-header-title{
                color: #fff;
                
            }
        }
        .out_back{
            display: flex;
            align-items: center;
        }
    }
    .weui-tabbar{
        background: #fff;
    }
    .weui-tabbar__label{
        line-height: 1.4;
        padding-bottom: 3px;
    }
    .weui-tabbar__item{
        padding-top: 3px;
    }
    .weui-badge_dot{
        padding:.3em
    }
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
        color:#1D77DE;
    }
    .wv-header-btn.left{
        display: flex;
        position: absolute;
        top:0;
        left: 20px;
        bottom: 0;
        align-items: center;
        .out_back{
            margin-left: -6px;
        }
    }
    .wv-header-btn.right{
        display: flex;
        position: absolute;
        top:0;
        right: 20px;
        bottom: 0;
        align-items: center;
    }
}
</style>

