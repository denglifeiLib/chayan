<template>
  <div class="status_card">
        <div :class="['top', isHover?'hover':'']" @mouseover="isHover=true"  @mouseout="isHover=false">
            <div class="clearfix">
                <el-tooltip content="errorTips" placement="top" :disabled="item.status!=='error'" v-model="isHover">
                    <div class="stutas_dis" :style="{color: statusMap[item.status].color}">
                        {{statusMap[item.status].text}}

                        <icon :name="statusMap[item.status].iconName" scale="1.8" class="model_icon"></icon>
                    </div>
                </el-tooltip>
            </div>
            <h4 class="title">{{item.title}}</h4>
            <p class="set_time">
                <span class="set">部署</span>
                <span class="time">{{item.time}}</span>
            </p>
            <div class="eadit_btn" @click="edit">
                <el-button type="primary" size="medium" icon="el-icon-edit-outline">编辑</el-button>
            </div>
        </div>
        <div class="clearfix switch_box">
            <icon :name="typeMap[item.type].iconName" scale="2" class="model_icon"></icon>
            {{typeMap[item.type].text}}
            <div class="fr">
                <el-switch v-model="item.value" active-color="#02E1A0" inactive-color="#EBEEF5" :width="40" :disabled="item.disabled"/>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'StatusCard',
  data() {
      return {
           isHover: false,
           typeMap: {
               '1': {
                   text: '调研模式',
                   iconName: 'card_icon-2'
                },
                '2': {
                   text: '营销模式',
                   iconName: 'card_icon'
                },
                '3': {
                   text: '监控模式',
                   iconName: 'card_icon-3'
                }
           },
           statusMap: {
               'normal': {
                   text: '正常',
                   color: '#00CD91',
                   iconName: 'icon_success'
                },
                'error': {
                   text: '异常',
                   color: '#FF3636',
                   iconName: 'error'
                },
                'wait': {
                   text: '待审核',
                   color: '#6C83A6',
                   iconName: 'icon_audit'
                },
                'pause': {
                   text: '暂停',
                   color: '#F0BD2B',
                   iconName: 'icon_suspend'
                }
           }
      }
  },
  props: {
    // type: {
    //   type: String,
    //   default: '1'
    // },
    // status: {
    //   type: String,
    //   default: 'normal'
    // },
    // title: {
    //   type: String,
    //   default: '汽车行业用户调研'
    // },
    // time: {
    //   type: String,
    //   default: '2019-02-20 19:00'
    // },
    // errorTips: {
    //   type: String,
    //   default: 'errorTips'
    // },
    // value: {
    //   type: Boolean,
    //   default: true
    // },
    // disabled: {
    //   type: Boolean,
    //   default: true
    // }
    item: {
        type: Object,
        default: ()=> {}
    }
  },
  methods: {
      edit(item, index) {
          this.$emit('showEdit');
      }
  },
  components: {Icon}
}
</script>

<style lang="scss" scoped>
    .status_card{
        // width:266px;
        width:100%;
        // height:192px;
        padding: 0 12px;
        background:rgba(255,255,255,1);
        border-radius:6px;
        border:1px solid rgba(220,223,230,1);
        .top{
            position: relative;
            padding-top: 16px;
            &.hover .eadit_btn{
                display: block;
            }
        }
        .stutas_dis{
            font-size:16px;
        }
        .el-tooltip{
            float: right;
        }
        .title{
            padding-top: 15px;
            font-size:18px;
            font-weight:500;
            color:#303133;
            line-height:25px;
        }
        .set_time{
            padding: 2px 0 30px;
            color:#909399;
            border-bottom: solid 1px #EBEEF5;
            padding-right: 6px;
        }
        .switch_box{
            font-size: 15px;
            color: #303133;
            padding: 18px 0;
        }
        .model_icon{
            vertical-align: middle;
        }
        .eadit_btn{
            display: none;
            position: absolute;
            top: 0;
            right: -12px;
            bottom: 0;
            left: -12px;
            .el-button{
                display: block;
                margin: 48px auto;
                box-shadow:0px 1px 8px 0px rgba(15,82,145,0.5);
            }
        }
    }

</style>
