<template>
  <div class="choose_wray_d">
    <div class="choose_wray">
        <div class="close" @click="cancel">
            <icon name="system-cancel-bold" scale="1.5"></icon>
        </div>
        <p class="tt blue">选择回答方式</p>
        <ul>
            <li @click="confirm('text')">
                <icon name="hd_icon_tt" scale="1.4" class="way_icon"></icon>文字回答
            </li>
            <li @click="confirm('voice')">
                <icon name="hd_icon_yy" scale="1.4" class="way_icon"></icon>语音回答
            </li>
        </ul>
    </div>
</div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';

export default {
  name: 'Reply_way_choose',
  data() {
      return {}
  },
  props: {},
  methods: {
      confirm(way) {
          this.$emit('confirm', way)
      },
      cancel() {
          this.$emit('cancel')
      }
  },
  components: {Icon}
}
</script>

<style lang="scss" scoped>
.choose_wray_d{
    position: fixed;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 550;
    align-items: center;
    justify-content: center;
    background:rgba(0,0,0,0.5);
    .choose_wray{
        position: relative;
        padding: 25px 14px 32px;
        width: 70%;
        text-align: center;
        border-radius:4px;
        background: #fff;
        .tt{
            padding-bottom: 7px;
            font-size:17px;
            font-weight:500;
        }
        li{
            display: flex;
            margin-top: 7px;
            height:47px;
            font-size:16px;
            border-radius:2px;
            align-items: center;
            justify-content: center;
            border:1px solid rgba(235,236,241,1);
            .way_icon{
                margin-top: 2px;
                margin-right: 10px;
            }
        }
        .close{
            position: absolute;
            top:0px;
            right: 0px;
            line-height: 1;
            padding: 10px;
        }
    }
}

</style>
