<template>
    <el-dialog title="添加子账号" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false" :modal="true" width="500px">
        <div class="content">
            <el-form :model="form" label-width="80px" >
                <el-form-item label="名称" v-if="form.type !=='password'">
                    <el-input v-model="form.row.name" placeholder="请输入名称" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="外网URL">
                    <el-input v-model="form.row.url"  placeholder="请输入外网URL" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="本地路径">
                    <el-input v-model="form.row.path"  placeholder="请输入路径" size="medium"></el-input>
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
        const loading = this.$loading({background:'rgba(0,0,0,0)'});
        setTimeout(() => {
            console.log('发送请求', this.form);
            loading.close();
            this.close();
            this.$emit('callback', 'success')
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
.content{
    width: 400px;
    margin: 0 auto;
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 104px;
        height: 104px;
        line-height: 104px;
        text-align: center;
    }
    .avatar {
        width: 104px;
        height: 104px;
        display: block;
    }
}
</style>
