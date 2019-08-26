<template>
    <div class="baogao_tab baogao_tab2">
         <wv-group class="list">
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
            <wv-cell title="标题文字" is-link to="/">
                <icon name="khxx_icon_bz" scale="2" class="file_icon" slot="icon"></icon>
                <span class="val" slot="bd">定期人寿 1000</span>
                <span class="ft" slot="ft">2019-06-18 16:20</span>
            </wv-cell>
        </wv-group>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'my_customer',
    data() {
        return {
            tabs: [
                {
                    key: 'baogao',
                    val: '历次检测报告'
                }, {
                    key: 'beizhu',
                    val: '开单备注'
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
        jump(index, tab) {
            this.$router.push({
                path: `/customer/baogao/tab${index+1}`
            })
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.baogao_tab.baogao_tab2 .list{
    border-top: 0;
    .weui-cells::before{
        display: none;
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