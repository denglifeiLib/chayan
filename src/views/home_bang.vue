<template>
    <div class="entry_page bang_page">
        <wv-tabs :line-width="18" sticky  @click="onClick">
            <wv-tab v-for="(item,k) in tabs" :title="item.val" :key="k"></wv-tab>
        </wv-tabs>
        <range_table :rows="activeIndex===0 ?rows1 : rows2" :column="activeIndex===0 ?column1:column2"></range_table>
    </div>
</template>

<script>

import Range_table from '@/components/Range_table';
import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'test',
    data() {
        return {
            tabs: [
                {
                    key: 'baogao',
                    val: '检测榜'
                }, {
                    key: 'beizhu',
                    val: '学习榜'
                }
            ],
            column1: [
                {
                    key: 'range',
                    title: '排名',
                    width: '20%'
                }, {
                    key: 'name',
                    title: '业务员',
                    width: '40%'
                }, {
                    key: 'result',
                    title: '本周检测次数',
                    width: '40%'
                }
            ],
            column2: [
                {
                    key: 'range',
                    title: '排名',
                    width: '20%'
                }, {
                    key: 'name',
                    title: '业务员',
                    width: '40%'
                }, {
                    key: 'result',
                    title: '完成百分比',
                    width: '40%'
                }
            ],
            rows1: [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                },{
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '2123'
                }, {
                    range: '55',
                    header: require('@/assets/images/header.jpg'),
                    name: '本人',
                    office: '河南分公司',
                    result: '2123'
                }
            ],
            rows2: [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '100%'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '100%'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '100%'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '99%'
                },{
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '78%'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '75%'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '74%'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '钱冬冬',
                    office: '河南分公司',
                    result: '66%'
                }, {
                    range: '55',
                    header: require('@/assets/images/header.jpg'),
                    name: '本人',
                    office: '河南分公司',
                    result: '55%'
                }
            ],
            activeIndex: 0
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '榜单',
            back: '0'
        });
        this.$emit('tabbar', {
            show: true,
            active: 1
        });
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        onClick(k) {
            this.activeIndex = k;
        }
    },
    components: {Icon, Range_table}
}
</script>

<style lang="less">
.bang_page{
    .wv-tabs__nav{
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        &.wv-tabs__nav--line{
            height: auto;
        }
    }
    .range_table {
        margin-top: 44px;
        padding-bottom: 60px;
        thead tr{
            width: 100%;
            position: fixed;
            top: 115px;
            left: 0;
            right: 0;
        }
        tbody tr.self{
            width: 100%;
            position: fixed;
            bottom: 54px;
            left: 0;
            right: 0;
            td{
                display: inline-block;
                height: 60px;
            }
            td:nth-child(1),td:nth-child(3){
                line-height: 40px;
            }
        }
        tr{
            display: flex;
            align-items: center;
            justify-content: space-between;
            td:nth-child(1){
                width: 20%;
            }
            td:nth-child(2){
                padding-left: 20px;
                width: 40%;
            }
            td:nth-child(3){
                width: 40%;
            }
        }
    }

}
</style>