<template>
<div class="question_list_page">
    <div class="card_wrapper">
        <h3 class="card_title">
            {{params.name}}
            <el-button @click="handleOperateBtn('releaseNotice')" type="primary" class="fr" size="mini" icon="el-icon-plus" v-if="params.page === 'notice'">发布新公告</el-button>
            <el-button @click="handleOperateBtn('document')" type="primary" class="fr" size="mini" icon="el-icon-plus" v-if="params.page === 'document'">上传资料</el-button>
            <el-link @click="handleOperateBtn('questionView')" type="primary" class="fr" size="mini" v-if="params.page === 'question'">查看及导出</el-link>
            <el-link @click="handleOperateBtn('lotteryView')" type="primary" class="fr" size="mini" v-if="params.page === 'lottery'">查看及导出</el-link>
        </h3>
        <div class="card_cont">
            <div style="overflow:hidden;" class="mb12">
                <el-button @click="handleOperateBtn('questionAdd')" type="primary" class="fr" size="mini" icon="el-icon-plus" v-if="params.page === 'question'">添加问卷</el-button>
                <el-button @click="handleOperateBtn('lotteryAdd')" type="primary" class="fr" size="mini" icon="el-icon-plus" v-if="params.page === 'lottery'">添加抽奖</el-button>
            </div>
            <el-form :inline="true" label-width="85px" :model="searchForm" class="demo-form-inline" v-if="['online', 'share', 'fee'].indexOf(params.page) > -1">
                <el-form-item label="部门">
                    <el-select v-model="searchForm.partment" placeholder="部门选择" size="mini" style="width: 240px">
                        <el-option
                            v-for="item in partmentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model="searchForm.name" placeholder="工号" size="mini" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="回复状态" v-if="params.page === 'online'">
                    <el-select v-model="searchForm.responceStatus" placeholder="回复状态" size="mini" style="width: 240px">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleOperateBtn(['online', 'share', 'fee'].indexOf(params.page) > -1 ? 'outPut' : 'search')" type="primary" size="mini">{{['online', 'share', 'fee'].indexOf(params.page) > -1 ? '导出' : '搜索'}}</el-button>
                </el-form-item>
            </el-form>

            <Table :columns="columns" :rows="rows" @action="handleTableCell" :border="false"></Table>
            <!-- 翻页 -->
            <div class="mt24" v-if="[].indexOf(params.page) > -1"> 
                <el-pagination
                    background
                    @current-change="changePage"
                    :current-page="searchForm.page"
                    :page-size="searchForm.pageSize"
                    layout="prev, pager, next"
                    :total="40">
                </el-pagination>
            </div>
        </div>
       
        <el-dialog title="答疑" :visible.sync="showResponceDialog" :center="true" :close-on-click-modal="false" width="500px">
            <div class="content">
                <el-form label-position="right" label-width="100px" :model="responceModel" ref="responceDialog">
                    <el-form-item label="用户提问：">
                        <el-input v-model="responceModel.question" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="答复：" prop="answer" :rules="{ required: true, message: '请输入答复内容！', trigger: 'blur' }">
                        <el-input type="textarea" v-model="responceModel.answer"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitResponce">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog class="question_detail" :title="questionModel.title" :visible.sync="showQuestionDialog" :center="true" :close-on-click-modal="false" width="50%">
            <div class="content" style="max-height: 80%;overflow:scroll;">
                <h3>错题区</h3>
                <dl v-for="(item,i) in questionModel.incorrectList" :key="i">
                    <dt>{{(i+1) | toChineseNum}}、{{item.question}}</dt>
                    <dd>
                        <span v-for="(q,j) in item.items" :key="j">{{j | toEnglishKey}}、{{q}}</span>
                    </dd>
                    <dd><span>正确答案：{{item.correct}}</span><span>所选答案：{{item.customVal}}</span></dd>
                </dl>
                <h3>完美区</h3>
                <dl v-for="(item,i) in questionModel.correctList" :key="i">
                    <dt>{{(i+1) | toChineseNum}}、 {{item.question}}</dt>
                    <dd>
                        <span v-for="(q,j) in item.items" :key="j">{{j | toEnglishKey}}、{{q}}</span>
                    </dd>
                    <dd><span>正确答案：{{item.correct}}</span><span>所选答案：{{item.customVal}}</span></dd>
                </dl>
            </div>
        </el-dialog>

    </div>
</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
import HeaderInfo from '@/components/HeaderInfo';

export default {
    name: 'question_list_page',
    data() {
        return {
            params: {},
            showResponceDialog: false,
            responceModel: {},
            showQuestionDialog: false,
            questionModel: {},
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

            searchForm: {
                partment: '',
                code: '',
                responceStatus: '',
                pageSize: 10,
                page: 1
            },
            rows: [],
            columns: [],
        }
    },
    watch: {
        '$route': {
            handler(to, from) {
                console.log(777777, to)
                if(to.query.page) {
                    this.params = to.query;
                    this._query();
                    this.setColumns();
                }
            },
            immediate: true
        }
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                switch (this.params.page) {
                    case 'notice': 
                        this.rows = [
                            {
                                id: 1,
                                content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                                time: '2019-02-05 12:45:35'
                            }, {
                                id: 1,
                                content: '公告内容公告内容公告公告公告内',
                                time: '2019-02-05 12:45:35'
                            }, {
                                id: 1,
                                content: '公告内容公告内容公告公告公告内容公告',
                                time: '2019-02-05 12:45:35'
                            }
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'document': 
                        this.rows = [
                            {
                                id: 1,
                                fileName: '文件夹名称.doc',
                                time: '2019-02-05 12:45:35'
                            }, {
                                id: 1,
                                fileName: '文件夹名称.doc',
                                time: '2019-02-05 12:45:35'
                            }, {
                                id: 1,
                                fileName: '文件夹名称.doc',
                                time: '2019-02-05 12:45:35'
                            }, {
                                id: 1,
                                fileName: '文件夹名称.doc',
                                time: '2019-02-05 12:45:35'
                            }, 
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'online': 
                        this.rows = [
                            {
                                status: '0',
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                                question: '问题问题问题问题问题1?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                status: '1',
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                                question: '问题问题问题问题问题2?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35' 
                            }, {
                                status: '0',
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                                question: '问题问题问题问题问题3?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                status: '1',
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                                question: '问题问题问题问题问题4?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }, {
                                status: '1',
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                                question: '问题问题问题问题问题5?',
                                askTime: '2019-02-05 12:45:35',
                                responce: '冯绍峰的帅哥帅哥',
                                responceTime: '2019-02-05 12:55:35'
                            }
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'question': 
                        this.rows = [
                            {
                                id: 1,
                                status: '0',
                                question: '保险好卖吗?',
                                personNum: '1000人'
                            }, {
                                id: 1,
                                status: '1',
                                question: '保险好卖吗?',
                                personNum: '1000人'
                            }, {
                                id: 1,
                                status: '2',
                                question: '保险好卖吗?',
                                personNum: '1000人'
                            }, {
                                id: 1,
                                status: '0',
                                question: '保险好卖吗?',
                                personNum: '1000人'
                            }
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'lottery': 
                        this.rows = [
                            {
                                id: 1,
                                status: '0',
                                title: '保险好卖吗?',
                                personNum: '1000人'
                            }, {
                                id: 1,
                                status: '1',
                                title: '保险好卖吗?',
                                personNum: '1000人'
                            }, {
                                id: 1,
                                status: '2',
                                title: '保险好卖吗?',
                                personNum: '1000人'
                            }, {
                                id: 1,
                                status: '0',
                                title: '保险好卖吗?',
                                personNum: '1000人'
                            }
                        ];
                        this.rows = this.addBtns(this.rows);
                        break;
                    case 'share': 
                        this.rows = [
                            {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                            }, {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                            }, {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                customerName: '万团',
                                shareTimes: '2222',
                                invitNum: '11111',
                                name: '侯媛',
                                code: '1212121',
                                headerUrl: require('../../assets/images/default.jpg'),
                            }
                        ];
                        break;
                    case 'fee': 
                        this.rows = [
                            {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                rewardName: '侯媛',
                                rewardCode: '1212121',
                                rewardHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardingName: '侯媛',
                                rewardingCode: '1212121',
                                rewardingHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardTime: '2019-06-12 23:45:00',
                                rewardAmount: '123.12元'
                            }, {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                rewardName: '侯媛',
                                rewardCode: '1212121',
                                rewardHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardingName: '侯媛',
                                rewardingCode: '1212121',
                                rewardingHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardTime: '2019-06-12 23:45:00',
                                rewardAmount: '123.12元'
                            }, {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                rewardName: '侯媛',
                                rewardCode: '1212121',
                                rewardHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardingName: '侯媛',
                                rewardingCode: '1212121',
                                rewardingHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardTime: '2019-06-12 23:45:00',
                                rewardAmount: '123.12元'
                            }, {
                                range: 1,
                                partment: '江苏分公司-宿迁中支-万达团队',
                                rewardName: '侯媛',
                                rewardCode: '1212121',
                                rewardHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardingName: '侯媛',
                                rewardingCode: '1212121',
                                rewardingHeaderUrl: require('../../assets/images/default.jpg'),
                                rewardTime: '2019-06-12 23:45:00',
                                rewardAmount: '123.12元'
                            }
                        ];
                        break;
                }
                
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        addBtns(rows) {
            if(this.params.page === 'notice') {
                return rows.map(item=> {
                    item.items = [
                        {
                            key: 'noticeEdit',
                            desc: '编辑'
                        }, {
                            key: 'noticeDelete',
                            desc: '删除'
                        }
                    ];
                    
                    return item;
                })
            }
            if( this.params.page === 'document') {
                return rows.map(item=> {
                    item.items = [
                        {
                            key: 'documentDelete',
                            desc: '删除'
                        }
                    ];
                    return item;
                })
            }
            if(this.params.page === 'online') {
                return rows.map(item=> {
                    item.items = [
                        {
                            key: 'RESPONCE',
                            desc: '回复',
                            size: 'mini'
                        }
                    ];
                    if(item.status === '0') {
                        item.statusBtn = [
                            {
                                key: '',
                                desc: '未回复',
                                btnType: 'danger'
                            }
                        ]
                    } else {
                        item.statusBtn = [
                            {
                                key: '',
                                desc: '已回复',
                                btnType: 'info'
                            }
                        ]
                    }
                    
                    return item;
                })
            }
            if(this.params.page === 'question') {
                return rows.map(item=> {
                    if(item.status === '0') {
                        item.statusBtn = [
                            {
                                desc: '未发布',
                                btnType: 'danger'
                            }
                        ];
                        item.items = [
                            {
                                key: 'EDIT',
                                desc: '编辑'
                            }, {
                                key: 'RELEASE',
                                desc: '发布'
                            }
                        ];
                    } else if(item.status === '1'){
                        item.statusBtn = [
                            {
                                desc: '已发布',
                                btnType: 'primary'
                            }
                        ];
                        item.items = [
                            {
                                key: 'OFFLINE',
                                desc: '下线'
                            }
                        ];
                    } else if(item.status === '2'){
                        item.statusBtn = [
                            {
                                desc: '已撤回',
                                btnType: 'info'
                            }
                        ];
                        item.items = [
                            {
                                key: 'DELETE',
                                desc: '删除'
                            }
                        ];
                    }
                    return item;
                })
            }
            if(this.params.page === 'lottery') {
                return rows.map(item=> {
                    if(item.status === '0') {
                        item.statusBtn = [
                            {
                                desc: '未发布',
                                btnType: 'danger'
                            }
                        ];
                        item.items = [
                            {
                                key: 'EDIT',
                                desc: '编辑'
                            }, {
                                key: 'RELEASE',
                                desc: '发布'
                            }
                        ];
                    } else if(item.status === '1'){
                        item.statusBtn = [
                            {
                                desc: '已发布',
                                btnType: 'primary'
                            }
                        ];
                        item.items = [
                            {
                                key: 'OFFLINE',
                                desc: '撤回'
                            }
                        ];
                    } else if(item.status === '2'){
                        item.statusBtn = [
                            {
                                desc: '已撤回',
                                btnType: 'info'
                            }
                        ];
                        item.items = [
                            {
                                key: 'DELETE',
                                desc: '删除'
                            }
                        ];
                    }
                    return item;
                })
            }
            return rows;
        },
        handleTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'RESPONCE': 
                    this.showResponceDialog = true;
                    this.responceModel = row;
                    break;
                case 'VIEW': 
                    this.showQuestionDialog = true;
                    this.questionModel = {
                        title: '保险好卖吗？',
                        incorrectList: [
                            {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }, {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }, {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['正确', '错误'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }, {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }
                        ],
                        correctList: [
                            {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }, {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }, {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['正确', '错误'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }, {
                                question: 'XXXXXXXXXXXXXXXXXX?',
                                items: ['XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXX'],
                                correct: 'A,B',
                                customVal: 'C,D'
                            }
                        ]
                    }
                    break;
            }
        },
        handleOperateBtn(type) {
            switch(type) {
                case 'releaseNotice':
                    this.$emit('public')
                    break;
                default:
                    break;
            }
        },
        changePage(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
        validate(form) {
            return new Promise((solve, reject)=> {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        solve()
                    } else {
                        reject()
                    }
                })
            })
        },
        submitResponce() {
            this.validate('responceDialog').then(_=>{
                this.$confirm('确认回复？').then(_ => {
                    const loading = this.$loading({background:'rgba(0,0,0,0)'});
                    setTimeout(()=>{
                        loading.close();
                        this.showResponceDialog = false;
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                    }, 500);
                }).catch(_=>{})
            });
        },
        setColumns() {
            switch (this.params.page) {
                case 'notice': 
                    this.columns = [
                        {
                            prop: 'content',
                            label: '公告内容'
                        }, {
                            prop: 'time',
                            label: '操作时间'
                        }, {
                            prop: 'id',
                            label: '操作',
                            btnType: 'link',
                            width: '120px',
                            component: ButtonCell
                        }
                    ];
                    break;
                case 'document': 
                    this.columns = [
                        {
                            prop: 'fileName',
                            label: '文件'
                        }, {
                            prop: 'time',
                            label: '上传时间'
                        }, {
                            prop: 'id',
                            label: '操作',
                            btnType: 'link',
                            width: '120px',
                            component: ButtonCell
                        }
                    ];
                    break;
                case 'online': 
                    this.columns = [
                        {
                            prop: 'status', // 0 未回复  1 已回复
                            label: '状态',
                            listKey: 'statusBtn',
                            disabled: true,
                            plain: true,
                            component: ButtonCell
                        }, {
                            prop: 'partment',
                            label: '部门'
                        }, {
                            prop: 'customerName',
                            label: '用户',
                            headerKey: 'headerUrl',
                            codeKey: 'code',
                            nameKey: 'name',
                            component: HeaderInfo
                        }, {
                            prop: 'question',
                            label: '问题'
                        }, {
                            prop: 'askTime',
                            label: '提问时间',
                            width: '120px'
                        }, {
                            prop: 'responce',
                            label: '回复'
                        }, {
                            prop: 'responceTime',
                            label: '回复时间',
                            width: '120px'
                        }, {
                            prop: 'id',
                            label: '操作',
                            plain: true,
                            component: ButtonCell
                        }
                    ];
                    break;
                case 'question': 
                    this.columns = [
                        {
                            prop: 'status', // 0 未发布  1 已发布  2 已撤回
                            label: '状态',
                            listKey: 'statusBtn',
                            disabled: true,
                            plain: true,
                            component: ButtonCell
                        }, {
                            prop: 'question',
                            label: '问卷标题'
                        }, {
                            prop: 'personNum',
                            label: '参与人数'
                        }, {
                            prop: 'id',
                            label: '操作',
                            btnType: 'link',
                            component: ButtonCell
                        }
                    ];
                    break;
                case 'lottery': 
                    this.columns = [
                        {
                            prop: 'status', // 0 未发布  1 已发布  2 已撤回
                            label: '状态',
                            listKey: 'statusBtn',
                            disabled: true,
                            plain: true,
                            component: ButtonCell
                        }, {
                            prop: 'title',
                            label: '抽奖标题'
                        }, {
                            prop: 'personNum',
                            label: '参与人数'
                        }, {
                            prop: 'id',
                            label: '操作',
                            btnType: 'link',
                            component: ButtonCell
                        }
                    ];
                    break;
                case 'share': 
                    this.columns = [
                        {
                            width: '50px',
                            prop: 'range',
                            label: '排名'
                        }, {
                            prop: 'partment',
                            label: '部门名称'
                        }, {
                            prop: 'customerName',
                            label: '用户',
                            headerKey: 'headerUrl',
                            codeKey: 'code',
                            nameKey: 'name',
                            component: HeaderInfo
                        }, {
                            prop: 'shareTimes',
                            label: '分享数'
                        }, {
                            prop: 'invitNum',
                            label: '邀请数'
                        }
                    ];
                    break;
                case 'fee': 
                    this.columns = [
                        {
                            width: '50px',
                            prop: 'range',
                            label: '排名'
                        }, {
                            prop: 'partment',
                            label: '部门'
                        }, {
                            prop: 'rewardPerson',
                            label: '打赏人',
                            headerKey: 'rewardHeaderUrl',
                            codeKey: 'rewardCode',
                            nameKey: 'rewardName',
                            component: HeaderInfo
                        }, {
                            prop: 'rewardingPerson',
                            label: '被打赏人',
                            headerKey: 'rewardingHeaderUrl',
                            codeKey: 'rewardingCode',
                            nameKey: 'rewardingName',
                            component: HeaderInfo
                        }, {
                            prop: 'rewardTime',
                            label: '打赏时间'
                        }, {
                            prop: 'rewardAmount',
                            label: '打赏时间'
                        }
                    ];
                    break;
            }
        }
    },
    created() {
        
        this.partmentList = [
            {
                value: '1',
                label: '江苏分公司-宿迁中支-王大雷团队1'
            }, {
                value: '2',
                label: '江苏分公司-宿迁中支-王大雷团队2'
            }, {
                value: '3',
                label: '江苏分公司-宿迁中支-王大雷团队3'
            }
        ];
        
    },
    components: {Table}
}
</script>

<style lang="scss">
.question_list_page{
    width: 100%;
    .question_detail {
        .content{
            padding-top: 0;
            h3{
                font-size: 16px;
                margin: 20px 0 15px;
            }
            dl{
                dt{
                    margin: 20px 0 10px;
                }
                dd{
                    margin: 10px 0;
                    color: #000;
                }
                dd span{
                    display: inline-block;
                    min-width: 20%;
                    padding-right: 20px;
                    color: #666;
                }
            }
        }
    }
        
}

</style>