<template>
  <div class="baogao_card">
      <div class="title">
            <icon name="jcbg_icon_p_5" scale="3.5" class="baogao_card_tt_icon"></icon>
            疑似气虚症
      </div>
      <dl class="content">
          <dt>症状详解</dt>
          <dd>气虚是指由于一身之气不足，以气息低落、肝脏功能状态低下为主要特征的病例状态。在中医中，气被认为是构成和维持人体生命活动的最基本物质。</dd>
          <dt>常见表现</dt>
          <dd>常表现为语声低，气短懒言，精神不振，乏力，易出汗，经常头晕、健忘，冬天怕冷，酷夏怕热等。</dd>
          <dt>常见人群</dt>
          <dd>
              1、一部分脾胃功能虚弱，营养不良的人群； <br>
                2、因挑食、过度减肥等导致饮食失当的人群； <br>
                3、过度劳累、过度安逸，或年老气衰的人群
          </dd>
      </dl>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'baogao_card',
  props: {},
  components: {Icon}
}
</script>
