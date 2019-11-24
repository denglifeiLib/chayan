<template>
    <div class="search_index_page">
       <wv-group class="search_box no_border">
            <wv-cell>
                <div class="search" slot="bd">
                    <icon name="system-serchb" scale="2"></icon>
                    <input type="text" placeholder="输入问题搜索解答" v-model="searchVal">
                </div>
                <div class="clear" slot="ft" @click="cancel">取消</div>
            </wv-cell>
        </wv-group>
        <div class="normal_content main" v-if="!searchVal">
            <p class="title">搜索热词 <icon name="search_hoticon" scale="2" class="hots_icon"></icon></p>
            <dl class="hots"  v-for="(item,k) in hots" :key="k">
                <dt>{{item.title}}</dt>
                <dd>
                    <span  v-for="(key,i) in item.keys" :key="i" @click="searchVal=key">{{key}}</span>
                </dd>
            </dl>
        </div>

        <div class="search_results main" v-if="searchVal">
            <div class="type">“{{searchVal}}”相关视频</div>
            <div class="list">
                <wv-group class="no_border" v-if="vedioList && vedioList.length>0">
                    <wv-cell v-for="(item,k) in vedioList" :key="k" class="item">
                        <div slot="bd" class="vertical_bettwen">
                            <p class="title">{{item.title}}</p>
                            <div class="text">
                                <span>
                                    <icon name="px_icon_rs" scale="1.5"></icon>
                                    <span>{{item.watchNum}}</span>
                                </span>
                                <span>
                                    <icon name="system_like_g" scale="1.5"></icon>
                                    <span>{{item.likeNum}}</span>
                                </span>
                            </div>
                        </div>
                        <img :src="item.img" alt="" slot="ft" class="share_img">
                    </wv-cell>
                </wv-group>
                <wv-group class="no_border" v-else>
                    <wv-cell class="item empty">
                        <img :src="require('@/assets/images/search_kong.png')" alt="" slot="icon">
                        <div slot="bd">
                            <div class="desc">您的问题暂未收入视频库</div>
                            <div class="button_round_blue button" @click="$router.push('apply')">申请问题答疑</div>
                        </div>
                    </wv-cell>
                </wv-group>
            </div>
            <div class="type">“{{searchVal}}”相关问答</div>
            <div class="list questions" v-if="faqList &&faqList.length>0">
                <div class="item" v-for="(item,k) in faqList" :key="k">
                    <div class="box">
                        <p class="title">{{item.title}}</p>
                        <div class="answer">
                            <img :src="require('@/assets/images/da.png')" alt="" class="da_img">
                            <span class="text">{{item.showAll ? item.answer : (item.answer||'').slice(0, 30)}}</span>
                            <span v-if="!item.showAll">...</span>
                            <div @click="toggleShowAll(item, k)" :class="['fr', 'toggle', {rotate: !item.showAll}]">
                                <span>{{!item.showAll ? '阅读全文' : '收起'}}</span>
                                <icon name="zhankai" scale="0.8" class="ml5 bottom"></icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list" v-else>
                <wv-group class="no_border">
                    <wv-cell class="item empty">
                        <img :src="require('@/assets/images/search_kong.png')" alt="" slot="icon">
                        <div slot="bd">
                            <div class="desc">没有搜索到相关信息</div>
                        </div>
                    </wv-cell>
                </wv-group>
            </div>
        </div>

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
            hots: [
                {
                    title: '保险相关',
                    keys: ['投保人', '被保险人', '受益人', '保险豁免', '保险理赔', '现金价值']
                }, {
                    title: '经济相关',
                    keys: ['资产配置', '个人资产', '资产配置', '财富传承']
                }, {
                    title: '法律相关',
                    keys: ['婚姻法', '劳动法', '税法', '保险法']
                }
            ],
            vedioList: [
                // {
                //     id: 12,
                //     img: require('@/assets/images/poster_1.jpg'),
                //     title: '什么是保险受益人？',
                //     watchNum: 230220,
                //     likeNum: 20
                // }, {
                //     id: 12,
                //     img: require('@/assets/images/poster_1.jpg'),
                //     title: '什么是保险受益人？什么是保险受益人？什么是保险受益人？什么是保险受益人？',
                //     watchNum: 230220,
                //     likeNum: 20
                // }
                    
            ],
            faqList: [
                {
                    title: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    showAll: false,
                    answer: '应该合理的买保险5应该合理的买保险1应该合理应该合理的买保险5应该合理的应该合理的买保险5应该合理的买保险1买保险1的买保险5应该合理的买保险1'
                }, {
                    title: '想给客户孩子买一份定期30年的重疾险，有性价比高的产品吗？',
                    showAll: false,
                    answer: '应该合理的买保险5应该合理的买保险1应该合理应该合理的买保险5应该合理的应该合理的买保险5应该合理的买保险1买保险1的买保险5应该合理的买保险1'
                }
            ]
        }
    },
    created() {
        this.$emit('header', {
            show: false,
        });
        this.$emit('tabbar', {
            show: false
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
        cancel(index) {
            this.searchVal = '';
            this.$router.push('/');
        },
        toggleShowAll(item, k) {
            let el = Object.assign({}, this.faqList[k], {showAll: !item.showAll});
            console.log(2222, el)
            this.faqList.splice(k, 1, el);
        }
    },
    components: {Icon}
}
</script>

<style lang="less">
.search_index_page{
    min-height: 100%;
    height: 100%;
    padding-bottom: 75px;
    background: #f9fafc;
    .search_box{
        padding: 10px 16px 8px;
        background: transparent;
        .weui-cell{
            background: #f9fafc;
        }
        .clear{
            font-size:17px;
            color:rgba(29,119,222,1);
            padding-left: 14px;
        }
    }
    .search{
        display: flex;
        height:45px;
        padding: 8px 14px;
        background: #fff;
        align-items: center;
        border-radius:40px;
        input{
            height: 29px;
            margin-left: 8px;
            flex-grow: 1;
            outline: 0;
            font-size: 14px;
        }
    }

    .main{
        min-height: calc(100vh - 54px);
        // background: #fff;
        .title{
            padding-bottom: 8px;
        }
        &.normal_content{
            padding: 16px 18px;
        }
        .hots_icon{
            margin-left: 5px;
        }
    }
    .hots {
        dt{
            padding-top: 8px;
            padding-bottom: 8px;
            font-size:14px;
            color:rgba(156,156,165,1);
            line-height:20px;
        }
        dd{
            margin-right: -14px;
            span{
                display: inline-block;
                margin-right: 8px;
                margin-bottom: 16px;
                font-size:14px;
                color:rgba(89,97,114,1);
                line-height:30px;
                background:rgba(243,244,246,1);
                border-radius:15px;
                min-width: 80px;
                text-align: center;
            }
        }
    }
    .search_results{
        .type{
            padding: 20px 20px 12px;
            font-size:13px;
            color:rgba(128,134,154,1);
            line-height:18px;
        }
        .list{
            .weui-cells{
                background: transparent;
            }
            .item{
                padding: 24px 20px;
                background: #fff;
                margin-bottom: 8px;
            }
            
            .share_img{
                width:30.67vw;
                height: 16.8vw;
                margin-right: 16px;
                padding-right: 0;
            }
            .title{
                padding-bottom: 0;
                padding-right: 8px;
                width: 100%;
                font-size: 15px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .text{
                font-size:12px;
                color:rgba(156,156,165,1);
                line-height:18px;
                *{
                    vertical-align: middle;
                }
                > span{
                    padding-right: 20px;
                }
            }
            .vertical_bettwen{
                height: 16.8vw;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
            }
        }
        .empty{
            img{
                width: 30.93vw;
                margin-right: 8vw;
            }
            .desc{
                font-size:14px;
                color:rgba(24,34,56,1);
                line-height:20px;
            }
            .button{
                margin-top: 16px;
                height: 32px;
                line-height: 32px;
            }
        }
        .questions .item{
            // padding:24px 17px;
            // margin-bottom: 1px;
            // background: #fff;
            .title{
                font-size:16px;
                font-weight:500;
                color:rgba(24,34,56,1);
                line-height:20px;
            }
            .answer{
                padding-top: 14px;
                font-size:12px;
                line-height:17px;
                .da_img{
                    width: 18px;
                    vertical-align: middle;
                    margin-right: 5px;
                }
                .text{
                    vertical-align: middle;
                    font-size: 15px;
                    line-height:24px;
                }
                .toggle{
                    color: #1D77DE;
                    transition: transform 0.5s;
                    line-height:24px;
                    .svg-icon{
                        transform: rotate(180deg)
                    }
                    &.rotate{
                        .svg-icon{
                            transform: rotate(0deg)
                        }
                    }
                }
                
            }
            .box{
                padding-bottom: 25px;
                &:last-child{
                    padding-bottom: 0;
                }
            }
        }
    }
}

</style>