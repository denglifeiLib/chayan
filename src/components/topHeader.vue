<template>
    <div class="top_header_wrap">
        <div class="top_header flex_box">
            <div class="flex_hd" @click="$router.push({name: 'project_all'})">项目管理系统</div>
            <div class="flex_bd">
                <div class="search" v-if="!hideSearch">
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
                        <el-link :underline="false" @click="goSet">账号设置</el-link>
                        <el-link :underline="false" @click="showSets = false">退出登录</el-link>
                    </div>
                    <img :src="header" alt="" class="header_img" slot="reference">
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
export default {
    name: 'top_header',
    data() {
        return {
            searchFocus: false,
            searchName: '',
            hiddenDot: false,
            showSets: false,
            header: require('@/assets/images/header.png'),
        }
    },
    props: [ 'hideSearch' ],
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        goSet() {
            this.showSets = false
            this.$router.push({name: 'personal_info'})
        }
    }
}
</script>

<style lang='scss'>
.top_header_wrap{
    background: #fff;
    box-shadow:0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}
    .top_header{
        padding: 0 30px;
        height:50px;
        max-width: 1442px;
        margin: 0 auto;
        
        .flex_hd{
            // width: 250px;
            font-size:20px;
            font-weight: bold;
        }
        .flex_bd{
            text-align: center;
        }
        .flex_ft{
            display: flex;
            align-items: center;
            font-size: 22px;
            .header_img{
                width: 40px;
                height: 40px;
                margin-left: 42px;
            }
        }
        .search{
            width: 80%;
            max-width: 300px;
            height:30px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            background:rgba(242,242,242,1);
            border-radius:15px;
            input {
                width: 80px;
                padding-left: 15px;
                outline: 0;
                border: 0;
                background: transparent;
            }
            input.focus{
                width: 60%;
            }
            .clear{
                color: #ccc;
            }
        }
        
    }
    .set_box{
        box-sizing: border-box;
        width: 114px;
        height: 84px;
        min-width: 0;
        padding: 10px 0;
        .set{
            width:100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            a{
                color: #333;
                font-size: 14px;
            }
        }
    }
</style>