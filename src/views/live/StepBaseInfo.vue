<template>
<div class="base_info_page">
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
        
        <el-row :gutter="20" type="flex" class="form_cont"  justify="center">
            <el-col :lg="12" :md="16" :sm="18" :xs="24">
                <el-form ref="form" :model="form" label-width="100px" >
                    <el-form-item label="直播名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form.dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="直播分类">
                        <el-select v-model="form.grade" placeholder="请选择" style="width: 100%">
                            <el-option
                                v-for="item in categoryList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="视频类型">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="0">直播/视频ID</el-radio>
                            <el-radio label="1">其他外链</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="视频地址">
                        <el-input v-model="form.mainUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker
                            v-model="form.publishDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="form.performDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button @click="next()">下一步</el-button>
                    </el-form-item>
                </el-form>

                
            </el-col>
        </el-row>
        <div class="card_cont mt25">
            
        </div>
       
    </div>
</div>
</template>

<script>

export default {
    name: 'base_info_page',
    data() {
        return {
            activeStep: 0,
            steps: ['基本信息', '登录分享页配置', '直播页配置', '直播插件配置', '权限配置'],
            categoryList: [
                {
                    value: '0',
                    label: '俱乐部'
                }, {
                    value: '1',
                    label: '南鲸晚自习'
                }, {
                    value: '2',
                    label: '伍月石榴产说会'
                }
            ],
            
            dialogVisible: false,
            form: {
                dialogImageUrl: '',
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
        
        save() {
            console.log(save)
        },
        next() {
            this.$router.push({name: 'live_layout'})
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