<template>
    <div class="ketang_lianxi_result">
         <div class="chapters_tt">
              第一章 云镜功用篇 <br> 第一节 为什么许多营销伙伴都叫云镜为魔镜？
         </div>
         <img :src="resultInfo.img" alt="" class="result_img">
         <p class="result_tt">{{resultInfo.title}}</p>
         <p class="result_dis">{{resultInfo.dis}}</p>

         <dl class="err_list" v-if="!isPass">
             <dt>错题清单</dt>
             <dd>1、请问如何打开云镜</dd>
             <dd>2、请问如何打开云镜</dd>
         </dl>
         <div class="fix_bottom_btn" v-if="isPass">
            <wv-button type="primary" class="weui-btn_blue" @click="$router.push({name: 'ketang_detail', query:{title: '第一章 云镜功用篇'}})">继续学习</wv-button>
        </div>
        <div class="fix_bottom_btn" v-else>
            <wv-flex :gutter="15">
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_plain-blue" :plain="true" @click="$router.push({name: 'ketang_lianxi', query:{}})">重新测试</wv-button>
                </wv-flex-item>
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_blue" @click="$router.push({name: 'ketang_detail', query:{title: '第一章 云镜功用篇'}})">继续学习</wv-button>
                </wv-flex-item>
            </wv-flex>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'baogao',
    data() {
        return {
            passInfo: {
                img: require('@/assets/images/lx_bg_tg@2x.png'),
                title: '恭喜你通过测验',
                dis: '本次测验正确率100%'
            },
            unPassInfo: {
                img: require('@/assets/images/lx_bg_mtg@2x.png'),
                title: '抱歉，您未通过测试',
                dis: '本次测验正确率30%'
            },
            isPass: false,
            resultInfo: this.passInfo
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '练习'
        });
        this.isPass = this.$route.query.result === 'true';
        this.resultInfo = this.isPass ?this.passInfo : this.unPassInfo;
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(val) {
            this.$router.replace({
                path: `/ketang_lianxi_result`,
                query: {
                    result: val
                }
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.ketang_lianxi_result{
    text-align: center;
    margin: 0 30px;
    .chapters_tt{
        margin-top: 25px;
        padding: 10px 15px;
        background:rgba(245,249,255,1);
        border-radius:2px;
        font-size:13px;
        color:rgba(29,119,222,1);
    }
    .result_img{
        width: 76.8%;
        margin: 21px auto 32px;
    }
    .result_tt{
        margin-bottom: 8px;
        font-size:20px;
        font-weight:500;
        color:rgba(20,20,20,1);
    }
    .result_dis{
        font-size:13px;
        color:rgba(168,168,168,1);
    }
    .err_list{
        padding-top: 53px;
        text-align: left;
        font-weight: 400;
        font-size:14px;
        color:rgba(113,113,113,1);
        dd{
            margin-top: 8px;
        }
    }
}

</style>