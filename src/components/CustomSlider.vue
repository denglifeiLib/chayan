<template>
    <div id="c-slider">
        <div class="title" v-if="title">{{title}} <span class="value">{{startStep}} ~ {{endStep}}</span></div>
        <div class="slider">
            <div class="ruler" id="ruler" ref="ruler">
                <div ref="bar" class="bar startbar" @touchstart="startTouchstart" @touchmove="startTouchmove" @touchend="touchEnd"></div>
                <div ref="endbar" class="bar endbar" @touchstart="endTouchstart" @touchmove="endTouchmove" @touchend="touchEnd"></div>
                <div class="track" ref="track"></div>
            </div>
            <div class="date clearfix">
                <div class="fl">{{intervalStart}}</div>
                <div class="fr">{{intervalEnd}}</div>
            </div>
        </div>
    </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';


export default {
    name: 'CustomSlider',
    data () {
        return {
            $ruler: '', // 滑竿
            $bar: '', // 左侧滑块
            $endbar: '', // 右侧滑块
            startX: '', // 左侧滑块位置
            endX: '', // 右侧滑块位置
            step: '', // 滑竿在限定范围内可以分多少步
            intervalStart: this.min, 
            intervalEnd: this.max,
            startStep:  this.min, 
            endStep: this.max,
            amountW: '' //  滑竿多长距离
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
    },
    created() {
        const vm = this;
        vm.$nextTick(() => {
            vm.initSlider();
        })
    },
    methods: {
        initSlider(){
            const vm = this;
            vm.$ruler = vm.$refs.ruler;
            vm.$bar = vm.$refs.bar;
            vm.$endbar = vm.$refs.endbar;
            vm.$track = vm.$refs.track;
            // 滑竿多长距离
            vm.amountW = vm.$ruler.clientWidth - vm.$bar.clientWidth; 
            // 总共多少步
            vm.step = vm.amountW / (vm.intervalEnd - vm.intervalStart);
        },
        startTouchstart(e) {
            const vm = this;
            // 开始滑动时滑块的位置
            vm.startX = e.touches[0].pageX;
        },
        startTouchmove(e) {
            const vm = this;

            // 滑动距离=当前滑块x距离-最开始滑块距离
            let slidedis = e.touches[0].pageX - vm.$ruler.getBoundingClientRect().left; 

            // 滑动距离小于0 或者大于滑竿的宽度，return掉
            if (slidedis < 0 || slidedis > vm.amountW) {
            return;
            }
            let ste = Math.round(slidedis / vm.step);
            if ((ste + vm.intervalStart) >= vm.endStep) {
            return;
            }
            vm.startStep = ste + vm.intervalStart;
            vm.$bar.style.left = (ste * vm.step) + 'px';
            vm.$track.style.left = (ste * vm.step) + 'px';
        },
        endTouchstart(e) {
            const vm = this;
            // 开始滑动时滑块的位置
            vm.endX = e.touches[0].pageX; 
        },
        endTouchmove(e) {
            const vm = this;
            // 滑动距离=当前滑块x距离-最开始滑块距离
            let slidedis = e.touches[0].pageX - vm.$ruler.getBoundingClientRect().left; 
            let slideW = vm.$ruler.getBoundingClientRect().width;

            if (slidedis < 0 || slidedis > vm.amountW) {
                return;
            }
            let ste = Math.round(slidedis / vm.step);

            if (vm.startStep >= (ste + vm.intervalStart)) {
                return;
            }
            vm.endStep = ste + vm.intervalStart;

            if(vm.endStep==24){
                vm.$endbar.style.left = ''
                vm.$endbar.style.right = '0px'
            }else{
                vm.$endbar.style.left = (ste * vm.step) + 'px';
                vm.$track.style.right = (slideW - ste * vm.step) + 'px';
            }
        },
        touchEnd() {
            this.$emit('change', this.startStep, this.endStep);
        }
    }
}
</script>

<style lang="scss" scoped>
#c-slider{
  .clearfix{
    &:after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .title{
      font-size:14px;
        font-weight:500;
        .value{
            padding-left: 13px;
            font-size:14px;
            font-weight:500;
            color:rgba(29,119,222,1);
        }
  }
  .slider{
    margin: auto;
    .date{
      color: #333;
      font-size: .7rem;
      margin-top: 1rem;
      .fl{
        float: left;
      }
      .fr{
        float: right;
      }
    }
    .ruler{
      height:4px;
        background:rgba(235,236,241,1);
        border-radius:2px;
      position:  relative;
      margin-top: 32px;
      .track{
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          height: 4px;
          background:rgba(29, 119, 222, 1);
          z-index: 2;
      }
      .bar{
        position: absolute;
        top: -8px;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background: rgba(29, 119, 222, 1);
        font-size:  0.3rem;
        line-height:  0.65rem;
        text-align:  center;
        z-index: 3;
        &::before,&::after{
            position: absolute;
            width:2px;
            height:8px;
            top: 6px;
            content: ' ';
            background:rgba(255,255,255,1);
        }
        &::before{
            left:7px;
        }
        &::after{
            right:7px;
        }
      }
      .startbar{
        left: 0;
      }
      .endbar{
        right: 0;
      }
    }
  }
}


</style>
