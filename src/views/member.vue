<template>
    <div class="member_page">
        <div class="all">
            <span @click="pickAll">
                <span class="job">全选</span>
                <el-checkbox v-model="all" disabled></el-checkbox>
            </span>
        </div>
        <el-collapse >
            <el-collapse-item v-for="(group,k) in members" :key="k">
                <div class="title" slot="title">
                    {{group.type}}
                    <span class="member_num">{{group.group.length+1}}人</span>
                </div>
                <div class="member_content flex_box" v-for="(member,i) in group.group" :key="`${k}_${i}`" @click="member.checked=!member.checked">
                    <div class="flex_hd">
                        <img :src="member.header" alt="" class="header_img" slot="reference">
                        <span class="name">{{member.name}}</span>
                    </div>
                    <div class="flex_bd">{{member.phone}}</div>
                    <div class="flex_ft">
                        <span class="job">{{member.job}}</span>
                        <el-checkbox v-model="member.checked" disabled></el-checkbox>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div class="btns">
            <el-button class="red_primary m_right" plain size="medium" type="danger" @click="deleteAction">删除</el-button>
            <el-button size="medium" type="primary" @click="showAddDialog=true">添加</el-button>
        </div>


        <el-dialog title="添加成员" :center="true" :visible="showAddDialog" :before-close="handleClose" width="470px" class="add_project_dialog">
            <div class="con_box">
               <div class="form_item">
                    <div class="label">姓名</div>
                    <div class="form_bd">
                        <el-input v-model="addForm.name" clearable></el-input>
                    </div>
                </div>
                <div class="form_item">
                    <div class="label">联系方式</div>
                    <div class="form_bd">
                        <el-input v-model="addForm.phone" clearable></el-input>
                    </div>
                </div>
                <div class="form_item">
                    <div class="label">岗位</div>
                    <div class="form_bd">
                        <el-input v-model="addForm.position" clearable></el-input>
                    </div>
                </div>
                <div class="form_item">
                    <div class="label">岗位</div>
                    <div class="form_bd">
                        <el-input v-model="addForm.position2" clearable></el-input>
                    </div>
                </div>
                <div class="form_item">
                    <div class="label">分组</div>
                    <div class="form_bd">
                        <el-select v-model="addForm.group" placeholder="请选择" style="width: 250px;">
                            <el-option
                            v-for="item in groupList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form_item">
                    <div class="label">新增分组</div>
                    <div class="form_bd">
                        <el-input v-model="addForm.newGroup" clearable></el-input>
                    </div>
                </div>
                <div class="btns">
                    <el-button class="blue_primary m_right" plain size="medium"  @click="handleClose">取消</el-button>
                    <el-button size="medium" type="primary" @click="addAction">添加</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import cardList from '@/components/cardList';
import ProjectSetDialog from '@/components/ProjectSetDialog';
import addProjectModel from '@/components/addProjectModel';
import addProjectForm from '@/components/addProjectForm';

export default {
    name: "project_all",
    data() {
        return {
            all: false,
            members: [
                {
                    type: '全部成员',
                    group: [
                        {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 1
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 2
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 3
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 4
                        }
                    ]
                }, {
                    type: '第一组',
                    group: [
                        {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 1
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 2
                        }
                    ]
                }, {
                    type: '第二组',
                    group: [
                        {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 1
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 2
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 3
                        }, {
                            header: require('@/assets/images/header.png'),
                            name: '某某某',
                            phone: '13456568989',
                            job: '职位/岗位',
                            checked: false,
                            id: 4
                        }
                    ]
                }
            ],
            checked: [],

            showAddDialog: false,
            addForm: {
                name: '',
                phone: '',
                position: '',
                position2: '',
                group: '',
                newGroup: '',
            },
            groupList: [
                {
                    label: '第一组',
                    value: '1'
                }, {
                    label: '第二组',
                    value: '2'
                }, {
                    label: '第三组',
                    value: '3'
                }, {
                    label: '第四组',
                    value: '4'
                }
            ]
        }
    },
    props: {

    },
    beforeCreate() {
        this.$emit('changePage', 'member')
    },
    methods: {
       pickAll() {
          this.all = !this.all;
          if(!this.all) this.checked = [];
          this.members = this.members.map(item=> {
              item.group = item.group.map(member=> {
                  member.checked = this.all;
                  this.all && this.checked.push(member.id)
                  return member;
              });
              return item;
          });
          this.checked = Array.from(new Set(this.checked));
       },
       deleteAction() {
           this.$confirm('您确定删除此成员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            });
       },
       
       addAction() {
           this.$confirm('您确定添加此成员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.showAddDialog = false;
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
            });
       },

       handleClose(done) {
           this.showAddDialog = false;
           console.log(1111, done)
           if(typeof done === "function")done();
        },
    },
    components: { cardList, ProjectSetDialog, addProjectModel, addProjectForm }
};
</script>
<style lang="scss">
.member_page{
    position: relative;
    width: 660px;
    min-height: 700px;
    padding-bottom: 90px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    .all{
        padding: 24px 53px 15px 20px;
        text-align: right;
        cursor: pointer;
    }
    .el-collapse-item__header.is-active {
        background: #F2F2F2;
    }
    .el-collapse-item__content{
        padding-bottom: 0;
    }
    .title{
        padding: 0 20px 0 70px;
        width: 100%;
        .member_num{
            float: right;
        }
    }
    .job{
        margin-right: 28px;
    }
    .member_content{
        padding: 12px 53px 12px 20px;
        color: #666;
        font-size: 16px;
        cursor: pointer;
        .header_img{
            width: 30px;
            height: 30px;
            margin-right: 24px;
            vertical-align: middle;
        }
        .flex_bd{
            text-align: center;
        }
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
        background-color: #409EFF;
        border-color: #409EFF;
        cursor: pointer;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
        color: #fff;
    }
    .el-checkbox__input.is-disabled .el-checkbox__inner{
        background-color: #fff;
        border-color: #BFBFBF;
        cursor: pointer;
    }
    .btns{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 23px;
        text-align: center;
        .m_right{
            margin-right: 150px;
        }
        button{
            width: 84px;
        }
    }


    .add_project_dialog{
        .el-dialog--center{
            max-width: 1144px;
        }
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
            padding: 33px 58px 75px;
        }
        .con_box {
            .form_item{
                margin-bottom: 15px;
                .label{
                    float: left;
                    line-height: 40px;
                    font-size:14px;
                        color:rgba(102,102,102,1);
                    &.highter{
                        line-height: 60px;
                    }
                }
                .form_bd{
                    margin-left: 104px;
                    width: 250px;
                };
            }
        }
    }
}
</style>

