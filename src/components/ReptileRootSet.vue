<template>
    <el-dialog title="配置应用访问" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" style="width: 350px;margin: 0 auto;">
            <el-form-item>
                <el-input v-model="searchForm.name" placeholder="请输入爬虫服务名称" size="medium" style="width: 240px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="msg_list">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="all">全选</el-checkbox>
            <div style="margin: 15px 0;" class="list">
                <el-checkbox-group v-model="checked" @change="handleCheckedChange">
                    <el-checkbox v-for="(item,i) in model" :label="item.id" :key="i">
                        <img :src="item.icon" alt="" class="hd_img">
                        <p>{{item.name}}</p>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <!-- 翻页 -->
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="3"
                :page-size="5"
                layout="total, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
const all = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default {
  name: 'StrategyTemplate',
  data() {
      return {
          isIndeterminate: false,
          searchForm: {
                name: '',
          },
          checkAll: false,
          checked: [],
          model: [
               {
                   type: 'file',
                   id: 1,
                   name: '代理服务',
                   icon: require('../assets/images/p_file.png')
               }, {
                   type: 'file',
                   id: 2,
                   name: '代理服务',
                   icon: require('../assets/images/p_file.png')
               }, {
                   type: 'file',
                   id: 3,
                   name: '代理服务',
                   icon: require('../assets/images/p_file.png')
               }, {
                   type: 'file',
                   id: 4,
                   name: '代理服务',
                   icon: require('../assets/images/p_file.png')
               }, {
                   type: 'file',
                   id: 5,
                   name: '代理服务',
                   icon: require('../assets/images/p_file.png')
               }, {
                   type: 'apply',
                   id: 6,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   id: 7,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   id: 8,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   id: 9,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   id: 10,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   id: 11,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }, {
                   type: 'apply',
                   id: 12,
                   name: '代理服务',
                   icon: require('../assets/images/logo_1.jpg')
               }
           ]
      }
  },
  props: {
    form: {
      type: Object,
      default: ()=> {}
    }
  },
  methods: {
    _query() {
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            loading.close();
        }, 500);
        console.log('发送请求', this.searchForm);
    },
    handleCheckAllChange(val) {
        this.checked = val ? all : [];
        this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.model.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.model.length;
    },
    handleSizeChange(val) {
        this.searchForm.pageSize = val;
        this.searchForm.page = 1;
        this. _query();
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.searchForm.page = val;
        this. _query();
        console.log(`当前页: ${val}`);
    },
    close() {
        this.form.dialogVisible = false;
    },
    save(type) {
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            console.log('发送请求', this.searchForm);
            loading.close();
            this.close()
        }, 500);
    }
  },
  components: {Icon}
}
</script>

<style lang="scss">

.item{
    padding:10px 0;
    .label{
        margin-right: 32px;
        
    }
    // .el-input{
    //     width: 240px;
    // }
}
.all{padding-left: 50px;}
.msg_list{
    margin-top: 10px;
    width: 100%;
    height:425px;
    overflow-y: scroll;
    .hd_img{
        width: 56px;
        height: 56px;
        border-radius:4px;
        margin-right: 10px;
    }
    .list{
        .el-checkbox{
            display: inline-flex;
            flex-direction: column-reverse;
            margin-right: 0;
            width: 20%;
            align-items: center;
            padding-bottom: 20px;
        }
        .el-checkbox__input{
            display: block;
            text-align: center;
            margin-top: 5px;
        }
    }
}

</style>
