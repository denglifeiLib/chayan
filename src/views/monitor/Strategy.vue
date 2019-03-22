<template>
  <div>
    <div class="status_bar clearfix">
        <i></i>启用中
        <span class="num">{{activeNum}}</span>
        <div class="fr">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="form.dialogVisible = true">添加策略</el-button>
        </div>
    </div>
    <div class="list clearfix">
        <status-card 
            v-for="(item,index) in cards_1" 
            :item="item" 
            :key="index"
            @showEdit="showEdit(item, index)"/>
    </div>
    <div class="status_bar clearfix pause">
        <i></i>暂停中
        <span class="num">{{pauseNum}}</span>
    </div>
    <div class="list clearfix">
        <status-card 
            v-for="(item,index) in cards_2" 
            :item="item" 
            :key="index"
            @showEdit="showEdit(item, index)"/>
    </div>

    <strategy-template :form="form" @callBack="handleStep1"></strategy-template>
    <strategy-template2 :list="channelArray" :dialogVisible="dialog2Visible" @callBack="handleStep2"></strategy-template2>

  </div>
</template>

<script>
import StatusCard from '@/components/StatusCard'
import StrategyTemplate from '@/components/StrategyTemplate'
import StrategyTemplate2 from '@/components/StrategyTemplate2'
export default {
    name: 'Strategy',
    data () {
        return {
           dialog2Visible: {
               show: false
           },
           activeNum: 7,
           pauseNum: 6,
            cards_1: [
                {
                    type: '1',
                    status: 'normal',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: true,
                    disabled: false,
                }, {
                    type: '2',
                    status: 'error',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    errorTips: 'errorTips',
                    value: true,
                    disabled: false,
                }, {
                    type: '3',
                    status: 'wait',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: true,
                    disabled: false,
                }, {
                    type: '1',
                    status: 'pause',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    errorTips: 'errorTips',
                    value: true,
                    disabled: false,
                }, {
                    type: '2',
                    status: 'error',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    errorTips: 'errorTips',
                    value: true,
                    disabled: false,
                }, {
                    type: '3',
                    status: 'wait',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: true,
                    disabled: false,
                }, {
                    type: '1',
                    status: 'pause',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    errorTips: 'errorTips',
                    value: true,
                    disabled: false,
                }
            ],
            cards_2: [
                {
                    type: '2',
                    status: 'error',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    errorTips: 'errorTips',
                    value: false,
                    disabled: true,
                }, {
                    type: '3',
                    status: 'wait',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: false,
                    disabled: true,
                }, {
                    type: '3',
                    status: 'wait',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: false,
                    disabled: true,
                }, {
                    type: '3',
                    status: 'wait',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: false,
                    disabled: true,
                }, {
                    type: '3',
                    status: 'wait',
                    title: '汽车行业用户调研',
                    time: '2019-02-20 19:00',
                    value: false,
                    disabled: true,
                }
            ],
            form: {
                dialogVisible: false,
                industryList: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
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
                industry: '选项4',
                name: 'xx品牌营销线索监控策略',
                module: '',
                type: '',
                date: '',
                time: '06:00',
                branch_desc: '',
                product_desc: ''
            },
            channelArray: [
                {
                    allChecked: true,
                    title: '推荐渠道',
                    list: [
                        {
                                 
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '推荐渠道',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: true,
                    title: '全部渠道',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '综合通用',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '健康养生',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '快销品',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '餐饮娱乐',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '儿童教育',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '儿童教育',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '文化旅游',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '推荐渠道',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '推荐渠道',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }, {
                    allChecked: false,
                    title: '推荐渠道',
                    list: [
                        {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_1.jpg'),
                            name: 'name name',
                            id: 1,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_2.jpg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }, {
                            icon: require('@/assets/images/logo_3.jpeg'),
                            name: 'name name',
                            id: 2,
                            checked: true
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        showEdit(item, index) {
            console.log(item, index);
            this.form.dialogVisible = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleStep1(type) {
            switch (type) {
                case 'back': 
                    this.form.dialogVisible = false;
                    break;
                case 'next': 
                    this.form.dialogVisible = false;
                    this.dialog2Visible.show = true;
                    break;
            }
                
        },
        handleStep2(type) {
            switch (type) {
                case 'prev': 
                    this.form.dialogVisible = true;
                    this.dialog2Visible.show = false;
                    break;
                case 'confirm': 
                    this.dialog2Visible.show = false;
                    this.confirm();
                    break;
            }
                
        },
        confirm() {
            console.log('confirm');
        }
    },
    components: { StatusCard, StrategyTemplate, StrategyTemplate2 },
}
</script>
<style lang="scss" scoped>
    .status_bar{
        line-height:25px;
        font-size:18px;
        color:rgba(74,74,74,1);
        padding-bottom: 18px;
        border-bottom: solid 1px #E4E7ED;
        &.pause{
            padding-top: 28px;
        }
        &.pause i{
            background: #FF3636;
        }
        i{
            width:15px;
            height:15px;
            display: inline-block;
            margin-right: 5px;
            border-radius: 50%;
            background:rgba(2,225,160,1);
        }
        .num{
            margin-left: 20px;
            font-size:24px;
            color:rgba(48,49,51,1);
        }
    }
    .list{
        margin-top: 30px;
        margin-right: -24px;
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-between;
    }

    .status_card{
        // margin-bottom: 24px;
        float: left;
        margin: 0 24px 24px 0;
        _display: inline-block;
    }
</style>
