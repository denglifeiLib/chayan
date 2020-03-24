<template>
    <el-switch
        :value="value"
        active-color="#13ce66"
        inactive-color="#ccc"
        :disabled="disabled || column.disabled || data.disabled"
        @change="click">
    </el-switch>
</template>

<script>
export default{
  name: 'buttonCell',
  props: {
    value: {
        type: Boolean,
        default: false
    },
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
    
  },
  methods: {
    click() {
      this.$emit('action', 'SWITCH', this.data, this.index);
    }
  }
}
</script>
<style>
  .ButtonCell button{
    margin-right: 10px;
  }
  .ButtonCell button:last-of-type{
    margin-right: 0;
  }
  .ButtonCell button[disabled]{
    background-color: #CCCCCC;
  }
</style>
