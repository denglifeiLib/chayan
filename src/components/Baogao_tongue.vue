<template>
  <div class="baogao_card">
      <div class="title">
            <icon name="jcbg_icon_p_2" scale="3.5" class="baogao_card_tt_icon"></icon>
            舌部诊断报告
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
                  type: '舌胖瘦',
                  step: '4',
                  val: '4',
                  result: '1', //0正常 1异常
                  result_dis: '胖瘦适中'
              }, {
                  type: '舌色',
                  step: '9',
                  val: '9',
                  result: '1', //0正常 1异常
                  result_dis: '舌淡红'
              }, {
                  type: '舌点刺',
                  step: '3',
                  val: '3',
                  result: '1', //0正常 1异常
                  result_dis: '无点刺'
              }, {
                  type: '舌裂纹',
                  step: '3',
                  val: '2',
                  result: '0', //0正常 1异常
                  result_dis: '有裂纹'
              }, {
                  type: '舌齿痕',
                  step: '3',
                  val: '3',
                  result: '1', //0正常 1异常
                  result_dis: '无齿痕'
              }, {
                  type: '苔腐腻',
                  step: '4',
                  val: '4',
                  result: '1', //0正常 1异常
                  result_dis: '无腐腻'
              }, {
                  type: '苔剥脱',
                  step: '5',
                  val: '5',
                  result: '1', //0正常 1异常
                  result_dis: '无苔剥'
              }, {
                  type: '舌瘀点',
                  step: '3',
                  val: '3',
                  result: '1', //0正常 1异常
                  result_dis: '无瘀点瘀斑'
              }, {
                  type: '苔色',
                  step: '7',
                  val: '7',
                  result: '1', //0正常 1异常
                  result_dis: '无苔剥'
              }, {
                  type: '苔厚薄',
                  step: '5',
                  val: '2',
                  result: '0', //0正常 1异常
                  result_dis: '苔厚'
              }
          ]
      }
  },
  components: {Icon, Quota}
}
</script>
