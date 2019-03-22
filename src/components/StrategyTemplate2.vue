<template>
    <el-dialog title="添加策略" :visible.sync="dialogVisible.show" :center="true" :close-on-click-modal="false">
        <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
            <el-tab-pane :label="item.title" :name="`channelArray_${index}`" v-for="(item,index) in list" :key="index" @tab-click="handleClick">
                <p class="all"><span class="pr20">可选渠道</span><el-checkbox v-model="item.allChecked" @change="toggleAll(item.allChecked,index)">全选</el-checkbox></p>
                <div class="cust_item_box">
                    <el-checkbox v-model="i.checked" v-for="(i, key) in item.list" :key="key" @change="singleChange(i.checked, index)">
                        <img :src="i.icon" alt="" class="list_icon">
                        <p class="name">{{i.name}}</p>
                    </el-checkbox>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
            <el-button @click="callBack('prev')">上一步</el-button>
            <el-button type="primary" @click="callBack('confirm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'StrategyTemplate2',
  data() {
      return {
          activeTabName: 'channelArray_1'
      }
  },
  props: {
      dialogVisible: {
          type: Object,
          default: ()=>{}
      },
    list: {
      type: Array,
      default: ()=> [{list:[]}]
    }
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    callBack(type) {
        this.$emit('callBack', type)
    },
    toggleAll(val, index) {
        (this.list[index].list||[]).forEach(item => {
            item.checked = val;
        });
    },
    singleChange(val, index) {
        const listLength = (this.list[index].list||[]).length;
        const checkedArr = (this.list[index].list||[]).filter(item => {
            return item.checked;
        });
        this.list[index] && (this.list[index].allChecked = listLength === checkedArr.length);
    },
},
}
</script>

<style lang="scss" scoped>
.all{
    padding: 25px 26px;
}
</style>
