<template>
    <div class="baogao_add">
         <wv-group class="no_border customer_title">
            <wv-cell>
                <icon name="default_header" scale="4.5" class="header" slot="icon"></icon>
                <span class="title_val" slot="bd">崔朋朋</span>
            </wv-cell>
        </wv-group>
        <wv-group class="form_wrap">
            <wv-input label="开单险种" placeholder="请输入名称" v-model="type">
                <div slot="ft">
                    <span @click="search"><icon name="system-serchb" scale="2.5"></icon></span>
                    <ul class="search_list" v-if="showSearchList">
                        <li v-for="(item,k) in searchList" :key="k" @click="check(item)">{{item.val}}</li>
                    </ul>
                </div>
            </wv-input>
            <wv-datetime-picker
                ref="picker"
                v-model="time"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
            </wv-datetime-picker>
            <wv-cell title="开单时间" :value="time" is-link @click="openPicker"></wv-cell>
            <!-- <wv-input label="开单时间" placeholder="请输入数字" type="number" v-model="time"></wv-input> -->
            <wv-input label="开单金额" placeholder="请输入开单金额" type="number" v-model="money"></wv-input>
        </wv-group>
        <div class="btm_btn">
            <wv-button type="primary" class="weui-btn_blue" :disabled="disabled">再次检测</wv-button>
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
            type: '23',
            time: '20190-04-45',
            money: '34',
            showSearchList: false,
            pickerVisible: true,
            disabled: true,
            searchList: [
                {
                    key: 'a',
                    val: '什么什么险'
                }, {
                    key: 'b',
                    val: '什么什么险'
                },{
                    key: 'c',
                    val: '什么什么险'
                }, {
                    key: 'd',
                    val: '什么什么险'
                },{
                    key: 'f',
                    val: '什么什么险'
                }, {
                    key: 'e',
                    val: '什么什么险'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '客户信息'
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(index) {
            this.$router.replace({
                path: `/my/customer/baogao/tab${index+1}`
            })
        },
        search() {
            this.showSearchList = true;
        },
        check(item) {
            this.showSearchList = false;
            this.type = item.val;
        },
        openPicker() {
            this.$refs.picker.open();
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.baogao_add{
    min-height: 100%;
    background: #f9fafc;
    .form_wrap{
        position: relative;
        .weui-cells{
            margin-top: 10px;
            overflow:initial;
            .weui-cell{
                height:56px;
            }
        }
        .search_list{
            padding: 8px 8px 30px;
            position: absolute;
            top:56px;
            right: 20px;
            left: 20px;
            z-index: 555;
            text-align: center;
            background: #fff;
            border-radius:2px;
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.3);
            li{
                font-size:14px;
                color:rgba(20,20,20,1);
                line-height:36px;
                border-bottom: solid 1px #EBECF1;
            }
        }
    }
    .btm_btn{
        padding: 32px 30px;
    }
}
.customer_title{
    .weui-cells{
        margin-top: 0;
        .weui-cell{
            height: 72px;
        }
        .header{
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-right: 8px;
        }
        .title_val{
            font-size:18px;
            font-weight:500;
        }
        .btn{
            width: 78px;
            font-size: 12px;
        }
    }
}
</style>