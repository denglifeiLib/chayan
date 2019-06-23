<template>
    <div class="x-bar">
        <wordcloud
            :data="defaultWords"
            nameKey="name"
            valueKey="value"
            :color="myColors"
            :showTooltip="false"
            :rotate="{from: 0, to: 0, numOfOrientation: 0 }"
            :fontSize="[10, 23]"
            fontScale="n"
            :wordPadding="2"
            spiral="rectangular"
            :margin="{top:0,right:0,bottom:0,left:0}"
            :wordClick="wordClickHandler">
        </wordcloud>
    </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import { debounce } from '@/utils'

export default {
    name: 'cloudTag',
    props: {
        // chartData: {
        //   type: Object,
        //   required: true
        // }
    },
    data() {
        return {
            myColors: ['#FACC14', '#9AE65C', '#41D9C7', '#2FC25B', '#1890FF'],
            defaultWords: [
                {
                    "name": "桂语山房",
                    "value": 1
                }, {
                    "name": "西贝莜面村",
                    "value": 2
                }, {
                    "name": "舍逸艺术餐厅",
                    "value": 3
                }, {
                    "name": "你看起来很好吃",
                    "value": 4
                }, {
                    "name": "Hard Rock Cafe",
                    "value": 5
                }, {
                    "name": "小杨生煎",
                    "value": 6
                }, {
                    "name": "大江户居酒屋",
                    "value": 7
                }, {
                    "name": "喜柿龙虾",
                    "value": 8
                },{
                    "name": "桂语山房",
                    "value": 9
                }, {
                    "name": "西贝莜面村",
                    "value": 10
                }, {
                    "name": "舍逸艺术餐厅",
                    "value": 9
                }, {
                    "name": "你看起来很好吃",
                    "value": 8
                }, {
                    "name": "Hard Rock Cafe",
                    "value": 7
                }, {
                    "name": "小杨生煎",
                    "value": 6
                }, {
                    "name": "大江户居酒屋",
                    "value": 5
                }, {
                    "name": "喜柿龙虾",
                    "value": 4
                }, {
                    "name": "桂语山房",
                    "value": 3
                }, {
                    "name": "西贝莜面村",
                    "value": 2
                }, {
                    "name": "舍逸艺术餐厅",
                    "value": 1
                }, {
                    "name": "你看起来很好吃",
                    "value": 1
                }, {
                    "name": "Hard Rock Cafe",
                    "value": 1
                }, {
                    "name": "小杨生煎",
                    "value": 2
                }, {
                    "name": "大江户居酒屋",
                    "value": 2
                }, {
                    "name": "喜柿龙虾",
                    "value": 3
                }
            ]
        }
    },
    created() {},
    mounted() {},
    methods:{
        wordClickHandler(name, value, vm) {
            console.log('wordClickHandler', name, value, vm);
        }
    },
    components: {wordcloud}
}
</script>

<style>
.x-bar{
    height: 100%;
}
</style>
