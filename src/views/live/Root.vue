<template>
<div class="base_info_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            直播管理<span class="subtitle">发布直播</span>
            <el-button @click="$router.go(-1)" class="fr" size="mini">返回</el-button>
        </h3>

        <div class="mt25">
            <el-steps :active="activeStep" align-center>
                <el-step v-for="(step,k) in steps" :key="k" :title="step"></el-step>
            </el-steps>
        </div>
        
        <el-row :gutter="20" type="flex" class="form_cont"  justify="center">
            <el-col :lg="12" :md="16" :sm="18" :xs="24">
                <el-form ref="form" :model="form" label-width="160px" >
                    <el-form-item label="白名单">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :limit="1"
                            :on-remove="handleRemove">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="水印">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :limit="1"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form.dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="直播权限部门配置">
                        <el-select v-model="form.liveRoots" multiple placeholder="请选择" style="width: 100%">
                            <el-option
                                v-for="item in partments"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回播权限部门配置">
                        <el-select v-model="form.replayRoots" multiple placeholder="请选择" style="width: 100%">
                            <el-option
                                v-for="item in partments"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="mt25">
                        <el-button @click="preve">上一步</el-button>
                        <el-button type="primary" @click="save()">保存</el-button>
                        <el-button @click="next()">直接发布</el-button>
                    </el-form-item>
                </el-form>

                
            </el-col>
        </el-row>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'base_info_page',
    data() {
        return {
            activeStep: 4,
            steps: ['基本信息', '登录分享页配置', '直播页配置', '直播插件配置', '权限配置'],
            partments: [
                {
                    value: '0',
                    label: '江苏分公司'
                }, {
                    value: '1',
                    label: '湖北分公司'
                }, {
                    value: '2',
                    label: '上海分公司'
                }, {
                    value: '3',
                    label: '安徽分公司'
                }, {
                    value: '4',
                    label: '芜湖中支'
                }
            ],
            
            dialogVisible: false,
            form: {
                liveRoots: [],
                replayRoots: [],
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
            this.$router.push({name: 'live_plugin'})
        },
        save() {
            console.log(save)
        },
        next() {
            this.$router.push({name: 'live_release'})
        }
    }
}
</script>

<style lang="scss" scoped>
.base_info_page{
    .form_cont{
        padding-top: 40px;
    }
}

</style>