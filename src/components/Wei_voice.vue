<template>
    <div :class="`voice ${isRead && 'read'}`">
        <div class="wave">
            <wv-circle :diameter="18" stroke-color="#1D77DE" :line-width="2" fill-color="transparent" :value="25" trail-color="transparent"></wv-circle>
            <wv-circle :diameter="26" stroke-color="#1D77DE" :line-width="2" fill-color="transparent" :value="25" trail-color="transparent"></wv-circle>
            <wv-circle :diameter="35" stroke-color="#1D77DE" :line-width="2" fill-color="transparent" :value="25" trail-color="transparent"></wv-circle>
        </div>
        <span class="second">02’22’’</span>
    </div>
</template>

<script>
export default {
  name: 'wei_voice',
  props: {
    isRead: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.voice{
    display: flex;
    align-items: center;
    margin: 20px;
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
