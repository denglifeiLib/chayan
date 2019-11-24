<template>
    <div class="empty">
        <img :src="require('@/assets/images/shiping_kong.png')" alt="">
        <p class="empty_text" v-if="text">{{text}}</p>
    </div>
</template>

<script>
export default {
  name: 'empty',
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
.empty{
    width: 32vw;
    margin: 0 auto;
    .empty_text{
        padding-top: 27px;
        text-align: center;
        font-size:16px;
        color:rgba(24,34,56,1);
        line-height:22px;
    }
}


</style>
