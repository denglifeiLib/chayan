<template>
    <el-dialog title="项目设置" :center="true" :visible=" show" width="660px" :before-close="handleClose" class="project_set_dialog">
        <div class="con_box clearfix">
            <ul class="left">
                <li :class="active === 0 ? 'active' : ''" @click="active=0">项目信息</li>
                <li :class="active === 1 ? 'active' : ''" @click="active=1">项目操作</li>
            </ul>
            <ul class="right" v-show="active === 0 ">
                <li>
                    <p class="label">项目封面</p>
                    <img :src="poster" alt="" class="poster">
                    <span class="upload_btn">
                        上传新封面
                        <input type="file" class="upload_btn">
                    </span>
                </li>
                <li>
                    <el-row :gutter="46">
                        <el-col :span="12">
                            <p class="label">项目名称</p>
                            <el-input v-model="name" placeholder="请输入项目名称" style="width:212px;"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <p class="label">项目分组</p>
                            <el-select v-model="catogrey" filterable placeholder="请选择项目分组" style="width:212px;">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </li>
                <li>
                    <p class="label">项目简介</p>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="介绍一下这个项目"
                        v-model="describe">
                    </el-input>
                </li>
            </ul>
            <ul class="right" v-show="active === 1 ">
                <li>
                    <p class="label">您可以进行如下操作</p>
                    <div class="operate_btn">
                        <el-button class="cus_primary" @click="showConfirm('add')">添加到模板</el-button>
                        <el-button class="cus_primary" @click="showConfirm('classify')">归档项目</el-button>
                        <el-button class="cus_danger" type="danger" @click="showConfirm('delete')">移至回收站</el-button>
                    </div>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script>
import cardList from '@/components/cardList';

export default {
    name: "ProjectSetDialog",
    data() {
        return {
            active: 0,
            poster: require('../assets/images/default_pro_img.png'),
            name: '',
            catogrey: '',
            describe: '',
            options: [
                {
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项ee',
                label: '双'
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
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                this.$emit('close')
                done();
            }).catch(_ => {});
        },
        showConfirm(type) {
            let tips = '';
            let btnTxt = '';
            if(type==='add') {
                tips = '将【建筑项目】添加到模板，本项目和所含信息将会被复制到【模板项目】内，之后可作为模板流程使用。';
                btnTxt = '添加到模板';
            }
            if(type==='classify') {
                tips = '一旦将【建筑项目】归档，本项目和所含信息将会被移到【归档项目】内，其中的内容依然会被通缉和搜索收录，归档项目可以随时回复并继续使用。';
                btnTxt = '归档';
            }
            if(type==='delete') {
                tips = '一旦将【建筑项目】移到回收站，所有与项目有关的信息将会被移到回收站，其中的内容也不会被统计和搜索记录，需要去回收站恢复后才能继续使用。';
                btnTxt = '移至回收站';
            }
            this.$alert(tips, {
                customClass: 'cus_alert',
                title: btnTxt,
                confirmButtonText: btnTxt,
                confirmButtonClass: 'cus_btn',
                center: true,
                callback: ()=> {
                    this.$emit(type)
                }
            })
        }
    },
    components: { cardList }
};
</script>
<style lang="scss">
.project_set_dialog{
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
        padding: 0;
    }
    .con_box {
        .left {
            width:150px;
            height:470px;
            float:left;
            border-right: solid 1px #B3B3B3;
            li{
                padding-left: 10px;
                line-height: 50px;
                text-align: center;
                border-bottom: solid 1px #B3B3B3;
                font-size:14px;
                color:rgba(51,51,51,1);
                cursor: pointer;
                &.active{
                    padding-left: 0;
                    color: #3E90FF;
                    border-left: solid 10px #3E90FF;
                }
            }
        }
        .right{
            float: left;
            width: calc(100% - 150px);
            padding: 20px;
            li{
                padding-bottom: 28px;
                .label{
                    padding-bottom: 18px;
                    font-size:14px;
                    color:rgba(102,102,102,1);
                }
                .poster{
                    width: 184px;
                    height: 100px;
                    margin-right: 20px;
                }
                .upload_btn{
                    position: relative;
                    display: inline-block;
                    width:84px;
                    height:36px;
                    line-height: 36px;
                    border:1px solid rgba(62,144,255,1);
                    border-radius:6px;
                    font-size:14px;
                    color:rgba(62,144,255,1);
                    text-align:center;
                    vertical-align: top;
                    overflow: hidden;
                     input{
                        position: absolute;
                        font-size: 100px;
                        right: 0;
                        top: 0;
                        opacity: 0;
                        text-indent: -500px;
                     }
                     &:hover {
                        color: #409EFF;
                        // border-color: #c6e2ff;
                        background-color: #ecf5ff
                    }
                }
            }
            .operate_btn{
                padding-top: 10px;
                .cus_primary{
                    color: #E62412;
                    border-color: #E62412;
                    &:hover{
                        background: #fef0f0;
                    }
                    &:focus,&:active{
                        background: #fff;
                    }
                }
                .cus_danger{
                    background: #E62412;
                }
            }
        }
    }
}


</style>

