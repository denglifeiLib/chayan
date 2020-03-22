<template>
  <section class="header_info flex_box">
      <img :src="data[column.headerKey || 'header']" alt="" class="header">
      <p class="info">
          {{data[column.codeKey || 'code']}}
          <br>
          {{data[column.nameKey || 'name']}}
    </p>
  </section>
</template>

<script>
export default{
  name: 'header_info',
  props: {
    data: {
      type: Object,
      default: ()=> { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: {
        type: Number,
        default: 0
    },
    column: {
        type: Object,
        default: ()=> { return {} }
    }
  },
  created(){
    console.log(99999, this.data, this.column)
  },
  methods: {
    click({key}) {
      this.$emit('action', key, this.data, this.index);
    }
  }
}
</script>
<style lang="scss" scoped>
  .header_info {
      justify-content: center;
      .header{
          width: 28px;
          height: 28px;
          border-radius: 28px;
          margin-right: 8px;
      }
      .info{
          text-align: left;
      }
  }
</style>
