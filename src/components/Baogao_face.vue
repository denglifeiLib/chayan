<template>
  <div class="baogao_card">
      <div class="title">
            <icon name="jcbg_icon_p_1" scale="3.5" class="baogao_card_tt_icon"></icon>
            面部诊断报告
      </div>
      <dl class="content">
          <dt>分析结论</dt>
          <dd>
              <div class="result_img_tt">
                  <img :src="require('@/assets/images/header.jpg')" alt="">
                  <p>
                      <span class="red">唇色暗红</span>， 面色红黄隐隐、明润含蓄， <span class="red">少量光泽</span>， 无局部特征
                  </p>
              </div>
          </dd>
          <dt>指标分析</dt>
          <dd>
              <quota v-for="(item,index) in quotas" :key="index" :item="item"></quota>
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
          quotas: [
              {
                  type: '唇色',
                  step: '8',
                  val: '6',
                  result: '0', //0正常 1异常
                  result_dis: '唇色暗红'
              }, {
                  type: '面色',
                  step: '8',
                  val: '8',
                  result: '1', //0正常 1异常
                  result_dis: '面色红黄隐隐、明润含蓄'
              }, {
                  type: '面色',
                  step: '4',
                  val: '3',
                  result: '0', //0正常 1异常
                  result_dis: '少量光泽'
              }, {
                  type: '局部特征',
                  step: '5',
                  val: '5',
                  result: '1', //0正常 1异常
                  result_dis: '无局部特征'
              }
          ]
      }
  },
  components: {Icon, Quota}
}
</script>
