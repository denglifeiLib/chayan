<template>
<div class="create_success_page">
    <div class="card_wrapper mt25">
        <div class="card_title no_border ">
            <el-button @click="$router.push({name: ''})">返回直播列表页</el-button>
        </div>

        <div class="card_cont">
            <i class="el-icon-success suc_icon"></i>
            <p class="title">创建成功</p>
            <div class="info">
                <p>
                    <span class="label">直播名称</span>
                    <span class="val">如何快速促成保单</span>
                </p>
                <p>
                    <span class="label">直播地址<img src="../../svg/yiwen.svg" /></span>
                    <span class="val">http://wddawdawdawdwawadqdqdqdqqdqwqwdqwddq</span>
                    <el-link :underline="false" type="primary">复制</el-link>
                </p>
                <p>
                    <span class="label">推流地址<img src="../../svg/yiwen.svg" /></span>
                    <span class="val">http://wddawdawdawdwawadqdqdqdqqdqwqwdqwddq</span>
                    <el-link :underline="false" type="primary">复制</el-link>
                </p>
                <p>
                    <span class="label">推流码<img src="../../svg/yiwen.svg" /></span>
                    <span class="val">http://wddawdawdawdwawadqdqdqdqqdqwqwdqwddq</span>
                    <el-link :underline="false" type="primary">复制</el-link>
                </p>
            </div>
            <div class="downloads">
                <div class="item">
                    <div class="box">
                        <img src="../../assets/images/default.jpg" alt="" class="ewm">
                        <p class="dis">扫码可观看直播</p>
                    </div>
                    <el-button size="small" type="primary" icon="el-icon-download">下载二维码</el-button>
                </div>
                <div class="item">
                    <div class="box">
                        <img src="../../assets/images/default.jpg" alt="" class="haibao">
                        <p class="dis">扫海报上的二维码可观看直播</p>
                    </div>
                    <el-button size="small" type="primary" icon="el-icon-download">下载海报</el-button>
                </div>
                <div class="item">
                    <div class="box">
                        <img src="../../assets/images/default.jpg" alt="" class="tool">
                        <p class="dis">/推流工具的作用填写/</p>
                    </div>
                    <el-button size="small" type="primary" icon="el-icon-download">下载推流工具</el-button>
                </div>
            </div>
        </div>
    </div>


</div>
</template>

<script>
import Table from '@/components/Table';
import ButtonCell from '@/components/ButtonCell';
import Icon from 'vue-svg-icon/Icon.vue';

export default {
    name: 'create_success_page',
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                reporter: '',
                date: '2020-04-12 ',
                time: '9-14'
            },
            leave: 58,
            curData: []
        }
    },
    created() {
        this._query();
        
        this.curData = this.formateJson();
    },
    methods: {
        _query(callback) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();

            }, 500);
            
        },
        changeTab(tab) {
            console.log(99999, tab)
            this.activeList = this[this.activeName];
        },
        handlerDelete(type, row, index) {
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(()=>{
                loading.close();
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }, 500);
        },
        dateFocus() {
            
            setTimeout(()=>{
                let pickerDom = document.getElementsByClassName('el-date-picker')[0];
                let childDom = document.getElementById('value');
                pickerDom.appendChild(childDom)
            }, 0)
        },
        handleClose() {

        },

        getArray() {
            let seconds = ['00', '30'];
            let result = []
            for(var i = 0; i < 24; i++) {
                let val1 = i < 10 ? ('0'+i + ':' + seconds[0]) : (i + ':' + seconds[0]);
                let val2 = i < 10 ? ('0'+i + ':' + seconds[1]) : (i + ':' + seconds[1]);
                result.push(val1, val1, val2, val2)
            }

            let beforeArr = result.splice(0, 25);

            return result.concat(beforeArr);
        },
        formateJson() {
            let all = this.getArray();
            console.log(all);

            let result = []
            for(var i = 0; i < all.length; i+=2) {
                result.push({
                    start: all[i],
                    end: all[i+1],
                    leave: (i < 20 || i > 60)? 0 : Math.floor(Math.random() * 20)
                })
            }
            console.log(result)
            return result
        }
    },
    components: {Table, Icon}
}
</script>

<style lang="scss">
.create_success_page{
    .card_cont{
        text-align: center;
        background: url('../../assets/img/cg_bg.png') top center no-repeat;
        .suc_icon{
            font-size: 72px;
            color: #52C41A;
        }
        .title{
            margin: 19px 0 52px;
            font-size:28px;
            font-weight:500;
            color:rgba(0,0,0,0.85);
        }
        .info{
            margin: 0 auto;
            padding: 32px 0 0 71px;
            width:795px;
            height:224px;
            background:rgba(245,245,247,1);
            border-radius:2px;
            opacity:0.69;
            border:1px solid rgba(192,192,192,1);
            text-align: left;
            color: #0D1B35;
            .label{
                display: inline-block;
                width: 100px;
                padding-bottom: 24px;
                i{
                    display: inline-block;
                }
            }
            .val{
                display: inline-block;
                width: 417px;
            }
            img{
                width: 14px;
                margin-left: 8px;
                vertical-align: middle;
            }
        }
        .downloads{
            max-width: 1100px;
            margin: 40px auto 0;
            display: flex;
            justify-content: space-around;
            .item{
                 .box{
                     padding-bottom: 24px;
                     margin-bottom: 24px;
                     display: flex;
                     flex-direction: column;
                     justify-content: space-between;
                     align-items: center;
                    width:329px;
                    height:272px;
                    border:1px solid rgba(245,245,247,1);
                 }  
                 .ewm{
                     margin-top: 47px;
                     width: 152px;
                     height: 152px;
                 } 
                 .haibao{
                     margin-top: 36px;
                     width:98px;
                    height:174px;
                 }
                 .tool{
                     margin-top: 76px;
                     width:95px;
                    height:95px;
                 }
            }
        }
    }
}

</style>