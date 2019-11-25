<template>
    <div class="empty">
        <img :src="imgs[img||'default']" alt="">
        <p class="empty_text" v-if="text">{{text}}</p>
    </div>
</template>

<script>
export default {
  name: 'empty',
  data() {
      return {
          imgs: {
              suo: require('@/assets/images/wuquanxian@2x.png'),
              default: require('@/assets/images/shiping_kong.png')
          }
      }
  },
  props: {
    img: {
        type: String,
        default: ''
    },
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
    text-align: center;
    img{
        width: 29.867vw;
        margin: 0 auto;
    }
    .empty_text{
        padding-top: 27px;
        font-size:16px;
        color:rgba(24,34,56,1);
        line-height:22px;
    }
}


</style>
