<template>
  <section class="ButtonCell">
      <el-button 
        size="small" 
        v-for="(item,index) in data.items" :key="index" 
        @click="click(item)"
        :type="item.btnType || 'primary'"
        :disabled="disabled || item.disabled">{{item.desc}}</el-button>
  </section>
</template>

<script>
export default{
  name: 'buttonCell',
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
    }
  },
  created(){
    
  },
  methods: {
    click({key}) {
      this.$emit('action', key, this.data, this.index);
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
