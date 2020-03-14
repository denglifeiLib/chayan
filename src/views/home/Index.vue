<template>
    <div class="home_page">
        <div class="card_wrapper mt25">
            <h3 class="card_title">欢迎使用健康小屋（静安寺店）</h3>
            <div class="card_cont">
                <ul class="card">
                    <li>
                        <div class="top flex_box">
                            <p class="title bd">健康小屋（静安寺店）<br></p>
                            <div class="status ft">运营中<span class="green_s"></span></div>
                        </div>
                        <span class="dis">运营时间：早9点-晚9点</span>
                    </li>
                    <li class="flex_box justify types">
                        <div>
                            <i class="el-icon-data-line"></i>
                            <span class="catogry">设备</span>
                        </div>
                        <div class="statusbtn">
                            <span>20</span>
                            <span class="green_s"></span>
                        </div>
                        <div class="statusbtn">
                            <span>2</span>
                            <i class="el-icon-video-pause black"></i>
                        </div>
                        <div class="statusbtn">
                            <span>1</span>
                            <i class="el-icon-error danger"></i>
                        </div>
                    </li>
                    <li class="flex_box justify types">
                        <div>
                            <i class="el-icon-user"></i>
                            <span class="catogry">用户</span>
                        </div>
                        <div class="statusbtn long">
                            <span>今日总计  111</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'home_page',
    data () {
        return {
           activeTrendTab: 'clewTrend',
        };
    },
    computed: {},
    methods: {},
    components: {},
}
</script>
<style lang="scss" scoped>
.home_page{
    .card{
        width: 425px;
        border: solid 1px #ccc;
        border-radius: 8px;
        li{
            padding: 20px;
            border-bottom: solid 1px #ccc;&:last-child{
                border-bottom: 0;
            }
        }
        .top{
            padding-bottom: 8px;
        }
        .title{
            font-size: 18px;
            font-weight: bold;
        }
        .status{
            font-size: 16px;
            .green_s{
                margin: 0 15px;
            }
        }
        .types{
            font-size: 20px;
        }
        .statusbtn{
            width: 80px;
            display: flex;
            padding: 12px 10px;
            align-items: center;
            justify-content: space-between;
            font-size: 20px;
            border: solid 1px #999;
            border-radius: 4px;
            &.long{
                width: 290px;
            }
        }
    }
}
</style>
