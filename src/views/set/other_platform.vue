<template>
    <div class="other_platform">
        <div class="flex_box platform">
            <div class="flex_hd">
                <img src="../../assets/images/weix.png" alt="">
            </div>
            <div class="flex_bd name">微信：微信昵称</div>
            <div class="flex_ft">
                <el-button class="blue_primary" plain size="medium" v-if="!isBind" @click="bindAction('toBind')">绑定</el-button>
                <el-button class="red_primary" plain size="medium" type="danger" v-else @click="bindAction('unBind')">解除绑定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
export default {
    name: 'other_platform',
    data() {
        return {
            isBind: false
        }
    },
    beforeCreate() {
        this.$emit('changePage', 'other_platform')
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        },
        bindAction(type) {
            this.isBind = type==='toBind';
        }
    }
}
</script>

<style scoped lang="scss">
    .other_platform{
        min-height:300px;
        .platform{
            padding-top: 35px;
        }
        .name{
            font-size:14px;
            color:#666;
            padding-left: 37px;
        }
        .blue_primary{
            width: 100px;
        }
    }
</style>