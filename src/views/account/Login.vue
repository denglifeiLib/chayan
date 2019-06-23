<template>
  <div class="login-main">
        <div class="form">
            <img src="../../assets/images/login_logo.png" alt="" class="logo">
            <p class="dis">互联网数据看板</p>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                <el-form-item prop="pass">
                    <el-input type="text" v-model="ruleForm.pass" autocomplete="off" placeholder="账户">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="密码">
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="type" style="text-align: left">
                    <el-checkbox v-model="ruleForm.type">自动登录</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">登 录</el-button>
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入账户'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            callback();
            }
        };
        
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
                type: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    computed: {},
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
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
        .form{
            position: absolute;
            width:430px;
            height:439px;
            background:rgba(255,255,255,1);
            border-radius:6px;
            padding: 40px 64px 0;
            top:50%;
            left:50%;
            margin-left: -215px;
            margin-top: -220px;
            overflow: hidden;
            text-align: center;
            z-index: 55;
            .dis{
                padding: 35px 0 32px;
                letter-spacing:20px;
                font-size:14px;
                color:rgba(96,98,102,1);
                
            }
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
