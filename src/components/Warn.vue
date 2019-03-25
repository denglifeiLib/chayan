<template>
  <div class="wran" v-if="msg">
      <i class="el-icon-warning"></i>
      {{msg}}
  </div>
</template>

<script>
export default {
  name: 'Warn',
  props: {
    isRead: {
      type: Boolean,
      default: true
    },
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wran{
    padding: 9px 16px;
    background:rgba(255,251,230,1);
    border-radius:4px;
    font-size:14px;
    line-height:22px;
    border:1px solid rgba(255,229,143,1);
}

</style>
