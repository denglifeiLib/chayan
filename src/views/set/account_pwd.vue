<template>
    <div class="account_pwd_page">
         <div class="form_item">
             <div class="label">旧密码</div>
             <div class="form_bd">
                 <el-input type="password" v-model="oldPassword" clearable></el-input>
             </div>
         </div>
         <div class="form_item">
             <div class="label">新密码</div>
             <div class="form_bd">
                 <el-input type="password" v-model="newPassword" clearable></el-input>
             </div>
         </div>
         <div class="form_item">
             <div class="label">重复新密码</div>
             <div class="form_bd">
                 <el-input type="password" v-model="newPassword2" clearable></el-input>
             </div>
         </div>
         <div class="form_item">
             <div class="label"></div>
             <div class="form_bd">
                <el-button class="btn" type="primary" @click="submitForm">保存</el-button>
             </div>
         </div>
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
export default {
    name: 'test',
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
        }
    },
    beforeCreate() {
        this.$emit('changePage', 'account_pwd')
    },
    methods: {
        submitForm() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    }
}
</script>

<style scoped lang="scss">
   .account_pwd_page{
       padding: 31px 0  48px;
       .form_item{
           margin-bottom: 20px;
           .label{
               float: left;
               line-height: 40px;
               font-size:14px;
                color:rgba(102,102,102,1);
               &.highter{
                   line-height: 60px;
               }
           }
           .form_bd{
               margin-left: 110px;
               width: 325px;
           }
            .btn{
                display: block;
                width: 100%;
                margin-top: 38px;
            }
       }
   }
</style>