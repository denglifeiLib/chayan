<template>
  <div class="baogao_card">
      <div class="title">
            <icon name="jcbg_icon_p_copy2" scale="3.5" class="baogao_card_tt_icon"></icon>
            心养调理方案
      </div>
      <dl class="content">
          <dt>自我调节</dt>
          <dd>
              <p >气虚证的人多沉静内向、对外界事物缺乏兴趣、容易抑郁、胆小、不喜冒险。气虚证的人最忌情绪过激，宜管理好自己的情绪。</p>
          </dd>
          <dt>沉着冷静</dt>
          <dd>
              <img :src="require('@/assets/images/xinyan_1.png')" alt="" class="full_img">
              <p class="type_title_wrap"><span class="type_title"><span>心养方案</span></span></p>
              <p class="wrap">
                  遇事冷静，荣辱不惊，保持体内气机升降有序。
              </p>
          </dd>
          <dt>兴趣广泛</dt>
          <dd>
              <img :src="require('@/assets/images/xinyan_2.png')" alt="" class="full_img">
              <p class="type_title_wrap"><span class="type_title"><span>心养方案</span></span></p>
              <p class="wrap">
                  培养兴趣爱好，多接触新鲜事物，平日可以读书、唱歌、高声朗读等，以振奋精神，避免接触消极悲情的音乐、书籍、影视作品等。
                        
              </p>
          </dd>
          <dt>心胸开阔</dt>
          <dd>
              <img :src="require('@/assets/images/xinyan_3.png')" alt="" class="full_img">
              <p class="type_title_wrap"><span class="type_title"><span>心养方案</span></span></p>
              <p class="wrap">
                  学会心胸开阔，凡事想开一些，坦然面对生活中的悲喜；多于他人交流，向他人倾诉，少思虑，不要钻牛角尖。
              </p>
          </dd>
          
      </dl>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'baogao_card',
  props: {

  },
  components: {Icon}
}
</script>
