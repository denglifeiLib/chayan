<template>
    <div class="com_tasks">
        <div class="process_task_tt">
            <span class="name">{{name}}</span>
            <el-popover placement="bottom" popper-class="com_tasks_edit" v-model="showEdit">
                <div class="edit_header">列表菜单<i class="el-icon-close fr" @click="showEdit=false"></i></div>
                <ul>
                    <li @click="edit('1')">添加审核人员</li>
                    <li @click="edit('1')">重命名</li>
                    <li @click="edit('1')">在此后添加新列表</li>
                    <li @click="edit('1')">移动本列表所有任务</li>
                    <li @click="edit('1')">本列表所有任务移到回收站</li>
                    <li @click="edit('1')">删除列表</li>
                </ul>
                 <i class="el-icon-more more fr" slot="reference"></i>
            </el-popover>
        </div>
        <div class="list" v-for="(item,k) in list" :key="k">
            <el-checkbox v-model="item.checked" class="list_checkbox" disabled></el-checkbox>
            <div class="list_check_label">{{item.label}}</div>
        </div>
        <el-popover placement="bottom" popper-class="com_tasks_add" v-model="showAdd">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="任务标题"
                v-model="taskTitle">
            </el-input>
            <p class="person_num">参与人员·1</p>
            <div class="person_list">
                <img :src="joiner.header" alt="" class="" v-for="(joiner,k) in joiners" :key="k">
                <i class="el-icon-circle-plus add_per_iocn fl"></i>
            </div>
            <div class="list add" slot="reference"><i class="el-icon-plus"></i></div>
            <!-- <i class="el-icon-more more fr" slot="reference"></i> -->
        </el-popover>
        
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
export default {
    name: 'tasks',
    data() { 
        return {
            showEdit: false,
            showAdd: false,
            taskTitle: '',
            joiners: [
                {
                    header: require('@/assets/images/header.png'),
                }, {
                    header: require('@/assets/images/header.png'),
                }, {
                    header: require('@/assets/images/header.png'),
                }
            ]
        }
    },
    props: {
        name: {
            type: String
        },
        list: {
            type: Array,
            default: []
        }
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        edit(id) {
            this.showEdit = false;
            this.$emit('edit', id, this.name, this.list)
        }
    }
}
</script>

<style lang="scss">
    .com_tasks{
        .process_task_tt{
            padding-bottom: 26px;
            font-size:18px;
            color:rgba(51,51,51,1);
            .more{
                cursor: pointer;
            }
        }
        .list{
            padding: 10px 20px;
            margin-bottom: 10px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 2px 0px rgba(0, 0, 0, 0.1);
            border-radius:6px;
            overflow: hidden;
            .list_checkbox{
                padding: 12px 0;
                margin-right: 0;
                float: left;
                vertical-align: top;
            }
            .list_check_label{
                padding: 12px 0 12px 24px;
            }
            &.add {
                text-align: center;
                cursor: pointer;
                i{
                    font-size: 20px;
                    color:#666;
                    font-weight: bold;
                }
            }
        }
    }
    .com_tasks_edit{
        width: 280px;
        padding: 0;
        .edit_header{
            height: 50px;
            padding: 0 11px;
            line-height: 50px;
            font-size:18px;
            text-align: center;
            border-bottom: solid 1px #BFBFBF;
            i{
                display: inline-block;
                line-height: 50px;
                font-size:18px;
                cursor: pointer;
                font-weight: bold;
            }
        }
        ul{
            padding-bottom: 10px;
        }
        li{
            padding: 0 40px;
            height:40px;
            line-height: 40px;
            font-size: 14px;
            cursor: pointer;
            &:hover{
                background:rgba(242,242,242,1);
            }
        }
    }
    .com_tasks_add{
        width: 300px;
        padding: 20px;
        font-size:14px;
        .person_num{
            padding: 20px 0 13px;
        }
        .person_list{
            overflow: hidden;
            img{
                width: 20px;
                float: left;
                margin-right: 12px;
            }
        }
        .add_per_iocn{
            font-size: 22px;
            color: #3E90FF;
            cursor: pointer;
        }
    }
</style>