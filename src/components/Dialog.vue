<template>
    <div class="Dialog">
        <div class="dialog_by">
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
      return{}
  },
  props: {
    text: {
        type: String,
        default: ''
    }
  },
methods: {
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.Dialog{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background:rgba(0,0,0,0.49);
    z-index: 503;
    display: flex;
    align-items: center;
    justify-content: center;
    .dialog_by{
        padding: 24px 20px;
        background: #fff;
        border-radius: 7px;
    }
}


</style>
