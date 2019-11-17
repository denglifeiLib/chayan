<template>
    <div class="personal_info_page">
         <!-- :rules="rules" -->
         <div class="form_item">
             <div class="label highter" >头像</div>
             <div class="form_bd">
                <img :src="ruleForm.header" alt="" class="header_img">
                <span class="upload_btn">
                    上传新封面
                    <input type="file" class="upload_btn" clearable>
                </span>
             </div>
         </div>
         <div class="form_item">
             <div class="label">姓名</div>
             <div class="form_bd">
                 <el-input v-model="ruleForm.name" clearable></el-input>
             </div>
         </div>
         <div class="form_item">
             <div class="label">联系电话</div>
             <div class="form_bd">
                 <el-input v-model="ruleForm.phone" clearable></el-input>
             </div>
         </div>
         <div class="form_item">
             <div class="label">生日</div>
             <div class="form_bd">
                 <el-date-picker
                    v-model="ruleForm.birthDay"
                    align="right"
                    type="date"
                    style="width:325px"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    :picker-options="pickerOptions">
                </el-date-picker>
             </div>
         </div>
         <div class="form_item">
             <div class="label">所在地</div>
             <div class="form_bd">
                 <el-input v-model="ruleForm.address" clearable></el-input>
             </div>
         </div>
         <div class="form_item">
             <div class="label"></div>
             <div class="form_bd">
                <el-button class="btn" type="primary" @click="submitForm('ruleForm')">保存</el-button>
             </div>
         </div>
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
export default {
    name: 'personal_info',
    data() {
        return {
            ruleForm: {
                header: require('@/assets/images/header.png'),
                name: '',
                job: '',
                phone: '',
                address: '',
                birthDay: ''
            },
            
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    beforeCreate() {
        this.$emit('changePage', 'personal_info')
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    }
}
</script>

<style scoped lang="scss">
   .personal_info_page{
       padding: 18px 0  48px;
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
            .header_img{
                width: 60px;
                height: 60px;
                margin-right: 36px;
                vertical-align: middle;
            }
            .upload_btn{
                position: relative;
                display: inline-block;
                width:84px;
                height:36px;
                line-height: 36px;
                border:1px solid rgba(62,144,255,1);
                border-radius:6px;
                font-size:14px;
                color:rgba(62,144,255,1);
                text-align:center;
                vertical-align: middle;
                overflow: hidden;
                input{
                    position: absolute;
                    font-size: 100px;
                    right: 0;
                    top: 0;
                    opacity: 0;
                    text-indent: -500px;
                }
                &:hover {
                    color: #409EFF;
                    // border-color: #c6e2ff;
                    background-color: #ecf5ff
                }
            }
            .btn{
                display: block;
                width: 100%;
                margin-top: 38px;
            }
       }
   }
</style>