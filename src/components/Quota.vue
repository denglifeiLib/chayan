<template>
  <div class="quota">
        <p class="type">{{item.type}}</p>
        <wv-flex :gutter="10" class="steps">
            <wv-flex-item v-for="index in +item.step" :key="index"> 
                <div :class="`${item.val == index ? (item.result==='1'?'normal':'red') : ''} step`"></div>
            </wv-flex-item>
        </wv-flex>
        <p class="result">
            {{item.result_dis}}： 
            <span :class="`${item.result==='1'?'normal':'red'} result`">{{item.result==='1'?'正常':'异常'}}</span>
        </p>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'baogao_card',
  data() {
      return {
          stepClass: 'step'
      }
  },
  props: {
    item: {
      type: Object,
      default: ()=>{}
    }
  },
  created() {

  }
}
</script>
<style scoped lang="less">
.quota{
    padding: 13px 0;
    .type{
        
    }
    .step{
        margin: 10px 0 6px;
        height:13px;
        background:linear-gradient(90deg,rgba(242,246,250,1) 0%,rgba(225,229,235,1) 100%);
        &.red{
            background:linear-gradient(90deg,rgba(252,133,120,1) 0%,rgba(246,18,19,1) 100%);
        }
        &.normal{
            background:linear-gradient(90deg,rgba(89,186,255,1) 0%,rgba(29,119,222,1) 100%);
        }
    }
    .result{
        font-size:13px;
        color:rgba(113,113,113,1);
        .red{
           color: #EA1818;
        }
        .normal{
            color:#1D77DE;
        }
    }
    &:last-child{
        padding-bottom: 0;
    }
}
</style>
