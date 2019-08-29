<template>
  <div class="x-bar">
    <div :id="id"
    :option="option" style="width:100%;height:304px;"></div>
  </div>
</template>

<script>

import HighCharts from 'highcharts';
export default {
  name: 'HighCharts',
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
  },
  mounted() {
    HighCharts.chart(this.id,this.option)
  }

}
</script>

<style lang="scss" scoped>

</style>
