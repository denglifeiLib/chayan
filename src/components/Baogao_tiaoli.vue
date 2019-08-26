<template>
  <div class="baogao_card">
      <div class="title">
            <icon name="jcbg_icon_p_3" scale="3.5" class="baogao_card_tt_icon"></icon>
            食养调理方案
      </div>
      <dl class="content">
          <dt>指标分析</dt>
          <dd>
            <p>
                1、选择性平偏温的，补益方面偏于脾肾的食物和药材。<br>
                2、宜温补，即补益要细水长流，循序渐进，不能峻补，蛮补， 呆补。<br>
                3、少食多餐，少吃油炸食物。
            </p>
          </dd>
          <dt>一日食谱</dt>
          <dd>
              <div class="shi">
                <div class="show_img_desc" v-for="(item,k) in shi" :key="k">
                    <img :src="item.img" alt="" :style="{width:'58px'}">
                    <div>
                        <p class="show_type">{{item.title}}</p>
                        <p class="des">{{item.dis}}</p>
                    </div>
                </div>
              </div>
              <div class="shi">
                  <p class="type_title_wrap"><span class="type_title"><span>早餐</span></span></p>
                  <div class="show_img_desc" v-for="(item,k) in shi_zao" :key="k">
                        <img :src="item.img" alt="" :style="{width:'51px'}">
                        <div>
                            <p class="show_type">{{item.title}}</p>
                            <p class="des">{{item.dis}}</p>
                        </div>
                    </div>
              </div>
              <div class="shi">
                  <p class="type_title_wrap"><span class="type_title"><span>午餐</span></span></p>
                  <div class="show_img_desc" v-for="(item,k) in shi_wu" :key="k">
                        <img :src="item.img" alt="" :style="{width:'51px'}">
                        <div>
                            <p class="show_type">{{item.title}}</p>
                            <p class="des">{{item.dis}}</p>
                        </div>
                    </div>
              </div>
              <div class="shi">
                  <p class="type_title_wrap"><span class="type_title"><span>晚餐</span></span></p>
                  <div class="show_img_desc" v-for="(item,k) in shi_wan" :key="k">
                        <img :src="item.img" alt="" :style="{width:'51px'}">
                        <div>
                            <p class="show_type">{{item.title}}</p>
                            <p class="des">{{item.dis}}</p>
                        </div>
                    </div>
              </div>
          </dd>
          <dt>宜吃</dt>
          <dd>
              <div class="shi">
                <div class="show_img_desc" v-for="(item,k) in guo" :key="k">
                    <img :src="item.img" alt="" :style="{width:'58px'}">
                    <div>
                        <p class="show_type">{{item.title}}</p>
                        <p class="des">{{item.dis}}</p>
                    </div>
                </div>
              </div>
          </dd>
          <dt>忌吃</dt>
          <dd>
              <div class="wrap">
                  <p class="type_title_wrap"><span class="type_title"><span>水果</span></span></p>
                    <p>山楂，槟榔，金桔，柚子，柑，橙子，柿子等</p>
              </div>
              <div class="wrap">
                  <p class="type_title_wrap"><span class="type_title"><span>蔬菜</span></span></p>
                    <p>萝卜缨，苤蓝，生萝卜，佛手柑，空心菜，紫苏叶，芥菜，荸荠，苦瓜等</p>
              </div>
              <div class="wrap">
                  <p class="type_title_wrap"><span class="type_title"><span>蔬菜</span></span></p>
                <p>大蒜，胡椒，荷叶，松花蛋，薄荷，冰激凌，菊花，烟酒，油炸食物等</p>
              </div>
          </dd>
          <dt>食谱</dt>
          <dd>
              <div class="img_lists">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_1.png')" alt="">
                                <span class="des">人参蛤蜊汤</span>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_2.png')" alt="">
                                <span class="des">黄芪童子鸡</span>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
              </div>
              <div class="img_lists">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_3.png')" alt="">
                                <span class="des">人参蛤蜊汤</span>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_4.png')" alt="">
                                <span class="des">黄芪童子鸡</span>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
              </div>
              <div class="img_lists">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_5.png')" alt="">
                                <span class="des">人参蛤蜊汤</span>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_6.png')" alt="">
                                <span class="des">黄芪童子鸡</span>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
              </div>
              <div class="img_lists">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_7.png')" alt="">
                                <span class="des">人参蛤蜊汤</span>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_8.png')" alt="">
                                <span class="des">黄芪童子鸡</span>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
              </div>
              <div class="img_lists">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_9.png')" alt="">
                                <span class="des">人参蛤蜊汤</span>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_10.png')" alt="">
                                <span class="des">黄芪童子鸡</span>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
              </div>
              <div class="img_lists">
                    <wv-flex :gutter="10">
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_11.png')" alt="">
                                <span class="des">人参蛤蜊汤</span>
                            </div>
                        </wv-flex-item>
                        <wv-flex-item>
                            <div class="list_img">
                                <img :src="require('@/assets/images/pu_12.png')" alt="">
                                <span class="des">黄芪童子鸡</span>
                            </div>
                        </wv-flex-item>
                    </wv-flex>
              </div>
          </dd>
      </dl>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import Quota from './Quota';
export default {
  name: 'baogao_card',
  data() {
      return {
          shi: [
              {
                  img: require('@/assets/images/shi_1.png'),
                  title: '下午加餐',
                  dis: '蜜汁烤板栗 3-5个 '
              }, {
                  img: require('@/assets/images/shi_2.png'),
                  title: '睡前加餐',
                  dis: '固元如意膏 20g'
              }, {
                  img: require('@/assets/images/shi_3.png'),
                  title: '下午加餐',
                  dis: '苹果 1个'
              }
          ],
          shi_zao: [
              {
                  img: require('@/assets/images/shi_11.png'),
                  title: '苹果小米粥',
                  dis: '50g'
              }, {
                  img: require('@/assets/images/shi_12.png'),
                  title: '什锦麦胚饼',
                  dis: '100g'
              }
          ],
          shi_wu: [
              {
                  img: require('@/assets/images/shi_21.png'),
                  title: '黑米饭',
                  dis: '2两'
              }, {
                  img: require('@/assets/images/shi_22.png'),
                  title: '黄芪童子鸡',
                  dis: '100g'
              }, {
                  img: require('@/assets/images/shi_23.png'),
                  title: '山药莲子炖猪肚',
                  dis: '100g'
              }, {
                  img: require('@/assets/images/shi_24.png'),
                  title: '南瓜蒸蛋羹',
                  dis: '100g'
              }
          ], 
          shi_wan: [
              {
                  img: require('@/assets/images/shi_31.png'),
                  title: '黄芪牛肉蔬菜汤  ',
                  dis: '100g'
              }, {
                  img: require('@/assets/images/shi_32.png'),
                  title: '人参大枣粥',
                  dis: '100g'
              }
          ],
          guo: [
              {
                  img: require('@/assets/images/guo_1.png'),
                  title: '水果',
                  dis: '黑枣，苹果，龙眼肉，葡萄，草莓，荔枝，番石榴等'
              }, {
                  img: require('@/assets/images/guo_2.png'),
                  title: '蔬菜',
                  dis: '白扁豆，红薯，南瓜，包心菜，番茄，胡萝卜，土豆，山药，香菇，豆腐等'
              }, {
                  img: require('@/assets/images/guo_3.png'),
                  title: '肉类',
                  dis: '鸡肉，鹅肉，兔肉，牛肉，羊肉，狗肉，猪肚等'
              }, {
                  img: require('@/assets/images/guo_4.png'),
                  title: '水产',
                  dis: '泥鳅，黄鳝，鲢鱼，黄鱼，比目鱼，鲫鱼等'
              }, {
                  img: require('@/assets/images/guo_5.png'),
                  title: '水果',
                  dis: '玉米，燕麦，粳米，黑米，糯米，小米，莜麦，大豆等'
              }, {
                  img: require('@/assets/images/guo_6.png'),
                  title: '其他',
                  dis: '大枣，蜂蜜，板栗，花生，黑芝麻，莲子，鹌鹑蛋，豆浆，牛奶，饴糖等'
              }
          ]
      }
  },
  components: {Icon, Quota}
}
</script>
