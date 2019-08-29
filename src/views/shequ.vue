<template>
    <div class="shequ">

        <wv-tabs :line-width="18" @click="jump">
            <wv-tab v-for="(item,k) in tabs" :title="item.val" :key="k">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </wv-tab>
        </wv-tabs>

        <img :src="require('@/assets/images/sq_btn_tw@2x.png')" alt="" class="fixed_qa" @click="$router.push({path: '/shequ_ask_question'})">
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
            title: '社区',
            headerClass: 'shequ_search',
            right_callback: ()=> {
                this.$router.push({name: 'shequ_search'})
            },
            backAction: ()=>{
                this.$router.push({name: 'home_index'})
            }
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
                path: `/shequ/shequ_tab${index+1}`
            });
        }
    },
    components: {Icon}
}
</script>

<style lang="less">

.shequ_search .wv-header-btn.right {
    width: 40px;
    background: url('../assets/images/system-serchb.png') center center no-repeat;
    background-size: 28px 28px;
    .btn-menu{
        width: 100%;
        height: 100%;
        
    }
}

</style>