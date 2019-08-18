<template>
  <div class="baogao_card">
      <div class="title">
            <icon name="jcbg_icon_p_4" scale="3.5" class="baogao_card_tt_icon"></icon>
            居养调理方案
      </div>
      <dl class="content">
          <dt>环境</dt>
          <dd>
              <img :src="require('@/assets/images/juyan.png')" alt="" class="full_img">
              <p class="type_title_wrap"><span class="type_title blue"><span>宜</span></span></p>
              <p class="wrap">
                  应当尽量选择在空气清新，安静，温度、湿度适宜的环境下居住。通过改善居住环境，改善心情，有助于调理身体。
              </p>
              <p class="type_title_wrap"><span class="type_title red"><span>忌</span></span></p>
              <p class="wrap">不可长时间处于寒冷的环境中，气虚者体质较弱，免疫力低，容易感冒，宜避寒就温。</p>
          </dd>

          <dt>衣着</dt>
          <dd>
              <img :src="require('@/assets/images/juyan_2.png')" alt="" class="full_img">
              <p class="type_title_wrap"><span class="type_title blue"><span>宜</span></span></p>
              <p class="wrap">
                  1、衣着要舒适。应选择棉质、透气的衣服，尤其是贴身衣物，以防止引起皮肤不适；鞋子要选择舒适、合脚的圆头包鞋，鞋底应厚而柔软，具有一定的缓冲力。
<br>
<br>
2、注意保暖。注意对身体的保暖，谨避风寒，预防感冒，尤其是秋冬季节对关节、腰腹部、颈部、背部、脚部的保暖，夏天尽量少用空调，不宜衣着暴露，春宜捂秋不宜冻。                        
              </p>
              <p class="type_title_wrap"><span class="type_title red"><span>忌</span></span></p>
              <p class="wrap">避免穿衣过紧 ，穿衣禁忌领口紧、腰口紧、袜口紧“三紧”，避免加重心脏的负担，影响末梢循环等。
                        </p>
          </dd>

          <dt>环境</dt>
          <dd>
              <img :src="require('@/assets/images/juyan_3.png')" alt="" class="full_img">
              <p class="type_title_wrap"><span class="type_title blue"><span>宜</span></span></p>
              <p class="wrap">
                  1、养成规律作息，保证充足的睡眠，每晚宜7-8个小时，早上固定起床时间以调节生物钟；养成良好的午睡习惯，可以在餐后散步30分钟左右再午睡，午睡时间以30分钟至45分钟
适宜。<br><br>

2、养生定时饮水的习惯，每天饮水6-8杯为宜。<br><br>

3、养成定期大便和有尿意就应立即小便的良好习惯。
              </p>
              <p class="type_title_wrap"><span class="type_title red"><span>忌</span></span></p>
              <p class="wrap">1、忌身体过劳，如：长期从事体力劳动，或运动过度，或患病硬熬。<br>
2、忌精神过劳，用脑过度，长期的思虑等。<br>
3、忌用房事过劳，纵欲过度。<br>
4、忌过逸少动，生活太过安逸，体内气血运行缓慢。<br>
5、忌随便推迟进食时间，易引起消化系统疾病。</p>
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
