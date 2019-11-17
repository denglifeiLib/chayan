<template>
    <el-dialog title="创建项目" :center="true" :visible="show" width="400px" :before-close="handleClose" class="addProjectForm">
        <div class="con_box">
            <el-input placeholder="项目名称（必填）" v-model="name" clearable class="mb20"></el-input>
            <el-input 
                type="textarea" 
                :autosize="{ minRows: 2, maxRows: 4}" 
                placeholder="项目简介（选填）" 
                v-model="describe" 
                class="formEl"
                clearable
            ></el-input>
            <p class="label mb15">项目分组</p>
            <el-select v-model="catogry" multiple placeholder="请选择项目分组" style="width:356px;" class="mb15">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="width: 356px;" :disabled="!(name && catogry.length>0)" @click="queryCreate">完成并创建</el-button>
        </div>
    </el-dialog>
</template>

<script>
import cardList from '@/components/cardList';

export default {
    name: "addProjectForm",
    data() {
        return {
            name: '',
            describe: '',
            catogry: [],
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
        }
    },
    props: {
         show: {
             type: Boolean,
             default: false
         }
    },
    mounted() {
      
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                this.clearForm();
                this.$emit('close');
                done();
            }).catch(_ => {});
        },
        queryCreate() {
            this.clearForm();
            this.$emit('created');
            
        },
        clearForm() {
            this.name = '';
            this.describe = '';
            this.catogry = [];
        }
    },
    components: { cardList }
};
</script>
<style lang="scss">
.addProjectForm{
    .el-dialog__header{
        padding: 0;
        overflow: hidden;
        border-bottom: solid 1px #B3B3B3;
        .el-dialog__title{
            margin-top: 7px;
            padding: 11px 22px 18px;
            text-align: center;
            display: block;
        }
    }
    .el-dialog__body{
        padding: 23px 22px;
    }
    .con_box {
        .mb15{
            margin-bottom: 15px;
        }
        .mb20{
            margin-bottom: 20px;
        }
        .label{
            padding-top: 32px;
            font-size:14px;
        }
    }
}


</style>

