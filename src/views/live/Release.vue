<template>
<div class="release_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            直播管理<span class="subtitle">发布直播</span>
            <el-button @click="$router.push({name: 'live_list'})" class="fr" size="mini">返回</el-button>
        </h3>

        <el-row :gutter="20" type="flex" class="form_cont"  justify="center">
            <el-col :lg="12" :md="16" :sm="18" :xs="24">
                <img src="../../assets/images/default.jpg" alt="" class="banner  mt25">
                <p class="title line2">直击疫情--太保16款长期疾病保险产品责任扩展说明</p>
                <p class="address line2">直播地址为：http:XXXXXXXXXXXXXXXXXX</p>
            </el-col>
        </el-row>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'base_info_page',
    data() {
        return {}
    },
    created() {
        this._query();
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                
            }, 500);
            console.log('发送请求', this.searchForm);
        }
    }
}
</script>

<style lang="scss" scoped>
.release_page p{
    padding-top: 20px;
    color: #000;
    font-size: 16px;
}

</style>