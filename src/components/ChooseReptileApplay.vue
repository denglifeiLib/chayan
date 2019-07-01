<template>
    <el-dialog title="选择爬虫服务" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false" :modal="true" width="1081px">
        <div class="dialog_content">
            <el-link type="primary" :underline="false">已选择爬虫服务</el-link>
            <div class="choosed_wrap search_list">
                <el-row>
                    <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="2" v-for="(item,i) in form.choosedModel" :key="i">
                        <div @click="chooseAction(item, 'cancel', i)" class="list_el">
                            <img :src="item.icon" alt="">
                            <p>{{item.name}}</p>
                            <el-link type="primary">取消</el-link>
                        </div>
                    </el-col>
                </el-row>
                <div class="nonChoosed" v-if="form.choosedModel.length===0">
                    <img src="../assets/images/empty.png" alt="">
                    <p class="empty_dis">您还没有选择任何爬虫服务</p>
                </div>
                <div class="btns">
                    <el-button @click="close()" size="medium" plain>返回</el-button>
                    <el-button  @click="save()" size="medium"  type="primary">确定</el-button>
                </div>
            </div>
            <!-- 搜索form -->
            <el-form :inline="true" :model="searchForm" class="searchForm">
                <el-form-item>
                    <el-input v-model="searchForm.name" placeholder="请输入爬虫服务名称" size="medium" style="width: 240px;"></el-input>
                </el-form-item>
                <el-button icon="el-icon-search" @click="_query" size="medium"  type="primary">搜索</el-button>
            </el-form>
            <div class="choose_list search_list">
                <el-row>
                    <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="2" v-for="(item,i) in model" :key="i">
                        <div @click="chooseAction(item, 'add')" class="list_el">
                            <img :src="item.icon" alt="">
                            <p>{{item.name}}</p>
                            <el-link type="primary">选择</el-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-dialog>
</template>


<script>

export default {
  name: 'StrategyTemplate',
  data() {
      return {
          searchForm: {
              name: ''
          },
          model: [
            {
                type: 'file',
                name: '代理服务',
                icon: require('../assets/images/p_file.png')
            }, {
                type: 'file',
                name: '代理服务',
                icon: require('../assets/images/p_file.png')
            }, {
                id: 1,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 2,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 3,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 4,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 5,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 6,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 7,
                type: 'apply',
                name: '代理服务',
                icon: require('../assets/images/logo_1.jpg')
            }, {
                id: 8,
                type: 'apply',
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
    chooseAction(item, type, i) {
       let id = item.id;
       if(type === 'cancel') {
            this.form.choosedModel.splice(i, 1)
       }
       if(type === 'add') {
            if(!id){
                this._query()
            } else {
                if(this.form.choosedModel.filter(item => item['id']===id).length === 0) {
                    this.form.choosedModel.push(item)
                }
                
            };
       }
    },
    save() {
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            console.log('发送请求', this.form);
            loading.close();
            this.close();
        }, 500);
    },
    close() {
        this.form.dialogVisible = false;
    }
  },
  components: {}
}
</script>

<style lang="scss">

.btns{
    padding-bottom: 24px;
}
.search_list{
    text-align: center;
    font-size:14px;
    padding-top: 10px;
    .list_el{
        cursor: pointer;
        margin-bottom: 28px;
    }
    img{
        width: 56px;
        height: 56px;
    }
    p{
        padding:8px 0;
    }
    .nonChoosed{
        text-align: center;
        img{
            width: 44px;
            height: 33px;
            margin-bottom: 16px;
        }
    }
}
.choosed_wrap{
    padding-top: 28px; 
}
.searchForm{
    padding-top: 20px;
    border-top: solid 1px #DCDFE6;
    text-align: center;
}
</style>
