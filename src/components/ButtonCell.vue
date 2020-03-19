<template>
  <section class="ButtonCell">
      <el-button 
        size="small" 
        v-for="(item,index) in data[column.listKey || 'items']" :key="index" 
        @click="click(item)"
        :type="item.btnType || 'primary'"
        :disabled="disabled || item.disabled"
        :size="item.size || 'mini'"
        v-if="column.btnType !== 'link'">{{item.desc}}</el-button>
        <el-link 
            v-if="column.btnType === 'link'" 
            v-for="(item,index) in data[column.listKey || 'items']" :key="index" 
            :type="item.btnType || 'primary'"
            :disabled="disabled || item.disabled"
            @click="click(item)">{{item.desc}}</el-link>
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
    },
    column: {
        type: Object,
        default: ()=> { return {} }
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
