<template>
    <div :class="`voice ${curRead && 'read'}`"  @touchstart.prevent="gotouchstart" @touchmove.prevent="gotouchmove" @touchend.prevent="gotouchend" @click="playToggle">
        <div class="wave">
            <wv-circle :diameter="18" stroke-color="#1D77DE" :line-width="2" fill-color="transparent" :value="25" trail-color="transparent"></wv-circle>
            <wv-circle :diameter="26" stroke-color="#1D77DE" :line-width="2" fill-color="transparent" :value="25" trail-color="transparent"></wv-circle>
            <wv-circle :diameter="35" stroke-color="#1D77DE" :line-width="2" fill-color="transparent" :value="25" trail-color="transparent"></wv-circle>
        </div>
        <span class="second">02’22’’</span>
        <audio src="" id="eventAudio" ref="audio"></audio>
    </div>
</template>

<script>
// import audio from '../assets/hh.mp3';
export default {
  name: 'wei_voice',
  data() {
      return {
          isPlay: false,
          curRead: this.isRead,
          timeOutEvent: 0,
      }
  },
  props: {
    isRead: {
      type: Boolean,
      default: true
    },
    audio: {
        type: String,
        default: ''
    },
    clickAble: {
        type: Boolean,
        default: true
    }
  },
  mounted() {
        let buttonAudio = document.getElementById('eventAudio');
        buttonAudio.setAttribute('src',this.audio);
  },
    methods: {
        playToggle() {
            if(!this.clickAble)return;
            let buttonAudio = document.getElementById('eventAudio');
            this.isPlay ? buttonAudio.pause() : buttonAudio.play();
            this.isPlay = !this.isPlay;
            this.curRead = true;
        },
        gotouchstart(){
            clearTimeout(this.timeOutEvent);//清除定时器
            this.timeOutEvent = 0;
            this.timeOutEvent = setTimeout(()=>{
                this.$emit('longTouch');
                this.curRead = true;
            },600);
        },
        gotouchend(){
            clearTimeout(this.timeOutEvent);
            if(this.timeOutEvent!=0){
                
            } else {
                this.playToggle();
            }
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
        gotouchmove(){
            clearTimeout(this.timeOutEvent);//清除定时器
            this.timeOutEvent = 0;
        },
  }
}
</script>

<style lang="scss" scoped>
.voice{
    display: flex;
    align-items: center;
    position: relative;
    height:41px;
    background:rgba(237,245,255,1);
    border:1px solid rgba(214,233,255,1);
    border-radius: 4px;
    &:before{
        position: absolute;
        width: 14px;
        height: 14px;
        top: 50%;
        left: -7px;
        margin-top: -7px;
        background:rgba(237,245,255,1);
        border:1px solid rgba(214,233,255,1);
        border-top: 0;
        border-right: 0;
        content: ' ';
        transform: rotate(45deg);
    }
    &:after{
        position: absolute;
        width:9px;
        height:9px;
        top: 6px;
        right: -15px;
        border-radius: 100%;
        background:rgba(234,24,24,1);
        content: ' ';
    }
    &.read:after{
        display: none;
    }
    .wave{
        position: absolute;
        left: -22px;
        top: 50%;
        width: 80px;
        height: 80px;
        margin-top: -40px;
        position: relative;
        transform: rotate(45deg) scale(0.8);
        .wv-circle{
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%, -50%);
        }
    }
    .second{
        margin-left: -35px;
        font-size:12px;
        font-family:DINPro;
        font-weight:500;
        color:rgba(29,119,222,1);
    }
}


</style>
