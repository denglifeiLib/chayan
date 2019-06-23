<template>
    <el-dialog title="添加子账号" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false" :modal="true" width="500px">
        <div class="content">
            <el-form :model="form" label-width="80px" >
                <el-form-item label="账户" v-if="form.type !=='password'">
                    <el-input v-model="form.accountName" placeholder="请输入账号" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" v-if="form.type==='add' || form.type==='password'">
                    <el-input v-model="form.password"  placeholder="请输入密码" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" v-if="form.type==='password'">
                    <el-input v-model="form.password2"  placeholder="请重复输入密码" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="角色" v-if="form.type !=='password'">
                    <el-select v-model="form.role" label="活动名称"  size="medium" placeholder="请选择角色" style="width:100%">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="渠道管理" value="channel_m"></el-option>
                        <el-option label="客服" value="server"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" v-if="form.type !=='password'">
                    <el-input v-model="form.email"  placeholder="请输入邮箱" size="medium"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>


<script>

export default {
  name: 'StrategyTemplate',
  data() {
      return {
          formLabelWidth: '140px'
      }
  },
  props: {
    form: {
      type: Object,
      default: ()=> {}
    }
  },
  methods: {
    save(type) {
        // const loading = this.$loading({background:'rgba(0,0,0,0)'});
        // setTimeout(() => {
        //     console.log('发送请求', this.form);
        //     loading.close();
        //     this.close()
        // }, 500);
        this.$emit('callback', this.form)
    },
    handleRemove(index) {
        this.form.tableData.splice(index, 1);
        console.log(this.form.tableData)
    },
    save(type) {
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            console.log('发送请求', this.form);
            loading.close();
            this.close()
        }, 500);
    },
    close() {
        this.form.dialogVisible = false;
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.content{
    width: 400px;
    margin: 0 auto;
}
</style>
