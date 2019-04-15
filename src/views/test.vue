<template>
    <div>
        <h1 @click="sendRequest">点击发送请求</h1>
        <p>{{text}}</p>
    </div>
</template>

<script>
import * as Axios from '@/utils/Action';
export default {
    name: 'test',
    data() {
        return {
            text: '222'
        }
    },
    methods: {
        sendRequest() {
            Axios.testRequire({a:'aaaaaa'}).then(res=> {
                this.text = res.data.msg;
            }).catch(err=> {
                
            })
        }
    }
}
</script>

<style scoped>
    h1{
        padding: 200px 0 30px;
        text-align: center;
        font-size: 20px;
    }
    p{
        text-align: center;
        font-size: 30px;
    }
</style>