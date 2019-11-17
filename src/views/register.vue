<template>
    <div class="login_page">
        <h1 class="title">项目管理系统</h1>
        <h2 class="step_tt">设置账号信息</h2>

        <div class="form">
            <div class="item">
                <el-input v-model="name" placeholder="你的称呼" style="width: 380px;"></el-input>
            </div>
            <div class="item clearfix">
                <el-input v-model="password" :type="showPsw?'text':'password'" placeholder="密码" style="width: 390px">
                    <i :class="showPsw ? 'el-icon-date eye_icon' : 'el-icon-view eye_icon'" slot="suffix" @click="showPsw=!showPsw"></i>
                </el-input>
            </div>
            <div class="btn_wrap">
                <el-button type="info">开始使用</el-button>
            </div>
            <div class="contract">
                <el-checkbox v-model="checked"></el-checkbox>
                <span class="txt">我已阅读并同意<el-link type="primary" :underline="false">《服务条款》</el-link>与<el-link type="primary" :underline="false">《隐私条款》</el-link></span> 
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "project_all",
    data() {
        return {
           name: '',
           password: '',
           showPsw: false,
           checked: false,
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
        .contract{
            margin-top: 20px;
            .txt{
                margin-left: 20px;
                font-size:14px;
                color: #999;
            }
            
        }
    }
}
</style>

