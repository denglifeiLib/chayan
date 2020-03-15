<template>
<div class="element_page">
    <div class="card_wrapper mt25">
        <h3 class="card_title">
            直播管理<span>发布直播</span>
            <el-button  @click="$router.push({name: 'live_list'})" class="fr" size="mini">返回</el-button>
        </h3>

        <div class="mt25">
            <el-steps :active="activeStep" align-center>
                <el-step v-for="(step,k) in steps" :key="k" :title="step"></el-step>
            </el-steps>
        </div>
        
        <el-row :gutter="24" class="row_wrap mt25" type="flex" justify="center">
            <!-- 左边 -->
            <el-col :span="9">
                <div class="card plugin">
                    <p class="m_tt justify">直播页插件 <el-link :underline="false" class="fr" type="primary">插件选择</el-link></p>
                    <div class="plugin_choose"  v-for="(item, i) in choosedPlugin" :key="i">
                        <p class="m_tt justify">{{pluginMap.filter(plugin=> plugin.prop === item)[0].label}} <i class="el-icon-close fr" @click="deletePlugin(item, i)"></i></p>
                        <el-form ref="form">
                            <el-form-item label="入口">
                                <el-checkbox-group v-model="model[item]" size="mini">
                                    <el-checkbox-button label="0">tab标签</el-checkbox-button>
                                    <el-checkbox-button label="1">Banner</el-checkbox-button>
                                    <el-checkbox-button label="2">悬浮按钮</el-checkbox-button>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
            <!-- 右边 -->
            <el-col :span="15">

                <div class="card" style="padding-bottom: 0;">
                    <p class="m_tt justify">在线答疑 <el-link :underline="false" class="fr" type="success">无需配置，已生效</el-link></p>
                </div>

                <div class="card">
                    <p class="m_tt justify">调查问卷 <el-link :underline="false" class="fr" type="primary" @click="releaseNotice()">添加问卷</el-link></p>
                    <Table :columns="questionColumns" :rows="questionRows" @action="handleQuestionTableCell"></Table>
                    <!-- 翻页 -->
                    <div class="mt24">
                        <el-pagination
                            background
                            @current-change="changeQusetionPage"
                            :current-page="questionPage"
                            :page-size="3"
                            layout="prev, pager, next"
                            :total="40">
                        </el-pagination>
                    </div>
                </div>

                <div class="card" style="padding-bottom: 0;">
                    <p class="m_tt justify">分享达人榜 <el-link :underline="false" class="fr" type="success">无需配置，已生效</el-link></p>
                </div>

                <div class="card">
                    <p class="m_tt justify">在线抽奖 <el-link :underline="false" class="fr" type="primary" @click="releaseNotice()">添加抽奖</el-link></p>
                    <Table :columns="lotteryColumns" :rows="lotterynRows" @action="handleLotteryTableCell"></Table>
                    <!-- 翻页 -->
                    <div class="mt24"> 
                        <el-pagination
                            background
                            @current-change="changeLotteryPage"
                            :current-page="lotteryPage"
                            :page-size="3"
                            layout="prev, pager, next"
                            :total="40">
                        </el-pagination>
                    </div>
                </div>


                <div class="card">
                    <p class="m_tt justify">打赏</p>
                    <ul class="fee_card">
                        <li>
                            <img src="../../assets/images/default.jpg" alt="" class="header">
                            <p class="name">主持A</p>
                            <p class="number">打赏100元</p>
                        </li>
                        <li>
                            <img src="../../assets/images/default.jpg" alt="" class="header">
                            <p class="name">主持A</p>
                            <p class="number">打赏100元</p>
                        </li>
                        <li>
                            <img src="../../assets/images/default.jpg" alt="" class="header">
                            <p class="name">主持A</p>
                            <p class="number">打赏100元</p>
                        </li>
                    </ul>
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
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
export default {
    name: 'element_page',
    data() {
        return {
            activeStep: 3,
            steps: ['基本信息', '登录分享页配置', '直播页配置', '直播插件配置', '权限配置'],

            pluginMap: [
                {
                    prop: 'online',
                    label: '在线答疑'
                }, {
                    prop: 'question',
                    label: '调查问卷'
                }, {
                    prop: 'share',
                    label: '分享达人榜'
                },{
                    prop: 'lottery',
                    label: '在线抽奖'
                }, {
                    prop: 'fee',
                    label: '打赏'
                }
            ],
            choosedPlugin: ['online', 'question', 'lottery'],

            model: {
                online: [],
                question: [],
                share: [],
                lottery: [],
                fee: [],
            },
            questionPage: 1,
            lotteryPage: 1,

            lotterynRows: [
                {
                    id: 1,
                    title: '抽奖标题1',
                    status: '0'
                }, {
                    id: 1,
                    title: '抽奖标题2',
                    status: '1'
                }, {
                    id: 1,
                    title: '抽奖标题3',
                    status: '2'
                }
            ],
            questionRows: [
                {
                    id: 1,
                    title: '问卷标题1',
                    status: '0'
                }, {
                    id: 1,
                    title: '问卷标题2',
                    status: '1'
                }, {
                    id: 1,
                    title: '问卷标题3',
                    status: '2'
                }
            ],

            lotteryColumns: [
                {
                    prop: 'title',
                    label: '抽奖标题'
                }, {
                    prop: 'status',
                    label: '状态',
                    filter: (row)=> {
                        return {
                            '0': '待发布',
                            '1': '已发布',
                            '2': '已撤回'
                        }[row.status]
                    }
                }, {
                    prop: 'id',
                    label: '操作',
                    component: ButtonCell
                }
            ], 
            questionColumns: [
                {
                    prop: 'title',
                    label: '问卷标题'
                }, {
                    prop: 'status',
                    label: '状态',
                    filter: (row)=> {
                        return {
                            '0': '待发布',
                            '1': '已发布',
                            '2': '已撤回'
                        }[row.status]
                    }
                }, {
                    prop: 'id',
                    label: '操作',
                    component: ButtonCell
                }
            ], 
            



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
                this.lotterynRows = [
                    {
                        id: 1,
                        title: '抽奖标题1',
                        status: '0'
                    }, {
                        id: 1,
                        title: '抽奖标题2',
                        status: '1'
                    }, {
                        id: 1,
                        title: '抽奖标题3',
                        status: '2'
                    }
                ]
                this.questionRows = [
                    {
                        id: 1,
                        title: '问卷标题1',
                        status: '0'
                    }, {
                        id: 1,
                        title: '问卷标题2',
                        status: '1'
                    }, {
                        id: 1,
                        title: '问卷标题3',
                        status: '2'
                    }
                ]
                this.lotterynRows = this.addBtns(this.lotterynRows);
                this.questionRows = this.addBtns(this.questionRows);

            }, 500);
            console.log('发送请求', this.searchForm);
        },

        addBtns(rows) {
            return rows.map(item=> {
                if(item.status === '0') {
                    item.items = [
                        {
                            key: 'EDIT',
                            desc: '编辑'
                        }, {
                            key: 'RELEASE',
                            desc: '发布',
                            btnType: 'success'
                        }
                    ]
                } else if(item.status === '1') {
                    item.items = [
                        {
                            key: 'REBACK',
                            desc: '撤回',
                            btnType: 'danger'
                        }
                    ]
                } else {
                    item.items = []
                }
                return item;
            })
        },

        handleLotteryTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'EDIT': 
                    break;
                case 'RELEASE': 
                    break;
                case 'REBACK': 
                    this.changeStatus(row, index)
                    break;
            }
        },

        handleQuestionTableCell(type, row, index) {
            console.log(88888, type, row, index)
            switch (type) {
                case 'EDIT': 
                    break;
                case 'RELEASE': 
                    break;
                case 'REBACK': 
                    break;
            }
        },

        deletePlugin(item, i){
            this.choosedPlugin.splice(i, 1)
        },

        changeQusetionPage(val) {
            this.qusetionPage = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
        changeLotteryPage(val) {
            this.lotteryPage = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },



        releaseNotice() {},
        

        preve() {
            this.$router.push({name: 'live_layout'})
        },
        save() {
            console.log('save')
        },
        next() {
            this.$router.push({name: 'live_root'})
        }
    },
    components: {Table}
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
        &.plugin{
            padding:  0 10px 24px;
        }
        .plugin_choose{
            padding:  0 10px;
            margin-bottom: 15px;
            border: solid 1px #ccc;
        }
        .fee_card{
            overflow: hidden;
            li{
                float: left;
                margin-right: 10%;
                margin-bottom: 20px;
                text-align: center;
            }
            .header{
                width: 60px;
                height: 60px;
                border-radius: 60px;
            }
            p{
        
            }
        }
    }
    
    .btns{
        text-align: center;
    }
}

</style>