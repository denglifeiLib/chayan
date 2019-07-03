<template>
    <div>
       <!-- tabs -->
       <div class="card_wrapper mt25">
            <h3 class="card_title">
                爬虫清单 
                <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block">
                    <el-breadcrumb-item v-for="(item,i) in breadcrumb" :key="i">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
            </h3>
            <!-- tab content -->
            <div class="card_cont">
                <!-- 搜索form -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" v-if="breadcrumb.length===1">
                    <el-form-item>
                        <el-input v-model="searchForm.name" placeholder="请输入爬虫服务名称" size="medium" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="medium" icon="el-icon-arrow-left" @click="goBack()" v-if="breadcrumb.length>1" class="back">返回</el-button>
                <!-- table列表 -->
                <div class="search_list" v-show="!showDetail">
                    <el-row>
                        <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="2" v-for="(item,i) in model" :key="i">
                            <div @click="goDeep(item)">
                                <img :src="item.icon" alt="">
                                <p>{{item.name}}</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="apply_detail" v-show="showDetail">
                    <h2>
                        赶集网搜索
                        <span class="sub"> 此渠道用于赶集网搜索——上海地区搜索，支持多关键词，可限制采集页数，不支持时间范围约束 </span>
                    </h2>
                    <div style="margin-top: 40px">
                        <el-radio-group v-model="detail_type" size="small">
                            <el-radio-button label="0">采集字段预览</el-radio-button>
                            <el-radio-button label="1">采集参数预览</el-radio-button>
                            <el-radio-button label="2">示例数据</el-radio-button>
                        </el-radio-group>
                        <div class="content">
                            <img :src="detail_img[detail_type]" alt="" class="detail_img">
                        </div>
                    </div>
                </div>
                <!-- 翻页 -->
                <div class="mt24" v-if="breadcrumb.length===1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="3"
                        :page-size="5"
                        layout="total, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'reptile_list',
    data() {
        return {
            searchForm: {
               name: '',
               pageSize: 15,
               page: 1
           },
           breadcrumb: ['全部'],
           showDetail: false,
           detail_type: '0',
           detail_img: {
               '0': require('../../../assets/images/p_header.jpg'),
               '1': require('../../../assets/images/p_header_2.jpg'),
               '2': require('../../../assets/images/p_header.jpg'),
           },
           model: [
               {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'file',
                   name: '代理服务',
                   icon: require('../../../assets/images/p_file.png')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   name: '代理服务',
                   icon: require('../../../assets/images/logo_1.jpg')
               }
           ]
        }
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                callback&&callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        queryDetail() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        goDeep(item) {
            if(item.type === 'file') {
                this._query(()=>{ this.breadcrumb.push(item.name)})
            }
            if(item.type === 'apply') {
                this.showDetail = true;
                this.getDetail(()=>{ this.breadcrumb.push(item.name)})
            }
        },
        getDetail(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
                callback&&callback()
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        goBack() {
            this.showDetail = false;
            this._query(()=>{ this.breadcrumb.splice(this.breadcrumb.length-1, 1) });
        },
        handleSizeChange(val) {
            this.searchForm.pageSize = val;
            this.searchForm.page = 1;
            this. _query();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this. _query();
            console.log(`当前页: ${val}`);
        },
        handlePopover(ref) {
            this.$refs[ref].doClose();
        },
    },
    created() {
        this._query();
        
    },
    components: {}
}
</script>

<style scoped lang="less">
.search_list{
    text-align: center;
    font-size:14px;
    padding-top: 10px;
    img{
        width: 56px;
        height: 56px;
    }
    p{
    margin-bottom: 50px;
    }
}
.back{
    margin-bottom: 24px;
}
.apply_detail{
    h2{
        font-size:20px;
        color:rgba(48,49,51,1);
        line-height:28px;
        .sub{
            padding-left: 20px;
            color:rgba(48,49,51,1);
            line-height:17px;
            font-size:12px;
            font-weight: normal;
        }
    }
    .content{
        padding-top: 40px;
        text-align: center;
    }
}
</style>