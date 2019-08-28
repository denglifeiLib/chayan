<template>
    <div class="shequ_search_page">
        <div class="search">
            <icon name="search_icon_small" scale="2"></icon>
            <input type="text" placeholder="搜索问题" v-model="searchVal">
        </div>

        <div class="normal_content" v-if="!searchVal">
            <dl class="history" v-if="history && history.length>0">
                <dt>搜索历史</dt>
                <dd v-for="(item,k) in history" :key="k">{{item}}</dd>
            </dl>

            <dl class="hots" v-if="hots && hots.length>0">
                <dt><img :src="require('@/assets/images/sq_icon_rm@2x.png')" alt="" class="hots_icon">热门搜索</dt>
                <dd v-for="(item,k) in hots" :key="k">{{item}}</dd>
            </dl>
        </div>

        <ul class="search_results" v-if="searchVal">
            <li v-for="(item,k) in searchResult" :key="k">{{item}}</li>
        </ul>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import * as Axios from '@/utils/Action';

export default {
    name: 'shequ_search',
    data() {
        return {
            searchVal: '',
            searchResult: ['如何面谈三人或多人的客户'],
            history: ['云镜好不好用', '怎么扫脸啊', '怎么扫脸啊', '怎么扫脸啊' ],
            hots: ['秒开单怎么做到的', '开单神器是什么', '开单神器是什么']
        }
    },
    created() {
        this.$emit('header', {
            show: true,
            title: '社区',
            backAction: ()=>{this.$router.push({name: 'shequ_tab1'})}
        });
    },
    filterResult () {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        jump(index) {
            this.$router.replace({
                path: `/zheng_baogao/tab${index+1}`
            })
        },
        onSearch (val) {
        // 自定义搜索处理
        },

        onCancel () {
        // 自定义取消事件处理
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.shequ_search_page{
    min-height: 100%;
    height: 100%;
    padding: 8px 14px;
    padding-bottom: 75px;
    background: #f9fafc;
    .search{
        display: flex;
        height:45px;
        margin-top: 8px;
        padding: 8px 14px;
        background: #fff;
        align-items: center;
        border-radius:2px;
        border:1px solid rgba(235,236,241,1);
        input{
            height: 29px;
            margin-left: 8px;
            flex-grow: 1;
            outline: 0;
        }
    }
    .history,.hots{
        padding: 24px 6px 0;
        dd{
            display: inline-block;
        }
    }
    .history {
        dt{
            padding-bottom: 12px;
            font-size:14px;
            font-weight:500;
            color:rgba(51,51,51,1);
        }
        dd{
            padding-right: 32px;
            font-size:14px;
            color:rgba(168,168,168,1);
            padding-bottom: 16px;
        }
    }
    .hots {
        .hots_icon{
            width: 13px;
            height: 16px;
            margin-right: 6px;
        }
        dt{
            padding-bottom: 24px;
            font-size:16px;
            font-weight:500;
            color:rgba(20,20,20,1);
        }
        dd{
            font-size:14px;
            color:rgba(51,51,51,1);
            padding-right: 50px;
            padding-bottom: 16px;
        }
    }
    .search_results{
        margin: 16px -14px 0;
        li{
            margin-bottom: 8px;
            padding: 16px 20px;
            font-size:17px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(20,20,20,1);
            background: #fff;
        }
    }
}

</style>