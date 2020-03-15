<template>
<div class="base_info_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            直播管理<span class="subtitle">发布直播</span>
            <el-button @click="$router.push({name: 'live_list'})" class="fr" size="mini">返回</el-button>
        </h3>

        <el-row :gutter="20"  class="form_cont mt25" >
            <el-col :lg="12" :md="16" :sm="18" :xs="24">
                <el-form ref="form" :model="form" label-width="160px" >
                    <el-form-item label="阿里云推流码：">
                        <el-input v-model="form.flowCode"></el-input>
                    </el-form-item>
                    <el-form-item label="播放地址 (RTMP)：">
                        <el-input v-model="form.ritpAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="播放地址 (FLV)：">
                        <el-input v-model="form.flvAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="播放地址 (HLS)">
                        <el-input v-model="form.hlsAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="直播标题：">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker
                            v-model="form.startDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="form.endDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="阿里云推流码：">
                        <el-input v-model="form.flowCode"></el-input>
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
                            <img width="100%" :src="form.imageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    
                    <el-form-item class="mt25">
                        <el-button type="primary" @click="save">提    交</el-button>
                        <el-button>重置推流码</el-button>
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
            dialogVisible: false,
            form: {
                flowCode: '',
                ritpAddress: '',
                flvAddress: '',
                hlsAddress: '',
                title: '',
                startDate: '',
                endDate: '',
                flowCode: '',
                imageUrl: '',
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
            this.form.imageUrl = file.url;
            this.dialogVisible = true;
        },
        
        save() {
            this.$router.push({name: 'live_list'});
        }
    }
}
</script>

<style lang="scss" scoped>
.base_info_page{
    .form_cont{
        padding-left: 24px;
    }
}

</style>