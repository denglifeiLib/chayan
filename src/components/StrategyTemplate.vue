<template>
    <el-dialog title="添加策略" :visible.sync="form.dialogVisible" :center="true" :close-on-click-modal="false">
        <el-form :model="form" :label-width="formLabelWidth" class="template1_form">
            <el-form-item label="所在行业">
                <el-select v-model="form.industry" label="活动名称" label-width="224px" size="medium">
                    <el-option
                        v-for="item in form.industryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="监控策略名称">
                <el-input v-model="form.name" label-width="240px" size="medium" clearable></el-input>
            </el-form-item>
            <el-form-item label="策略类型">
                <el-radio-group v-model="form.module" size="medium">
                    <el-radio border label="调研模式"><icon name="card_icon-2" scale="1.8" class="model_icon"></icon>调研模式</el-radio>
                    <el-radio border label="营销模式"><icon name="card_icon" scale="1.8" class="model_icon"></icon>营销模式</el-radio>
                </el-radio-group>
                <p>模式说明模式说明模式说明模式说明模式说明模式说明模式说明模式说明模式说明</p>
            </el-form-item>
            <el-form-item label="策略类型">
                <div class="in_b">
                    <el-radio-group v-model="form.type" size="medium">
                        <el-radio border label="type1">自动部署</el-radio>
                        <el-radio border label="type2">时段部署</el-radio>
                    </el-radio-group>
                </div>
                <div class="in_b">
                    <el-time-picker
                        is-range
                        size="medium"
                        v-model="form.start"
                        format="HH:mm"
                        range-separator="-"
                        :disabled="form.type!=='type2'"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围">
                    </el-time-picker>
                </div>
                <!-- <div class="in_b date">
                    <el-date-picker type="date" placeholder="选择开始结束时间" v-model="form.date" style="width: 100%;"  size="medium"></el-date-picker>
                </div>
                <div class="in_b line">
                    -
                </div>
                <div class="in_b time">
                    <el-time-select placeholder="00:00" v-model="form.time" style="width: 100%;" size="medium"
                        :picker-options="{
                        start: '00:01',
                        step: '00:15',
                        end: '24:00'
                        }"></el-time-select>
                </div> -->
            </el-form-item>
            <el-form-item label-width='0'>
                <p>企业/产品/品牌信息</p>
                <el-col :span="16"><el-input type="textarea" v-model="form.branch_desc"></el-input></el-col>
                <el-col :span="2">
                    <el-upload
                        class="upload-demo"
                        ref="upload1"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview(1)"
                        :on-remove="handleRemove(1)"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" plain icon="el-icon-upload2">选取文件</el-button>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label-width='0'>
                <p>产品功能性/简介/描述信息</p>
                <el-col :span="16"><el-input type="textarea" v-model="form.product_desc"></el-input></el-col>
                <el-col :span="2">
                    <el-upload
                        class="upload-demo"
                        ref="upload2"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview(2)"
                        :on-remove="handleRemove(2)"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" plain icon="el-icon-upload2">选取文件</el-button>
                    </el-upload>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="callBack('back')">返回</el-button>
            <el-button type="primary" @click="callBack('next')">下一步</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
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
    handlePreview(item) {
        console.log(item)
    },
    handleRemove(item) {
        console.log(item)
    },
    callBack(type) {
        this.$emit('callBack', type)
    }
  },
  components: {Icon}
}
</script>

<style lang="scss" scoped>
.template1_form{padding-left: 35px;}
.el-dialog__wrapper{
    background: rgba(0,0,0,.3);
    .el-input{
        width: 240px;
    }
    .el-radio:first-child{
        margin-right: 3px;
    }
    .line{
        text-align: center;
    }
    .model_icon{
        vertical-align: middle;
        margin-right: 8px;
    }
    .date{
        width: 180px;
        margin-left: 10px;
    }
    .time{
        width: 100px;
    }
    .upload-demo{
        margin-left: 10px;
        line-height: 1;
    }
    .el-form-item label{
        text-align: left;
    }
}
</style>
