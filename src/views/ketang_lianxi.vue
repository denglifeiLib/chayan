<template>
    <div class="ketang_lianxi">
        <wv-progress :percent="process" :show-clear="false"/>
         <p class="question_c">第一节 为什么许多营销伙伴都叫云镜为魔镜？</p>
         <div class="qa_card">
             <h4>为什么许多营销伙伴都叫云镜为魔镜？</h4>
             <ul class="answers">
                 <li v-for="(item,k) in answers" :key="k" @click="check(item)" :class="!checked && selectedAnswer===item.key && (item.isRgiht ? 'true' : 'false')">
                     <span>{{item.key}}</span>
                     <p>{{item.content}}</p>
                 </li>
             </ul>

             <dl class="show_result_as" v-show="selectedAnswer && selectedAnswer!==rightVal">
                 <dt>正确答案：<span class="blue">{{rightVal}}</span></dt>
                 <dd>解析：XXXXXXX</dd>
             </dl>
             <div class="fix_bottom_btn" v-if="selectedAnswer">
                <wv-button type="warn" :plain="true" v-if="selectedAnswer!==rightVal" @click="jump('false')">回答错误，下一题</wv-button>
                <wv-button type="primary" :plain="true" v-else @click="jump('true')">回答正确，下一题</wv-button>
            </div>
         </div>
        <!-- <div class="fix_bottom_btn">
            <wv-button type="primary" class="weui-btn_blue ">再次检测</wv-button>
        </div> -->
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'baogao',
    data() {
        return {
            process: "50",
            answers: [
                {
                    key: 'A',
                    content: '许多业务伙伴能持续的开单是因为有客户基础以及转介绍来源',
                    isRgiht: true,
                },{
                    key: 'B',
                    content: '中医智能云镜可以轻松完成获客，邀约，客户管理，有效帮助签单，因为云镜做到了携带轻便，快速中医诊断，养生调养方法，持续健康管理一系列功能',
                    isRgiht: false,
                },{
                    key: 'C',
                    content: '云镜好棒棒',
                    isRgiht: false,
                }
            ],
            selectedAnswer: '',
            rightVal: 'A',
            checked: false //是否已经回答了
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '练习'
        });
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
        },
        check(item) {
            this.sendRequest();
            this.selectedAnswer = item.key;
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.ketang_lianxi{
    min-height: 100%;
    height: 100%;
    padding-bottom: 75px;
    background: #f9fafc;
    .question_c{
        padding: 20px 15px 16px;
        font-size:14px;
        font-weight:400;
        color:rgba(168,168,168,1);
    }
    .qa_card{
        position: relative;
        height: 100%;
        margin: 0 15px;
        padding: 0 15px 26px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 10px 0px rgba(29,119,222,0.2);
        border-radius:4px;
        h4{
            padding: 24px 0;
           font-size:18px;
            font-weight:500;
            color:rgba(20,20,20,1); 
        }
        .answers{
            li {
                display: flex;
                align-items: center;
                padding: 15px 24px 15px 20px;
                margin-bottom: 8px;
                background:rgba(249,250,252,1);
                border-radius:2px;
                span{
                    padding-right: 18px;
                    font-size:18px;
                    font-weight:500;
                    color:rgba(29,119,222,1);
                }
                p{
                    font-size:14px;
                    color:rgba(20,20,20,1);
                }
                &.true{
                    span,p{
                        color: #019522;
                    }
                }
                &.false{
                    span,p{
                        color: #EA1818;
                    }
                }
            }
        }
        .show_result_as{
            margin-top: 16px;
            padding-left: 20px;
            dd{
                margin-top: 6px;
                font-size:13px;
                color:rgba(51,51,51,1);
            }
        }
        .fix_bottom_btn{
            position: absolute;
        }
    }
}

</style>