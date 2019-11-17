<template>
    <div style="background: #F7F7F7;height: 100%;">
        <top-header :hideSearch="true"></top-header>
        <div class="process_page">
            <tasks v-for="(item,k) in list" :key="k" :name="item.name" :list="item.list" @edit="edit"></tasks>
            <div class="com_tasks">
                <i class="el-icon-plus plus"></i>新建任务列表
            </div>
        </div>
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
import topHeader from '@/components/topHeader.vue';
import tasks from '@/components/tasks.vue';

export default {
    name: 'test',
    data() {
        return {
            list: [
                {
                    name: '待处理',
                    list: [
                        {
                            label: '组织组织内部需求评审组织内部需求评审组织内部需求评审组织内部需求评审组织内部需求评审组织内部需求评审组织内部需求评审内部需求评审',
                            id: '1111',
                            checked: true
                        }, {
                            label: '组织内部需求评审',
                            id: '1112',
                            checked: true
                        }, {
                            label: '组织内部需求评审',
                            id: '1112',
                            checked: true
                        }
                    ]
                }, {
                    name: '进行中',
                    list: [
                        {
                            label: '组织内部需求评审',
                            id: '2111',
                            checked: false
                        }, {
                            label: '组织内部需求评审',
                            id: '2112',
                            checked: false
                        }, {
                            label: '组织内部需求评审',
                            id: '2112',
                            checked: false
                        }
                    ]
                }, {
                    name: '已完成',
                    list: []
                }
            ]
        }
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        edit(id, name, list) {
            console.log(id, name, list)
        }
    },
    components: { topHeader, tasks }
}
</script>

<style lang="scss">
    .process_page{
        max-width: 1442px;
        margin: 0 auto;
        padding: 44px 30px;
        background: #F7F7F7;
        .com_tasks{
            width: 25%;
            padding-right: 48px;
            display: inline-block;
            min-width: 250px;
            vertical-align: top;
            &:last-child{
                font-size:18px;
                cursor: pointer;
                padding-right: 0px;
                width: 24%;
                color:rgba(153,153,153,1);
                .plus{
                    padding-right: 10px;
                }
            }
        }
    }
</style>