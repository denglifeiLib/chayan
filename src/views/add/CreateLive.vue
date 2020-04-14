<template>
<div class="create_live_page">
    <div class="card_wrapper mt25">
        <div class="card_title no_border blue "><span class="blue">创建直播</span></div>

        <el-row class="card_cont">
            <el-col :xs="0" :sm="6" :md="10" :lg="10">
                <img src="../../assets/img/img_add_01.png" alt="" class="bg_img">
            </el-col>
            <el-col :xs="24" :sm="18" :md="14" :lg="10">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="直播名称">
                        <el-input v-model="form.name" placeholder="请输入直播名称" maxlength="24" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="主讲人">
                        <el-input v-model="form.reporter" placeholder="请输入主讲人名称" maxlength="24" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="直播日期">
                        <el-date-picker 
                            type="date" 
                            placeholder="选择日期" 
                            v-model="form.date" style="width: 100%;" 
                            popper-class="datePicker" 
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @focus="dateFocus()"></el-date-picker>
                        <p class="dis grey">当前日期剩余可用直播间容量: <span :class="[leave == 0 ? 'danger' : 'blue']">{{leave||0}}</span></p>
                        <div class="fake">
                            <div id="value" style="text-align: center;border-top: solid 1px #E8E7EA;">
                                <p class="date blue">今天</p>
                                <p class="grey">当前日期剩余可用直播间容量: <span class="blue">{{leave}}</span></p>
                            </div>
                        </div>
                    </el-form-item>
                   <el-form-item label="直播时间" v-if="form.date">
                        <el-input v-model="form.time" readonly :disabled="leave === 0" @focus="dialogVisible=true"></el-input>
                        <el-link type="danger" :underline="false" v-if="leave !== 0">请注意：当直播结束时间到时会自动关闭直播间！</el-link>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="$router.go(-1)">返回</el-button>
                        <el-button type="primary">创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
       
    </div>

    <div class="time_dialog" v-if="dialogVisible">
        <div class="top">
            <span class="bold">
                <span class="blue">{{form.date}}</span>
                可选时间段
            </span>
            <p class="fr grey top_desc">
                *温馨提示：最多可选择 
                <span class="blue">连续的2.5小时</span>，
                <span class="blue">当直播结束时间到时会自动关闭直播间！</span><br>
                <span>为了不影响您直播，请合理选择</span>
            </p>
        </div>
        <div class="items">
            <el-tooltip :disabled="item.leave" content="提示文案" placement="right" v-for="(item,i) in curData" :key="i" :visible-arrow="false">
                <div :class="['item', {disabled: !item.leave, choosed: chooosedTimeKey.indexOf(i) > -1}]" @click="chooseTime(i, item)">
                    <p>{{item.start}}~{{item.end}}</p>
                    <p>剩余：{{item.leave || 0}}</p>
                </div>
            </el-tooltip>
            <!-- <div :class="['item', {disabled: !item.leave, choosed: chooosedTimeKey.indexOf(i) > -1}]" v-for="(item,i) in curData" :key="i" @click="chooseTime(i, item)">
                <p>{{item.start}}~{{item.end}}</p>
                <p>剩余：{{item.leave || 0}}</p>
            </div> -->
        </div>
        <div class="btm">
            <p class="blue">你选择的直播时间：2020-04-12 12:30～14:30</p>
            <div class="btns">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirmChoose">确定</el-button>
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
    name: 'create_live_page',
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                reporter: '',
                date: '2020-04-12 ',
                time: ''
            },
            leave: 58,
            curData: [],
            chooosedTimeKey: []
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
        chooseTime(i, item) {
            if(!item.leave)return;
            let index = this.chooosedTimeKey.indexOf(i);
            if( index > -1) {
                this.chooosedTimeKey.splice(index, 1)
            } else {
                this.chooosedTimeKey.push(i)
            }
        },
        confirmChoose() {
            this.dialogVisible=false;
            this.chooosedTimeKey = []
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
.create_live_page{
    .fake{
        height: 0;
        overflow: hidden;
    }
    .time_dialog{
        position: fixed;
        padding: 22px 36px 32px;
        width: 780px;
        background: #fff;
        box-shadow:0px 2px 12px 0px rgba(0,0,0,0.15);
        border-radius:4px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999999;
        .top{
            overflow: hidden;
        }
        .bold{
            font-size: 16px;
        }
        .top_desc{
            font-size: 12px;
            text-align: right;
        }
        .items{
            margin-top: 24px;
            margin-bottom: 24px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item{
                width:85px;
                height:46px;
                margin-bottom: 4px;
                flex-grow: 0;
                flex-shrink: 0;
                text-align: center;
                color: #52C41A;
                border: solid 1px #52C41A;
                font-size: 12px;
                cursor: pointer;
                &.disabled{
                    background: #F6F6F6;
                    border-color: #F6F6F6;
                    color: #E7E7E7;
                }
                &.choosed{
                    background: #007AFF;
                    border-color: #007AFF;
                    color: #fff;
                }
            }
        }
        .btm{
            text-align: center;
            .btns{
                margin-top: 16px;
                button{
                    width: 96px;
                }
            }
        }
    }
}

</style>