<template>
    <el-dialog title="高频事件规则配置" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false">
        <el-row>
            <el-col :span="12">
                <div class="item">
                    <span class="label">最小时间段</span>
                    <el-input-number v-model="form.timeRange" :step="1"></el-input-number>
                    分钟
                </div>
            </el-col>
            <el-col :span="12">
                <div class="item">
                    <span class="label">最少发生次数</span>
                    <el-input-number v-model="form.minTimes" :step="1"></el-input-number>
                    次
                </div>
            </el-col>
        </el-row>
        
        <div class="item">
            <span class="label">提醒消息发送手机</span>
            <el-input type="textarea" placeholder="请输入手机号，用“、”隔开…" v-model="form.msg_tip" width="100%" rows="5"></el-input>
        </div>
        <div class="item">
            <span class="label">提醒消息发送邮箱</span>
            <el-input type="textarea" placeholder="请输入邮箱，用“、”隔开…" v-model="form.email_tip" width="100%" rows="5"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'high_event_rule',
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
    save(type) {
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            console.log('发送请求', this.form);
            loading.close();
            this.close()
        }, 500);
    },
    close() {
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
    line-height: 30px;
    .label{
        margin-right: 32px;
        
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
