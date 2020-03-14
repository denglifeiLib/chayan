<template>
    <el-dialog title="爬虫数据" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false">
        <div class="item">
            <span class="label">事件来源微信群</span>
            <img :src="form.icon" alt="" class="list_icon">
            <span>{{form.source}}</span>
            <span class="fr">时间触发时间：{{form.triggerTime}}</span>
        </div>
        <div class="msg_list">
            <div v-for="(item,i) in form.chat" :key="i">
                <div :class="['msg1', item.user === '1' ? 'self' : '']">
                    <p class="time" v-if="item.time">{{item.time}}</p>
                    <img src="../assets/images/p_header.jpg" alt="" class="hd_img">
                    <div class="info_box">
                        <p class="name">{{item.userName}}</p>
                        <div class="msg">{{item.msg}}</div>
                    </div>
                </div>
            </div>
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

.item{
    padding:10px 0;
    .label{
        margin-right: 32px;
        
    }
    // .el-input{
    //     width: 240px;
    // }
}

.msg_list{
    padding: 0 25px;
    margin-top: 10px;
    width: 100%;
    height:425px;
    background:rgba(242,242,242,1);
    overflow-y: scroll;
    .msg1{
        padding: 17px 0;
        overflow: hidden;
        .time{
            padding: 10px 0;
            text-align: center;
        }
        .hd_img{
            width: 41px;
            height: 41px;
            border-radius:4px;
            margin-right: 10px;
            float: left;
        }
        .info_box{
            float: left;
            overflow: hidden;
            .msg{
                min-height: 37px;
                margin-top: 2px;
                color:rgba(48,49,51,1);
                line-height:17px;
                padding: 10px 15px;
                background: #fff;
                border-radius:4px;
            }
        }
        &.self {
            .hd_img {
                float: right;
                margin-right: 0;
                margin-left: 10px;
            }
            .info_box {
                float: right;
                .msg{
                    background: #95EC69;
                }
                
            }
        }
    }
}

</style>
