<template>
<div class="change_pwd_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            修改密码
            <el-button @click="$router.go(-1)" class="fr" size="mini">返回</el-button>
        </h3>

        <el-row :gutter="20" type="flex" class="form_cont"  justify="center">
            <el-col :lg="12" :md="16" :sm="18" :xs="24">
                <el-form ref="form" :model="form" label-width="120px" >
                    <el-form-item label="旧密码">
                        <el-input placeholder="请输入密码" v-model="form.password" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input placeholder="请输入新密码" v-model="form.newPassword" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码">
                        <el-input placeholder="请重新输入密码" v-model="form.repeatNewPassword" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item class="mt25">
                        <el-button type="primary" @click="reset">重置</el-button>
                        <el-button type="primary" @click="submit" :disabled="!(form.password && form.newPassword && form.repeatNewPassword)">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'change_pwd_page',
    data() {
        return {
            form: {
                password: '',
                newPassword: '',
                repeatNewPassword: ''
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
                callback && callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        reset() {
            this.form = {
                password: '',
                newPassword: '',
                repeatNewPassword: ''
            }
        },
        submit() {
            this.$confirm('确认修改？').then(_ => {
                this._query(()=> {
                    this.$router.push({name: 'login'})
                });
            }).catch(_=>{})
        }
    }
}
</script>

<style lang="scss" scoped>
.change_pwd_page{
    .form_cont{
        padding-top: 40px;
    }
}

</style>