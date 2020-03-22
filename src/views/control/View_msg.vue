<template>
    <div class="view_msg_page">
        <!-- tab content -->
        <div class="list-wrapper">
            
            <el-tabs v-model="activeName">
                <el-tab-pane label="留言置顶" name="top"></el-tab-pane>
                <el-tab-pane label="留言管理" name="all"></el-tab-pane>
            </el-tabs>
            
            <div class="top">
                <el-form :inline="true" label-width="85px" :model="searchForm" class="demo-form-inline">
                    <el-form-item label="部门：">
                        <el-select v-model="searchForm.partment" placeholder="部门选择" size="mini" style="width: 240px">
                            <el-option
                                v-for="item in partmentList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户工号：">
                        <el-input v-model="searchForm.code" placeholder="用户工号" size="mini" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label="置顶内容：">
                        <el-input type="textarea" v-model="searchForm.content" :placeholder="activeName === 'top' ? '输入置顶内容' : '输入留言内容'" size="mini" style="width:480px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="setTop()" type="primary" size="mini" v-if="activeName === 'top'">确定置顶</el-button>
                        <el-button @click="search()" type="primary" size="mini" :disabled="!(searchForm.partment || searchForm.code || searchForm.content)" v-else>搜 索</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <Table :columns="activeName === 'top' ? topColumns : allColumns" :rows="activeName === 'top' ? topRows : allRows" @action="handleTableCell" :border="false"></Table>

        </div>
    </div>
</template>

<script>

import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
import HeaderInfo from '@/components/HeaderInfo';

export default {
    name: 'base_user',
    data() {
        return {
            activeName: 'top',
            searchForm: {
                partment: '',
                code: '',
                content: '',
                pageSize: 10,
                page: 1
            },
            topRows: [],
            allRows: []
        }
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                this.topRows = [
                    {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-万达 团队',
                        content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                        time: '2019-02-05 12:45:35',
                        name: '侯媛',
                        code: '1212121',
                        headerUrl: require('../../assets/images/default.jpg'),
                        hasTop: true

                    }, {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-万达 团队',
                        content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                        time: '2019-02-05 12:45:35',
                        name: '侯媛',
                        code: '1212121',
                        headerUrl: require('../../assets/images/default.jpg'),
                        hasTop: false

                    }, {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-万达 团队',
                        content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                        time: '2019-02-05 12:45:35',
                        name: '侯媛',
                        code: '1212121',
                        headerUrl: require('../../assets/images/default.jpg'),
                        code: '1212121',
                        hasTop: false

                    }, 
                ];
                this.allRows = [
                    {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-万达 团队',
                        content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                        time: '2019-02-05 12:45:35',
                        name: '侯媛2',
                        code: '1212121',
                        headerUrl: require('../../assets/images/default.jpg'),
                        open: false

                    }, {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-万达 团队',
                        content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                        time: '2019-02-05 12:45:35',
                        name: '侯媛2',
                        code: '1212121',
                        headerUrl: require('../../assets/images/default.jpg'),
                        open: true

                    }, {
                        id: 1,
                        partment: '江苏分公司-宿迁中支-万达 团队',
                        content: '公告内容公告内容公告公告公告内容公告内容内容内容内容内容…',
                        time: '2019-02-05 12:45:35',
                        name: '侯媛2',
                        code: '1212121',
                        headerUrl: require('../../assets/images/default.jpg'),
                        open: false

                    }, 
                ];
                this.topRows = this.addBtns(this.topRows, 'top');
                this.allRows = this.addBtns(this.allRows, 'all');
                
                console.log('发送请求', this.rows);

            }, 500);
            
        },
        addBtns(rows, type) {
            if(type === 'top') {
                return rows.map(item=> {
                    if(item.hasTop) {
                        item.items = [
                            {
                                key: 'cancelTop',
                                desc: '取消置顶'
                            }, {
                                key: 'delete',
                                desc: '删除'
                            }
                        ];
                    } else {
                        item.items = [
                            {
                                key: 'top',
                                desc: '置顶'
                            }, {
                                key: 'edit',
                                desc: '编辑'
                            }, {
                                key: 'delete',
                                desc: '删除'
                            }
                        ];
                    }
                    return item;
                })
            }
            if(type === 'all') {
                return rows.map(item=> {
                    if(item.open) {
                        item.items = [
                            {
                                key: 'stop',
                                desc: '禁言'
                            }, {
                                key: 'delete',
                                desc: '删除'
                            }
                        ];
                    } else {
                        item.items = [
                            {
                                key: 'open',
                                desc: '取消禁言'
                            }, {
                                key: 'delete',
                                desc: '删除'
                            }
                        ];
                    }
                    return item;
                })
            }
        },
        handleTableCell(type, row, index) {
            console.log(777, type, row, index)
            switch (type) {
                case 'cancelTop': 
                    break;
                case 'top': 
                    break;
                case 'edit': 
                    break;
                case 'stop': 
                    break;
                case 'open': 
                    break;
                case 'delete': 
                    break;
            }
        },
    },
    created() {
        this._query()
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
        
        this.topColumns = [
            {
                prop: 'partment',
                label: '部门'
            }, {
                prop: 'name',
                label: '员工',
                headerKey: 'headerUrl',
                codeKey: 'code',
                nameKey: 'name',
                component: HeaderInfo
            }, {
                prop: 'content',
                label: '置顶内容'
            }, {
                prop: 'time',
                label: '置顶时间'
            }, {
                prop: 'id',
                label: '操作',
                btnType: 'link',
                width: '150px',
                component: ButtonCell
            }
        ];

        this.allColumns = [
            {
                prop: 'partment',
                label: '部门'
            }, {
                prop: 'name',
                label: '员工',
                headerKey: 'headerUrl',
                codeKey: 'code',
                nameKey: 'name',
                component: HeaderInfo
            }, {
                prop: 'content',
                label: '留言内容'
            }, {
                prop: 'time',
                label: '发送时间'
            }, {
                prop: 'id',
                label: '操作',
                btnType: 'link',
                width: '150px',
                component: ButtonCell
            }
        ];
        
    },
    components: {Table, ButtonCell, HeaderInfo}
}
</script>

<style lang="scss">
.view_msg_page{
    width: 100%;
    height: 100%;
    .title{
        font-size: 26px;
        line-height: 2.5;
    }
    .demo-form-inline{
        margin-top: 20px;
    }
    .el-tabs--top{
        margin-left: -32px;
        margin-right: -32px;
        margin-top: -20px;
        
    }
    .el-tabs__nav-scroll{
        padding-left: 20px;
    }
    .el-tabs__item.is-active {
        background: transparent;
    }
}
</style>