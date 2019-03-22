<template>
  <span class="msg_num" v-if="num>0">{{num}}<em v-if="!isRead"></em></span>
</template>

<script>
export default {
  name: 'MsgNum',
  props: {
    isRead: {
      type: Boolean,
      default: true
    },
    num: {
      type: String,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.msg_num{
    position: relative;
    display: inline-block;
    height:28px;
    padding: 0 7px;
    font-size:17px;
    color:rgba(48,49,51,1);
    line-height:28px;
    background:rgba(242,246,252,1);
    border-radius:2px;
    text-align: center;
    em {
        position: absolute;
        top: -3px;
        right: -3px;
        width:8px;
        height:8px;
        background:rgba(255,54,54,1);
        border-radius: 50%;
    }
}

</style>
