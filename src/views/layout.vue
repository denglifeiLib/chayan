<template>
    <div class="content">
        <!-- <div class="header flex_box">
            <div class="flex_hd">项目管理系统</div>
            <div class="flex_bd">
                <div class="search">
                    <i class="el-icon-search"></i>
                    <input type="text" :class="['search_input', {focus: searchFocus&&searchName}]" placeholder="搜索项目" v-model="searchName" @focus="()=>{searchFocus=true}">
                    <i class="el-icon-error clear" v-if="searchName" @click="searchName=''"></i>
                </div>
            </div>
            <div class="flex_ft">
                <el-badge is-dot class="item" :hidden="hiddenDot">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <el-popover placement="bottom-end" popper-class="set_box" v-model="showSets">
                    <div class="set">
                        <el-link :underline="false" @click="showSets = false;$router.push({name: 'set'})">账号设置</el-link>
                        <el-link :underline="false" @click="showSets = false">退出登录</el-link>
                    </div>
                    <img :src="header" alt="" class="header_img" slot="reference">
                </el-popover>
            </div>
        </div> -->
        <top-header :hideSearch="false"></top-header>
        <div class="main">
            <div class="menue">
                <ul class="el-menu-vertical-demo">
                    <li class="item" :class="activekey===k ? 'is-active':''" v-for="(page,k) in pages" :key="k" @click="$router.push({name: page.router});activekey=k;">
                        <span slot="title">{{page.title}}</span>
                        <span class="number">{{page.number}}</span>
                    </li>
                </ul>
                
                <ul class="el-menu-vertical-demo team_menu">
                    <li class="item">
                        <span slot="title">项目分组</span>
                    </li>
                    <li class="item" v-for="(page,k) in catogrys" :key="k+'c'">
                        <span slot="title">{{page.name}}</span>
                        <span class="number">{{page.number}}</span>
                    </li>
                    <li class="item add">
                        <i class="el-icon-plus"></i>
                        <span slot="title">新建分组</span>
                    </li>
                </ul>
            </div>
            <div class="container">
                <div class="bread_top">{{pages[activekey].title}} . {{pages[activekey].number}}</div>
                <router-view @changePage="changePage"/>
            </div>
        </div>
    </div>

</template>

<script>
import * as Axios from '@/utils/Action';
import topHeader from '@/components/topHeader.vue';

export default {
    name: 'layout',
    data() {
        return {
            activekey: 0,
            searchFocus: false,
            isCollapse: false,
            pages: [
                {
                    router: 'project_all',
                    title: '全部项目',
                    number: '8'
                }, {
                    router: 'project_unclassify',
                    title: '未分组项目',
                    number: '8'
                }, {
                    router: 'project_classified',
                    title: '已归档项目',
                    number: '8'
                }, {
                    router: 'manage_module',
                    title: '模板管理',
                    number: '8'
                }, {
                    router: 'member',
                    title: '成员管理',
                    number: '8'
                }, {
                    router: 'recycle',
                    title: '回收站',
                    number: '8'
                }
            ],
            catogrys: [
                {
                    name: '项目分组组一',
                    number: 3
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
        changePage (val) {
            this.pages.forEach((item,index)=> {
                if(item.router===val) {
                    this.activekey = index;
                }
            })
        },
    },
    components: { topHeader }
}
</script>

<style lang="scss">
    .content{
        height: 100%;
    }
    .main{
        width:100%;
        max-width: 1442px;
        margin: 0 auto;
        padding: 30px;
        display: table;
        height: calc(100% - 50px);
        .menue{
            width: 250px;
            height: 100%;
            margin-left: -8px;
            // display: table-cell;
            .el-menu-vertical-demo{
                border-right: 0;
                .item{
                    height: 40px;
                    padding: 0 30px;
                    line-height: 40px;
                    color: #333;
                    font-size:16px;
                    cursor: pointer;
                    &:hover{
                        background:#F2F2F2;
                        border-radius:6px;
                    }
                    &.is-active{
                        background:rgba(232,245,253,1);
                        border-radius:6px;
                        i{
                            color: #3E90FF;
                        }
                    }
                    .number{
                        float: right;
                        color: #666;
                    }
                    i{
                        padding-right: 10px;
                    }
                }
            }
            .team_menu{
                margin-top: 80px;
                .item{
                    &:hover{
                        background:#fff;
                    }
                    &.add{
                        color: #3E90FF;
                    }
                }
            }
        }
        

        .container{
            display: table-cell;
            padding-left: 50px;
            .bread_top{
                padding: 20px 16px;
                font-size:24px;
                color:rgba(51,51,51,1);
            }
        }
    }

</style>