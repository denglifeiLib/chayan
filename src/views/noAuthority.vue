<template>
    <div class="entry_page no_authority_page">
        <empty img="suo" text="暂无权限访问"></empty>
    </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import Empty from '@/components/Empty';

export default {
    name: 'faq',
    data() {
        return {
            valueText: ''
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '无权访问',
            backAction: ()=>{
                this.$router.push('/index')
            }
        });
    },
    methods: {
    },
    components: {Icon, Empty}
}
</script>

<style lang="less">
.no_authority_page{
    .empty{
        padding-top: 30vh;
    }
}
</style>