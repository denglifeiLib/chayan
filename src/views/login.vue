<template>
    <div class="login_page">
        <h1 class="title">项目管理系统</h1>
        <h2 class="step_tt">登录账号，继续使用</h2>

        <div class="form">
            <div class="item">
                <el-input v-model="mobile" placeholder="你的手机号" style="width: 380px;"></el-input>
            </div>
            <div class="item clearfix">
                <el-input v-model="password" :type="showPsw?'text':'password'" placeholder="密码" style="width: 390px">
                    <i :class="showPsw ? 'el-icon-date eye_icon' : 'el-icon-view eye_icon'" slot="suffix" @click="showPsw=!showPsw"></i>
                </el-input>
            </div>
            <el-link type="primary" :underline="false">忘记密码</el-link>
            <div class="btn_wrap">
                <el-button type="info">登录</el-button>
            </div>
            <div class="btn_link_wrap clearfix">
                <el-link type="primary" :underline="false">验证码登录</el-link>
                <el-link type="primary" :underline="false" style="margin-left:30px">注册</el-link>
                <el-link type="primary" :underline="false" style="float:right">微信登录</el-link>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "project_all",
    data() {
        return {
           code: '86',
           mobile: '',
           password: '',
           showPsw: false,
           codeOptions: [
               {
                   label: '+ 86',
                   value: '86'
               }
           ]

        }
    },
    props: {

    },
    methods: {
       
    }
};
</script>
<style lang="scss">
.login_page{
    width: 400px;
    margin: 10% auto 0;
    .title{
        padding-bottom: 20%;
        font-size:48px;
        font-weight:500;
        color:rgba(51,51,51,1);
        text-align: center;
    }
    .step_tt{
        padding-bottom: 42px;
        font-size:24px;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .form{
        .item{
            margin-bottom: 20px;
            border:1px solid rgba(178,178,178,1);
            border-radius:4px;
            clear: both;
            line-height: 40px;
            .el-input__inner{
                border: 0;
            }
            .right_border{
                position: relative;
                &:after{
                    position: absolute;
                    content: ' ';
                    width: 1px;
                    top: 9px;
                    bottom: 9px;
                    right: 0;
                    background: rgba(178,178,178,1);
                }
            }
            .getOtp{
                width: 100px;
                float:left;
            }
            .eye_icon{
                vertical-align: middle;
                font-size:22px;
            }
        }
        .btn_wrap .el-button{
            margin-top: 20px;
            width: 100%;
        }
        .btn_link_wrap{
            margin-top: 30px;
        }
    }
}
</style>

