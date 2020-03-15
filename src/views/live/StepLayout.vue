<template>
<div class="layout_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            直播管理<span class="subtitle">发布直播</span>
            <el-button @click="$router.push({name: 'live_list'})" class="fr" size="mini">返回</el-button>
        </h3>

        <div class="mt25">
            <el-steps :active="activeStep" align-center>
                <el-step v-for="(step,k) in steps" :key="k" :title="step"></el-step>
            </el-steps>
        </div>
        
        <el-row :gutter="24" class="row_wrap">
            <el-col :span="12">
                <div class="card">
                    <p class="m_tt">登录页布局</p>
                    <el-form ref="form" :model="loginForm" label-width="200px" >
                        <el-form-item label="封面图">
                            <el-switch
                                v-model="loginForm.needLogin"
                                active-color="#13ce66"
                                inactive-color="#ccc">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="是否获取用户微信昵称头像">
                            <el-switch
                                v-model="loginForm.needHeaderImg"
                                active-color="#13ce66"
                                inactive-color="#ccc">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="是否仅支持移动用户">
                            <el-switch
                                v-model="loginForm.supportMobile"
                                active-color="#13ce66"
                                inactive-color="#ccc">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="是否开放游客用户">
                            <el-switch
                                v-model="loginForm.supportTourist"
                                active-color="#13ce66"
                                inactive-color="#ccc">
                            </el-switch>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="card">
                    <p class="m_tt">分享页布局</p>
                    <el-form ref="form" :model="layoutForm" label-width="140px" >
                        <el-form-item label="是否开启分享页">
                            <el-switch
                                v-model="layoutForm.supportShare"
                                active-color="#13ce66"
                                inactive-color="#ccc">
                            </el-switch>
                        </el-form-item>
                       <el-form-item label="分享缩略图" v-if="layoutForm.supportShare">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="layoutForm.shareImage" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="分享码次数">
                            <el-input v-model="layoutForm.shareTimes" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="分享码次数">
                            <el-input v-model="layoutForm.shareCss" type="textarea" :rows="8" placeholder="多行输入"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <div class="btns">
            <el-button @click="preve()">上一步</el-button>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="next()">下一步</el-button>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'base_info_page',
    data() {
        return {
            activeStep: 1,
            steps: ['基本信息', '登录分享页配置', '直播页配置', '直播插件配置', '权限配置'],
            dialogVisible: false,
            loginForm: {
                needLogin: false,
                needHeaderImg: false,
                supportMobile: false,
                supportTourist: false,
            },
            layoutForm: {
                supportShare: false,
                shareImage: '',
                shareTimes: '',
                shareCss: ''
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

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.form.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        preve() {
            this.$router.push({name: 'live_base_info'})
        },
        save() {
            console.log('save')
        },
        next() {
            this.$router.push({name: 'live_elements'})
        }
    }
}
</script>

<style lang="scss" scoped>
.layout_page{
    .row_wrap{
        padding: 24px;
        > .el-col{
            margin-bottom: 24px;
        }
    }
    .card{
        padding: 0 24px 24px;
        width: 100%;
        height: 560px;
        border: solid 1px #ccc;
        
    }
    .btns{
        text-align: center;
    }
}

</style>