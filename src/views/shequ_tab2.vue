<template>
    <div class="shequ">

    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ2',
    data() {
        return {
            hots: [
                {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
                }, {
                    header: require('@/assets/images/header.jpg'),
                    name: '锺嫱嫱',
                    title: '如何面谈三人或多人的客户',
                    content:  '有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千有时面谈在客户的办公室会遇上客户的访客，这时就变成了三人或多人，那此时千万不要',
                    support: '10K'
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