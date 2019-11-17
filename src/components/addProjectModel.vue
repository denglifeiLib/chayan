<template>
    <el-dialog title="新建项目模板" :center="true" :visible="show" width="80%" :before-close="handleClose" class="add_project_dialog">
        <div class="con_box">
            <!-- <el-input placeholder="搜索项目模板" prefix-icon="el-icon-search" v-model="search"></el-input> -->
            <el-select 
                v-model="search" 
                multiple 
                filterable 
                remote 
                reserve-keyword 
                placeholder="搜索项目模板" 
                :remote-method="remoteMethod" 
                :loading="loading"
            >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div class="card_list">
                <div class="card_item card_item_add" @click="addClick">
                    <i class="el-icon-plus"></i>
                    <p class="add_des">创建新项目模板</p>
                </div>
                <div class="card_item" 
                    v-for="(item,k) in list" 
                    :key="k" @click="select(item)" 
                    :style="{backgroundImage: item.image||`url(${require('../assets/images/default_pro_img.png')})`}"
                >
                    <p class="title">{{item.name}}</p>
                    <!-- @mouseenter="itemKey=k"
                    @mouseleave="itemKey=null" -->
                    <!-- <p class="des">{{item.describe}}</p> -->
                    <!-- <i class="el-icon-s-tools tool" v-if="itemKey===k"></i> -->
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import cardList from '@/components/cardList';

export default {
    name: "addProjectDialog",
    data() {
        return {
            active: 0,
            // itemKey: null,
            list: [
                {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }, {
                    name: '建筑项目',
                    describe: '介绍项目介绍项目介绍项...'
                }
            ], 

            models: [],
            options: [],
            loading: false,
            search: '',
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"]
        }
    },
    props: {
         show: {
             type: Boolean,
             default: false
         }
    },
    mounted() {
      this.models = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
        handleClose(done) {
            this.$emit('close')
            done();
        },
        addClick() {
            console.log('add');
            this.$emit('addProjectClick')
        },
        select(item) {
            console.log(item, 'selected')
            this.$emit('addProjectClick', item)
        },

        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = this.models.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options = [];
            }
        }
        
    },
    components: { cardList }
};
</script>
<style lang="scss">
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
        padding: 23px 22px;
    }
    .con_box {
        .card_list {
            padding-top: 20px;
            margin-left: -20px;
            display: flex;
            flex-wrap: wrap;
            .card_item{
                position: relative;
                margin: 0 0 16px 20px;
                padding: 18px 20px;
                width:260px;
                height:140px;
                color: #fff;
                border-radius:10px;
                overflow: hidden;
                .title{
                    padding-top: 90px;
                    font-size:18px;
                    padding-bottom: 10px;
                }
                // .des{
                //     font-size:14px;
                //     line-height: 1.4;
                // }
                // .tool{
                //     position: absolute;
                //     top: 13px;
                //     right: 13px;
                //     font-size:18px;
                //     font-weight: bold;
                // }
                &.card_item_add{
                    padding-top:31px;
                    text-align: center;
                    color:rgba(102,102,102,1);
                    background:rgba(242,242,242,1);
                    i{
                        margin-bottom: 17px;
                        font-size: 29px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}


</style>

