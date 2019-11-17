<template>
    <div class="set_content">
        <top-header :hideSearch="true"></top-header>
        <div class="set_main">
            <div class="menue">
                <div class="per_info">
                    <img :src="header" alt="" class="header_img" slot="reference">
                    <span class="name"><span>昵称</span></span>
                </div>
                <ul class="router">
                    <li :class="activekey===k ? 'active':''" @click="$router.push({name: item.router});activekey=k;" v-for="(item,k) in pages" :key="k">{{item.name}}</li>
                </ul>
            </div>
            <div class="container">
                <div class="bread_top">{{pages[activekey].name}}</div>
                <router-view @changePage="changePage"/>
            </div>
        </div>
    </div>

</template>

<script>
import * as Axios from '@/utils/Action';
import topHeader from '@/components/topHeader.vue';

export default {
    name: 'layout',
    data() {
        return {
            activekey: 0,
            header: require('@/assets/images/header.png'),
            pages: [
                {
                    router: 'personal_info',
                    name: '个人信息'
                }, {
                    router: 'account_pwd',
                    name: '账号密码'
                }, {
                    router: 'other_platform',
                    name: '第三方账号'
                }
            ]
        }
    },
    methods: {
        changePage (val) {
            this.pages.forEach((item,index)=> {
                if(item.router===val) {
                    this.activekey = index;
                }
            })
        },
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    },
    components: { topHeader }
    
}
</script>

<style lang="scss">
    .set_content{
        height: 100%;
        background: #F7F7F7;
    }
    

    
    
    .set_main{
        width:1000px;
        padding-top: 30px;
        height: calc(100% - 50px);
        margin: 0 auto;
        .menue{
            float: left;
            width: 300px;
            .header_img{
                width: 60px;
                height: 60px;
            }
            .per_info,.router li{
                padding: 22px 30px;
                background: #fff;
            }
            .per_info,.router{
                box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.1);
                margin-bottom: 20px;
            }
            .router li{
                cursor: pointer;
                border-bottom: solid 1px #E6E6E6;
                &.active{
                    font-weight: bold;
                }
            }
            .per_info{
                height: 104px;
                line-height: 60px;
                img{
                    float: left;
                    vertical-align: middle;
                }
            }
            .name{
                font-size:18px;
                font-weight:500;
                color: #333;
                padding-left: 26px;
                vertical-align: middle;
                span{line-height: 1.4;}
            }
        }
        

        .container{
            margin-left: 320px;
            padding: 30px;
            background: #fff;
            box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.1);
            .bread_top{
                font-size:18px;
                font-weight:bold;
            }
        }
    }

</style>