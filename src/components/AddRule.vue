<template>
    <el-dialog title="添加策略" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false">
        <div class="item">
            <span class="label">监控策略名称</span>
            <el-input v-model="form.name" label-width="240px" size="medium" clearable></el-input>
            <el-tooltip class="item" placement="bottom" popper-class="add_prop"  effect="light">
                <el-link type="warning" href="javascript:;" :underline="false"><i class="el-icon-info"></i>设置说明</el-link>
                <dl slot="content">
                    <dt>1、设置规则名称：</dt>
                    <dd>这个名称用于定义一个监控事件的名称，可用代表性问题，如"老师，报了个问题，请处理"</dd>
                    <dt>2、监控规则及回复定义：</dt>
                    <dd>
                        <p> 1）、正则表达式：请设置一个正则表达式匹配用户所发送的所有同义问法，用户可能的问法：1、请问这个提示是什么意思？ 2、老师有没有碰到过这样的情况，怎么办？ 3、系统有问题么，有没有老师处理呢？ </p>
                        <p>2）、出现结果：匹配正则表达式可能出现匹配或不匹配的两种结果，这里可以设置多种响应方案</p>
                        <p>3）、响应结果：可以配置自动回复，回复内容可根据正则表达式及匹配结果来设置</p>
                    </dd>
                    <dt>3、监控处理流程</dt>
                    <dd>
                        <el-row>
                            <el-col :span="4" :offset="1"><div class="flow">用户发言</div></el-col>
                            <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
                            <el-col :span="4"><div class="flow">系统匹配所有正则表达式</div></el-col>
                            <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
                            <el-col :span="4"><div class="flow">匹配成功后调入处理方案</div></el-col>
                            <el-col :span="2"><i class="el-icon-arrow-right"></i></el-col>
                            <el-col :span="4"><div class="flow">系统自动回复处理内容</div></el-col>
                        </el-row>
                    </dd>
                </dl>
            </el-tooltip>
        </div>
        <div class="item">
            <span class="label">监控规则及回复</span>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">新增一行</el-button>
        </div>
        <!-- table列表 -->
            <el-table
                ref="multipleTable"
                :data="form.tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border>
                <el-table-column type="index" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="regexp" label="正则表达式" align="center" width="200">
                    <template slot-scope="scope">
                        <el-input type="textarea" v-model="scope.row.regexp"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="result" label="期望结果" align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.result">
                            <el-option label="匹配" value="1"></el-option>
                            <el-option label="不匹配" value="0"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="clewType" label="响应方案"  width="300" align="center">
                    <template slot-scope="scope">
                        <div class="respone_area clear">
                            <el-select v-model="scope.row.respone" class="fl">
                                <el-option label="自动回复" value="1"></el-option>
                            </el-select>
                            <el-input type="textarea" v-model="scope.row.responeText" class="fl"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" slot="reference" :style="{color:scope.row.role==='manager'?'#C0C4CC':'#F56C6C'}" :disabled="scope.row.role==='manager'" @click="handleRemove(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'StrategyTemplate',
  data() {
      return {
          formLabelWidth: '140px'
      }
  },
  props: {
    form: {
      type: Object,
      default: ()=> {}
    }
  },
  methods: {
    add() {
        this.form.tableData.push({
                    regexp: '老师，报了个问题',
                    result: '0',
                    respone: '1',
                    responeText: '老师，收到，请稍等'
                })
        console.log(this.form.tableData)
    },
    handleRemove(index) {
        this.form.tableData.splice(index, 1);
        console.log(this.form.tableData)
    },
    save(type) {
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            console.log('发送请求', this.form);
            loading.close();
            this.close()
        }, 500);
    },
    close() {
        this.form.tableData = [{
                    regexp: '老师，报了个问题',
                    result: '0',
                    respone: '1',
                    responeText: '老师，收到，请稍等'
                }];
        this.form.dialogVisible = false;
    }
  },
  components: {Icon}
}
</script>

<style lang="scss">
.template1_form{padding-left: 35px;}
.el-dialog__wrapper{
    background: rgba(0,0,0,.3);
    
}
.item{
    padding:10px 0;
    .label{
        margin-right: 32px;
        
    }
    .el-input{
        width: 240px;
    }
}
.respone_area > div{
    display: inline-block;
    width: 120px;
    &.el-textarea{
        width: 158px;
        margin-left: -1px;
    }
}

.el-tooltip__popper.is-light.add_prop{
    width:762px;
    height:467px;
    padding: 49px 37px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(0,0,0,0.15);
    border: 0;
    font-size:14px;
    line-height:22px;
    dd{
        color:#606266;
        padding-bottom: 24px;
        p{
            padding-top: 16px;
            padding-left: 19px;
        }
        .flow{
            text-align: center;
            background: #F2F6FC;
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 14px;
        }
        .el-row{
            margin-top: 16px;
        }
        .el-col-2{
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
    }
}
</style>
