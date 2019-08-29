<template>
  <div class="circle" :style="circleStyle">
      <div class="rotate_half_circle" :style="rotatedStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'MsgNum',
  props: {
    rate: {
      type: Number,
      default: 0
    },
    diameter: {
        type: Number,
        default: 100
    }
  },
  computed: {
      circleStyle() {
          return {
              width: (this.diameter / 2) + 'px',
              height: (this.diameter / 2) + 'px',
          }
      },
      rotatedStyle() {
          let common = {
              width: (this.diameter / 4) + 'px',
              height: (this.diameter / 2) + 'px',
              marginLeft: (this.diameter / 4) + 'px',
          }
          if (this.rate >=0 && this.rate <= 50) {
              return Object.assign({}, common, {transform: `rotate(${360 * this.rate / 100}deg)`})
          }
          if (this.rate > 50 && this.rate <= 100) {
              return Object.assign({}, common, {transform: `rotate(${(360 * this.rate / 100) - 180}deg)`, backgroundColor: '#1D77DE'})
          }
          if (this.rate > 100) {
              return Object.assign({}, common, {transform: `rotate(${180}deg)`, backgroundColor: '#1D77DE'})
          }
          if (this.rate < 0) {
              return Object.assign({}, common, {transform: `rotate(${0}deg)`, backgroundColor: '#DEF5FF'})
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.circle{
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #DEF5FF;
    background-image: linear-gradient(to right, transparent 50%, #1D77DE 0);
    .rotate_half_circle{
        width: 50px;
        height: 100px;
        margin-left: 50px;
        border-radius: 0 1000px 1000px 0;
        background-color: inherit;
        transform-origin: left;
    }
}


</style>