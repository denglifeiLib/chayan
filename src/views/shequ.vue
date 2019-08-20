<template>
    <div class="shequ">

        <wv-tabs :line-width="18" sticky @click="jump">
            <wv-tab v-for="(item,k) in tabs" :title="item.val" :key="k">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </wv-tab>
        </wv-tabs>

        <img :src="require('@/assets/images/sq_btn_tw@2x.png')" alt="" class="fixed_qa">
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'baogao',
    data() {
        return {
            tabs: [
                {
                    key: 'hot',
                    val: '热门'
                }, {
                    key: 'waiting',
                    val: '等你回答'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '社区'
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
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.shequ{
    min-height: 100%;
    padding-bottom: 90px;
    background: #f9fafc;
}

</style>