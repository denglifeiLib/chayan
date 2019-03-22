<template>
    <div class="tree_wrap">
        <vue2-org-tree name="test"
            :data="data"
            :horizontal="true"
            :collapsable="collapsable"
            :render-content="renderContent"
            label-class-name="tree_label"
            @on-node-click="onNodeClick"
          />
    </div>
</template>

<script>

export default {
    name: 'Tree',
    props: {
        // chartData: {
        //   type: Object,
        //   required: true
        // }
    },
    data() {
        return {
            data: {
                id: 0,
                label: "全部",
                expand: true,
                checked: false,
                children: [
                    {
                        id: 2,
                        label: "监控策略",
                        expand: true,
                        checked: false,
                        children: [
                            {
                                id: 5,
                                checked: false,
                                label: "渠道管理"
                            },
                            {
                                id: 6,
                                checked: true,
                                label: "账号库"
                            }
                        ]
                    },
                    {
                        id: 3,
                        checked: true,
                        label: "监控策略"
                    },
                    {
                        id: 4,
                        checked: false,
                        label: "工作流管理"
                    }
                ]
            },
            collapsable: false,
            expandAll: false
        }
    },
    created() {},
    mounted() {},
    methods: {
        renderContent(h, data) {
            if(data.children && data.children.length > 0) {
                return <div>{data.label}<i class="add el-icon-circle-plus"></i></div>;
            } else {
                if(data.checked) {
                    return <div><i class="remove el-icon-remove"></i> {data.label} <i class="check el-icon-circle-check"></i></div>;
                } else {
                    return <div><i class="add el-icon-circle-plus"></i> {data.label}</div>;
                }
                
            }
            
        },
        onNodeClick(e, data) {
            const val = !data.checked;
            this.deepSetVal(data, 'checked', val);
        },
        deepSetVal(data, key, val) {
            if (Array.isArray(data)) {
                data.forEach((item)=> {
                    item[key] = val;
                    if (item.children) {
                        this.deepSetVal(item.children, key, val);
                    }
                });
            } else {
                data[key] = val;
                if (data.children) {
                    this.deepSetVal(data.children, key, val);
                }
            }
        }
    },
    // components: {Vue2OrgTree}
}
</script>

<style lang="scss">
.tree_wrap{
    background:rgba(248,248,248,1);
    border:1px solid rgba(228,231,237,1);
    .org-tree-container{
        background:rgba(248,248,248,1);
        .remove,.add{
            font-size: 18px;
            vertical-align: middle;
        }
        .remove{
            color: #FF3636;
        }
        .add{
            color: #0285FF;
        }
        .check{
            color: #02E1A0;
        }
    }
    .tree_label{
        background: #fff;
    }
}
</style>
