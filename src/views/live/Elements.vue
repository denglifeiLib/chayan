<template>
<div class="element_page">
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
        
        <el-row :gutter="24" class="row_wrap mt25" type="flex" justify="center">
            <el-col :span="20">

                <div class="card">
                    <p class="m_tt justify">微资料配置 <el-link :underline="false" class="fr" type="primary" @click="toggleEdit">{{editing ? '保存' : "编辑"}}</el-link></p>
                    <editor :content="content" ref="edit" v-if="editing"></editor>
                    <div class="show" v-html="content" v-if="!editing"></div>
                </div>

                <div class="card">
                    <p class="m_tt justify">公告置顶 <el-link :underline="false" class="fr" type="primary" @click="releaseNotice()">发布新公告</el-link></p>
                    <div class="flex_box mb12" v-for="(item, i) in noticeList" :key="i">
                        <span class="bd">{{item.title}}</span>
                        <div class="ft">
                            <span>{{item.time}} </span>
                            <el-link :underline="false" class="fr delete_btn" type="primary" @click="deleteNotice(item)">删除</el-link>
                        </div>
                    </div>
                    <!-- 翻页 -->
                    <div class="mt24">
                        <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-size="5"
                            layout="prev, pager, next"
                            :total="40">
                        </el-pagination>
                    </div>
                </div>

                <div class="card">
                    <p class="m_tt justify">附文件 </p>
                    <el-upload
                        class="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleChangeFile"
                        :file-list="fileList">
                        <el-link :underline="false" type="primary" class="upload_btn">点击上传图文</el-link>
                    </el-upload>
                </div>

                <div class="card">
                    <p class="m_tt justify">在线留言</p>
                    <el-form ref="form" label-width="100px" >
                        <el-form-item label="发言类型支持">
                            <el-checkbox-group v-model="msgType" size="medium">
                                <el-checkbox-button v-for="item in msgTypes" :label="item.prop" :key="item.prop">{{item.label}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="弹幕开启">
                            <el-switch
                                v-model="dangmu"
                                active-color="#13ce66"
                                inactive-color="#ccc">
                            </el-switch>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="btns">
                    <el-button @click="preve()">上一步</el-button>
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button @click="next()">下一步</el-button>
                </div>
            </el-col>
        </el-row>
        
    </div>
</div>
</template>

<script>
import Editor from "@/components/Editor";
export default {
    name: 'element_page',
    data() {
        return {
            activeStep: 2,
            steps: ['基本信息', '登录分享页配置', '直播页配置', '直播插件配置', '权限配置'],

            editing: false,
            content:'<h1>fdsfdfdsf</h1>',

            noticeList: [
                {
                    id: 1,
                    title: '公告标题',
                    time: '2020-03-04 11:11:11'
                }, {
                    id: 1,
                    title: '公告标题',
                    time: '2020-03-04 11:11:11'
                }, {
                    id: 1,
                    title: '公告标题',
                    time: '2020-03-04 11:11:11'
                }, {
                    id: 1,
                    title: '公告标题',
                    time: '2020-03-04 11:11:11'
                }, {
                    id: 1,
                    title: '公告标题',
                    time: '2020-03-04 11:11:11'
                }
            ],
            page: 1,

            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],

            msgTypes: [
                {
                    prop: 'text',
                    label: '文字'
                }, {
                    prop: 'img',
                    label: '图片'
                }, {
                    prop: 'voice',
                    label: '语音'
                }, {
                    prop: 'redpacke',
                    label: '红包'
                }
            ],
            msgType: ['voice', 'text'],
            dangmu: false,
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

        
        toggleEdit() {
            if(this.editing) {
                this.editing = false;
                // 获取编辑器内容
                this.content = this.$refs.edit.getContent();
            } else {
                 this.editing = true;
            }
        },

        releaseNotice() {},
        deleteNotice() {},
        handleCurrentChange(val) {
            this.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },

        handleChangeFile(file, fileList) {
            this.fileList = fileList.slice(-3);
        },

        preve() {
            this.$router.push({name: 'live_layout'})
        },
        save() {
            console.log('save')
        },
        next() {
            this.$router.push({name: 'live_plugin'})
        }
    },
    components: {Editor}
}
</script>

<style lang="scss" scoped>
.element_page{
    .row_wrap{
        padding: 24px;
    }
    .m_tt .fr{
        font-weight: bold;
        font-size: 16px;
    }
    .card{
        position: relative;
        padding: 0 24px 24px;
        width: 100%;
        margin-bottom: 24px;
        border: solid 1px #ccc;
        .upload{
            margin-top: -30px;
        }
        .upload_btn{
            position: absolute;
            right: 24px;
            top: 20px;
            font-weight: bold;
            font-size: 16px;
        }
    }
    .delete_btn{
        padding: 0 0 0 15px;
        line-height: 2.0;;
        vertical-align: middle;
    }
    .btns{
        text-align: center;
    }
}

</style>