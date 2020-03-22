<template>
    <div class="view_introduce_page">
        <!-- tab content -->
        <div class="card_wrapper">
            <h3 class="card_title">
                图文介绍配置
                <el-button type="primary" class="fr" size="mini" @click="toggleEdit">{{editing ? '保存' : "编辑"}}</el-button>
            </h3>
            <div class="cont_wrap">
                <editor :content="content" ref="edit" v-if="editing"></editor>
                <div class="show" v-html="content" v-if="!editing"></div>
            </div>
        </div>
    </div>
</template>

<script>

import Editor from "@/components/Editor";

export default {
    name: 'base_user',
    data() {
        return {
            editing: false,
            content:''
        }
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                
                this.content = '<h1>fdsfdfdsf</h1>'
                
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        toggleEdit() {
            if(this.editing) {
                this.editing = false;
                // 获取编辑器内容
                console.log(23232323)
                this.content = this.$refs.edit.getContent();
            } else {
                 this.editing = true;
            }
        },
    },
    created() {
        this._query();
    },
    components: {Editor}
}
</script>

<style lang="scss">
.view_introduce_page{
    width: 100%;
    height: 100%;
    .cont_wrap{
        padding: 25px;
        // max-width: 500px;
        margin: 0 auto;
    }
}
</style>