<template>
  <div class="login-main">
        <div class="form">
            <div class="title">
                <img src="../../assets/img/logo.png" alt="" class="logo">
                <p class="dis">健康小屋（静安寺店）<br>管理后台</p>
            </div>
            
            
            <el-form :model="ruleForm" ref="ruleForm" label-width="0" class="demo-ruleForm">
                <el-form-item prop="pass">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="账户"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input :type="show ? 'password' : 'text'" v-model="ruleForm.pwd" autocomplete="off" placeholder="密码">
                        <i
                            class="el-icon-view"
                            slot="suffix"
                            @click="handleIconClick">
                        </i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;margin-top:20px" :disabled="!ruleForm.name || !ruleForm.pwd">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <p class="footer">CopyRight&#169China Pacific Insurance(group) Co.,Ltd.. All Rights Reserved</p>
  </div>
</template>

<script>

export default {
    name: 'Login',
    data () {
        return {
            show: true,
            ruleForm: {
                name: '',
                pwd: ''
            }
        };
    },
    computed: {},
    methods: {
        handleIconClick() {
            this.show = !this.show;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
                this.$router.push({name: 'home_index'})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    components: { },
}
</script>
<style lang="scss">
    .login-main{
        position: relative;
        width: 100%;
        height: 100%;
        background: #072671 url('../../assets/images/login_bg.png') top center no-repeat;
        background-size: 100% 100%;
        padding-bottom: 80px;
        .title{
            display: flex;
            padding-bottom: 30px;
            align-items: center;
            .logo{
                width: 80px;
                height: 80px;
                margin-right: 20px;
            }
            .dis{
                font-weight: bold;
                font-size: 24px;
                line-height: 1.4;
                text-align: left;
            }
        }
        .form{
            position: absolute;
            width:400px;
            height:400px;
            background:rgba(255,255,255,1);
            border-radius:6px;
            padding: 30px;
            top:50%;
            left:50%;
            margin-left: -215px;
            margin-top: -220px;
            overflow: hidden;
            text-align: center;
            z-index: 55;
        }
        .footer{
            position: absolute;
            bottom:24px;
            left:0;
            right:0;
            font-size:12px;
            color:rgba(192,196,204,1);
            line-height:17px;
            text-align: center;
        }
    }
</style>
