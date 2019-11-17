<template>
    <div class="login_page">
        <h1 class="title">项目管理系统</h1>
        <h2 class="step_tt">验证手机以开始</h2>

        <div class="form">
            <div class="item clearfix">
                <el-select v-model="code" style="width: 80px;float:left" class="right_border">
                    <el-option
                        v-for="item in codeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="mobile" placeholder="你的手机号" style="width: 300px;float:left"></el-input>
            </div>
            <div class="item clearfix">
                <el-input v-model="mobile" placeholder="验证码" style="width: 298px;float:left" class="right_border"></el-input>
                <el-link :underline="false" class="getOtp">获取验证码</el-link>
            </div>
            <div class="btn_wrap">
                <el-button type="info">即刻开始</el-button>
            </div>
            <div class="btn_link_wrap clearfix">
                <el-link type="primary" :underline="false">账号密码登录</el-link>
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
                line-height: 40px;
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

