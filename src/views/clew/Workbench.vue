<template>
  <div>
    <!-- tabs -->
    <el-tabs v-model="type" type="card" @tab-click="changeTrendTab">
        <el-tab-pane label="未处理" name="unhandle"></el-tab-pane>
        <el-tab-pane label="已处理" name="handled"></el-tab-pane>
    </el-tabs>
    <!-- tab content -->
    <div class="list-wrapper">
        <!-- 搜索form -->
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchForm.keyWord" placeholder="请输入关键词" size="medium" style="width: 240px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="searchForm.channel" placeholder="选择渠道来源" size="medium">
                    <el-option label="手机动态验证码" value="dtm"></el-option>
                    <el-option label="账号密码" value="ma"></el-option>
                    <el-option label="扫码" value="sm"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="searchForm.clewType" placeholder="选择线索类型" size="medium">
                    <el-option label="选择线索类型" value="1"></el-option>
                    <el-option label="品牌公关线索" value="0"></el-option>
                    <el-option label="调研线索" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="el-icon-search" size="medium">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 操作按钮 -->
        <div class="action_btns">
            <el-button plain icon="el-icon-download" @click="download" size="medium">导出</el-button>
            <el-button type="danger" plain @click="deleteRow" size="medium">删除</el-button>
            <el-button type="primary" @click="tuoguanList" size="medium">托管</el-button>
        </div>
        <!-- table列表 -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @filter-change="filterAction"
            border
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="channelName" label="渠道名称" >
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="" class="list_icon">
                    {{scope.row.channelName}}
                </template>
            </el-table-column>
            <el-table-column prop="catchTime" label="抓取时间" sortable></el-table-column>
            <el-table-column 
                label="线索类型" 
                :filter-multiple="false"
                filter-placement="bottom-start"
                prop="clewType"
                align="center"
                column-key="clewType"
                :filters="[{text:'选择线索类型',value:'1'},{text:'品牌公关线索',value:'0'},{text:'调研线索',value:'2'}]">
                <template slot-scope="scope">
                    <span>{{ ({'1': '选择线索类型','0': '品牌公关线索','2':'调研线索'})[scope.row.clewType]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
        </el-table>
        <!-- 翻页 -->
        <div class="mt24">
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
    <!-- 问答 -->
    <div style="text-align:right" @click="answerInfo.contextType = (answerInfo.contextType === 'context_2' ? 'context' : 'context_2')">切换上下文情况</div>
    <div class="qa_wrap clearfix">
        <el-row :gutter="0">
            <!-- 问题 -->
            <el-col :md="13" :sm="24">
                <div class="question_wrap">
                    <div class="header">
                        <icon name="Chat" scale="2.5"/>
                        <strong>问题</strong>
                        <el-button type="text" class="copy" @click="copyAction">复制问题URL</el-button>
                    </div>
                    <div class="question">
                        {{questionsInfo.question}}
                    </div>
                    <div class="editor_area">
                        <Editor ref="editor" :content="questionsInfo.editorContent" @change="editorChange"></Editor>
                        <div class="editor_btns">
                            <el-popover
                                placement="top-start"
                                width="200"
                                trigger="hover"
                                content="悬浮出来，什么是托管解释">
                                <el-button size="small" slot="reference" @click="DepositeAction(true)"><icon name="tuoguanjiqiren" scale="1.9"/><div>托管</div></el-button>
                            </el-popover>
                            <el-button type="primary" @click="sendAnswer" :disabled="!questionsInfo.editorContent" style="margin-left:16px;">发送</el-button>
                        </div>
                        <div class="tuoguan" v-show="questionsInfo.isDeposited">
                            <span>已开启自动托管回答</span>
                            <el-button type="primary" size="small" @click="DepositeAction(false)">取消托管</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <!-- 答案 -->
            <el-col :md="11" :sm="24">
                <div class="answer_wrap">
                    <div class="refresh" @click="refreshAnswer">
                        <span id="fresh"><icon name="icon_refresh" scale="2"/></span>
                        <el-button type="text">刷新</el-button>
                    </div>
                    <el-tabs v-model="type">
                        <el-tab-pane name="unhandle">
                            <span slot="label"><icon name="Like" scale="2.5"/>推荐答案</span>
                            <div class="answer">
                                <div v-for="(item,index) in answerInfo.suggest" :key="index">
                                    <h3>
                                        <strong class="">推荐{{toChinesNum(index+1)}} </strong>
                                        <el-button type="text" @click="useSuggestion(item.id)">选择</el-button>
                                    </h3>
                                    <div v-html="item.content"></div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="handled">
                            <span slot="label">上下文</span>
                            <div class="answer" v-html="answerInfo.context" v-if="answerInfo.contextType==='context'"></div>
                            <div class="answer" v-else-if="answerInfo.contextType==='context_2'">
                                <div class="items" v-for="(item,index) in answerInfo.context_2" :key="index">
                                    <div class="user_info">
                                        <span class="name">{{item.name}}</span>
                                        <span class="time">{{item.time}}</span>
                                    </div>
                                    <div class="content" v-html="item.content"></div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import Editor from '@/components/Editor';

export default {
    name: 'Workbench',
    data () {
        return {
            type: 'unhandle',//未处理 已处理
           searchForm: {
               keyWord: '',
               channel: '',
               clewType: '',
               pageSize: 15,
               page: 1
           },
           selectedRows: [],
           questionsInfo: {
               url: '问题URL',
               question: '日本动画监督有从漫画、编剧转行的，有从动画师、原画师做起的，这两种监督制作动画或对动画看法是怎样的？',
               isDeposited: false, // 托管了
               disabled: true,
               editorContent: ''
           },
           answerInfo: {
               contextType: 'context_2',
               context: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p><p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p><p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p><p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p><p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p><p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>',
               context_2: [
                   {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }, {
                       name: '昵称昵称',
                       time: '2019-03-15 16:00',
                       content: '谢谢安利，vllo没用过，回头试试，我自己喜欢用vn，好上手，可以踩点，缺点是转场和字体比较少'
                   }
               ],
               suggest: [
                   {
                       id: 10,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 11,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 12,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 13,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 14,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 15,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 17,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }, {
                       id: 18,
                       content: '<p>这个问题问的就很容易歪题，要想聊到一些有价值的东西必然会歪到具体某个动画人或者行业历史因素身上，从而脱离了围绕监督这个身份所该涉及的范围。因为题目涉及的元素过多过杂，我觉得题目描述里的疑问和题目之间甚至没有什么逻辑关系，我读了好几次也没太能理解到题主核心提问是什么，所以我想在这里对这个有点空泛的题目捋清一些东西</p>'
                   }
               ]
           }
        };
    },
    methods: {
        _query() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            console.log('发送请求', this.searchForm);
        },
        onSubmit() {
            alert('search')
        },
        download() {
            alert('download')
        },
        deleteRow() {
            if(this.selectedRows.length===0){
                this.$confirm('请选则要删除的行?', '提示', {
                    showCancelButton: false
                }).then(()=> {

                })
                return ; 
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(2222, this.selectedRows)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        tuoguanList() {
            if(this.selectedRows.length===0){
                this.$confirm('请选则要删除的行?', '提示', {
                    showCancelButton: false
                }).then(()=> {

                })
                return ; 
            }
            alert('tuoguanList')
        },
        handleSelectionChange(arr) {
            this.selectedRows = arr;
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
        filterAction(value) {
            console.log(value)
        }, 
        confirm() {
            alert('confirm')
        },
        changeTrendTab(obj) {
            console.log(2222, this.type);
            this.searchForm = {
               keyWord: '',
               channel: '',
               clewType: '',
               pageSize: 15,
               page: 1
            };
            this.selectedRows = [];
           this._query();
        },

        copyAction() {
            this.copyFn(this.questionsInfo.url,()=> {
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
            });
        },
        copyFn(text, callback){ // text: 要复制的内容， callback: 回调
            let tag = document.createElement('input');
            tag.setAttribute('id', 'cp_hgz_input');
            tag.value = text;
            document.getElementsByTagName('body')[0].appendChild(tag);
            document.getElementById('cp_hgz_input').select();
            document.execCommand('copy');
            document.getElementById('cp_hgz_input').remove();
            if(callback) {callback(text)}
        },

        editorChange(html) {
            this.questionsInfo.editorContent = html;
        },
        sendAnswer() {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            console.log('发送请求', this.questionsInfo.editorContent);
            setTimeout(() => {
                loading.close();
                this.questionsInfo.editorContent = '';
                this.$refs.editor.forceEmpty();
            }, 500);
            
        },
        DepositeAction(ok) {
            if(ok) {
                this.questionsInfo.isDeposited = true;
                this.$message({
                    type: 'info',
                    message: '托管success'
                });  
            } else {
                this.questionsInfo.isDeposited = false;
                this.$message({
                    type: 'info',
                    message: '取消托管success'
                });  
            }
        },
        toChinesNum(num){
            let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
            let unit = ["", "十", "百", "千", "万"];
            num = parseInt(num);
            let getWan = (temp) => {
            let strArr = temp.toString().split("").reverse();
            let newNum = "";
            for (var i = 0; i < strArr.length; i++) {
                newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
                }
                return newNum;
            }
            let overWan = Math.floor(num / 10000);
            let noWan = num % 10000;
            if (noWan.toString().length < 4) noWan = "0" + noWan;
            return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
        },
        useSuggestion(id) {
            this.$confirm('确定?').then(()=> {

                const loading = this.$loading({background:'rgba(0,0,0,0)'});
                console.log('发送请求', id);
                setTimeout(() => {
                    loading.close();
                    this.$message({
                        type: 'success',
                        message: '提交'
                    });  
                }, 500);
            }).catch(() => {
                        
            });
        },
        refreshAnswer() {
            const freshDom = document.getElementById('fresh');
            freshDom.className = 'rotation';

            setTimeout(() => {
                freshDom.className = '';
            }, 1000);
        }
    },
    created() {
        this._query();
        this.tableData = [
            {
                channelName: '百度贴吧',
                icon: require('@/assets/images/logo_1.jpg'),
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '0',
                operator: '俞开渊',
            }, {
                channelName: '百度贴吧',
                icon: require('@/assets/images/logo_2.jpg'),
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '1',
                operator: '俞开渊',
            }, {
                channelName: '百度贴吧',
                icon: require('@/assets/images/logo_3.jpeg'),
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '2',
                operator: '俞开渊',
            }, {
                channelName: '百度贴吧',
                icon: require('@/assets/images/logo_1.jpg'),
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '0',
                operator: '',
            }, {
                channelName: '百度贴吧',
                icon: require('@/assets/images/logo_2.jpg'),
                account: 'qwertyuiop123456789',
                catchTime: '2019-03-08 23:12:00',
                title: '奥迪A8和宝马7系怎么选？',
                clewType: '1',
                operator: '',
            }
        ];
    },
    components: { Icon, Editor },
}
</script>
<style lang="scss">
    .list-wrapper{
        padding: 20px;
        background: #fff;
        border-radius:2px;
        .action_btns{
            padding-bottom: 22px;
        }
        .list_icon{
            width: 32px;
            vertical-align: middle;
        }
        .logo_wrap{
            padding-bottom: 50px;
            color: #000;
            font-size: 20px;
            text-align: center;
            .logo{
                width: 40px;
                height: 40px;
                vertical-align: middle;
            }
        }
    }

    .qa_wrap{
        margin-top: 17px;
        background: #fff;
        border-top: 1px solid #EBEEF5;
        border-left: 1px solid #EBEEF5;
        .question_wrap{
            height: 503px;
            border-right: solid 1px #DCDFE6;
            border-bottom: solid 1px #DCDFE6;
            .header{
                padding: 0 24px;
                height: 46px;
                display: flex;
                align-items: center;
                strong{
                    font-weight: bold;
                    font-size:16px;
                    color:rgba(0,0,0,0.85);
                    margin: 0 24px 0 14px;
                }
                .copy{
                    font-size:14px;
                    color:rgba(2,133,255,1);
                }
            }
            .question{
                font-size:16px;
                color:rgba(0,0,0,0.85);
                line-height:26px;
                padding: 0 16px 55px 60px;
            }
        }
        .answer_wrap{
            position: relative;
            height: 503px;
            border-right: solid 1px #DCDFE6;
            border-bottom: solid 1px #DCDFE6;
            .el-tabs__nav{
                width: 100%;
                .el-tabs__item{
                    width: 50%;
                    padding: 0;
                    text-align: center;
                    background: #fff;
                    border-bottom: 1px solid #EBEEF5;
                    svg{
                        vertical-align: sub;
                        margin-right: 5px;
                    }
                }
                .el-tabs__active-bar{
                    width: 50%!important;
                }
            }
            .answer{
                padding: 60px 15px 15px;
                height: 463px;
                overflow-y: scroll;
                p{
                    font-size:14px;
                    color:rgba(0,0,0,0.65);
                    line-height:22px;
                    padding-bottom: 12px;
                }
                h3 strong{
                    font-size: 16px;
                    padding-right: 17px;
                    color:rgba(0,0,0,0.85);
                    padding-bottom: 8px;
                }
                .items{
                    .user_info{
                        display: flex;
                        height:29px;
                        background:rgba(242,246,252,1);
                        border-radius:2px;
                        padding: 0 16px;
                        align-items: center;
                        justify-content: space-between;
                        .name{
                            font-size:12px;
                            color:rgba(24,144,255,1);
                        }
                        .time{
                            font-size:12px;
                            color:rgba(144,147,153,1);
                        }
                    }
                    .content{
                        padding: 12px 16px 40px;
                        color:rgba(96,98,102,1);
                    }
                }
            }
            .refresh{
                position: absolute;
                left: 0;
                right: 0;
                top: 40px;
                height: 45px;
                background:#F6F7FB;
                border-radius:2px;
                font-size: 14px;
                color:#0285FF;
                line-height: 45px;
                z-index: 1212;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                #fresh{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 20px;
                    padding: 5px;
                }
                #fresh.rotation{
                    animation: myrotate .45s infinite linear;
                }
            }
        }
        .editor_area{
            position: relative;
            .editor_btns{
                display: flex;
                padding: 10px 16px;
                align-items: center;
                justify-content: flex-end;
                button span{
                    display: flex;
                    align-items: center;
                    div{
                        padding: 6px 0 4px 5px;
                    }
                }
            }
            .tuoguan{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                padding: 70px 30px;
                z-index: 20000;
                background: rgba(255, 255, 255, .7) url('../../assets/images/editor_bg.png') center 37% no-repeat;
                > span{
                    line-height: 32px;
                    padding-right: 10px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #303133;
                }
            }
        }
    }
    @keyframes myrotate {
        0% {
            transform:rotate(0deg);
        }
        100% {
            transform:rotate(360deg);
        }
    }
</style>
