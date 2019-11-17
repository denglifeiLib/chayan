<template>
  <div class="card_list">
      <div class="card_item" 
        v-for="(item,k) in list" 
        :key="k" 
        @mouseenter="itemKey=k"
        @mouseleave="itemKey=null"
        :style="{backgroundImage: item.image||`url(${require('../assets/images/default_pro_img.png')})`}">
          <p class="title">{{item.name}}</p>
          <p class="des">{{item.describe||''}}</p>
          <div class="tool" v-if="itemKey===k">
              <i class="el-icon-s-tools" @click="toolClick(item, 'set')" v-if="tools.indexOf('set') > -1"></i>
              <i class="el-icon-refresh-right refresh" @click="toolClick(item, 'refresh')" v-if="tools.indexOf('refresh') > -1"></i>
              <i class="el-icon-s-claim" @click="toolClick(item, 'classify')" v-if="tools.indexOf('classify') > -1"></i>
              <i class="el-icon-delete" @click="toolClick(item, 'delete')" v-if="tools.indexOf('delete') > -1"></i>
          </div>
      </div>
      <div class="card_item card_item_add" @click="addClick" v-if="hasAdd">
          <i class="el-icon-plus"></i>
          <p class="add_des">创建新项目</p>
      </div>
  </div>
</template>

<script>
export default {
    name: "cardList",
    data() {
        return {
            itemKey: null,
            list: [
                {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }
            ]
        }
    },
    props: {
        tools: {
            type: Array,
            default: []
        },
        hasAdd: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        toolClick(item, type) {
            switch(type) {
                case 'set':
                    this.$emit('setClick', item);
                    break;
                case 'refresh':
                    this.$emit('refreshClick', item);
                    break;
                case 'classify':
                    this.$emit('classifyClick', item);
                    break;
                case 'delete':
                    this.$emit('deleteClick', item);
                    break;
                default :
                    // ()=> {};
                    break;
            }
            
        },
        addClick() {
            this.$emit('addClick')
        }
    }
};
</script>
<style scoped lang="scss">
    .card_list {
        margin-left: -14px;
        display: flex;
        flex-wrap: wrap;
        .card_item{
            position: relative;
            margin: 0 0 30px 14px;
            padding: 18px 20px;
            width:260px;
            height:140px;
            color: #fff;
            border-radius:10px;
            overflow: hidden;
            .title{
                font-size:18px;
                padding-bottom: 10px;
            }
            .des{
                font-size:14px;
                line-height: 1.4;
            }
            .tool{
                position: absolute;
                top: 13px;
                right: 13px;
                font-size:18px;
                
                cursor: pointer;
                i{
                    margin-left: 5px;
                    font-weight: bold;
                    &.refresh{
                        
                        font-size:20px;
                    }
                }
            }
            &.card_item_add{
                padding-top:31px;
                text-align: center;
                color:rgba(102,102,102,1);
                background:rgba(242,242,242,1);
                i{
                    margin-bottom: 17px;
                    font-size: 29px;
                    font-weight: bold;
                }
            }
        }
    }
</style>

