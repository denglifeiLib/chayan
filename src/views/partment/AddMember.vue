<template>
<div class="add_member_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            部门分级设置<span class="subtitle">{{params.type === 'ADD' ? '新增成员' : '编辑成员'}}</span>
            <el-button @click="$router.go(-1)" class="fr" size="mini">返回</el-button>
        </h3>

        <el-row :gutter="20" type="flex" class="form_cont"  justify="center">
            <el-col :lg="12" :md="16" :sm="18" :xs="24">
                <el-form ref="form" :model="form" label-width="120px" >
                    <el-form-item label="部门名称：">
                        <el-input v-model="form.name" readonly disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工号">
                        <el-input v-model="form.code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.pwd" type="password" clearable></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 120px">
                        <el-button type="primary" @click="save">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'add_member_page',
    data() {
        return {
            params: this.$route.query || {},
            form: {
                name: '江苏分公司',
                code: '',
                pwd: ''
            }
        }
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
        },
        
        save() {
            console.log(save)
        }
    }
}
</script>

<style lang="scss" scoped>
.add_member_page{
    .form_cont{
        padding-top: 40px;
    }
}

</style>