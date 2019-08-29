<template>
  <div class="filter_diaolog">
      <div class="content">
          <div class="up">
            <div class="close" @click="cancel">
                <icon name="system-cancel-bold" scale="1.5"></icon>
            </div>

            <div class="range_box" v-if="filterType==='customer'">
                <custom-slider :min="0" :max="100" @change="change(arguments, 'score')" title="客户分值"></custom-slider>
            </div>
            <div class="range_box" v-if="filterType==='customer'">
                <custom-slider :min="0" :max="20" @change="change(arguments, 'visitTimes')" title="客户拜访次数"></custom-slider>
            </div>
            <div class="range_box" v-if="filterType==='sheet'">
                <custom-slider :min="0" :max="20" @change="change(arguments, 'buyTimes')" title="客户开单次数"></custom-slider>
            </div>

            <div class="select_box pb_area">
                <div class="title">客户拜访时间</div>
                <wv-group class="no_border time_cells">
                    <wv-cell title="年份" is-link :value="visitTime.year"  @click.native="handlerPicker('year')"></wv-cell>
                    <wv-cell title="月份" is-link :value="visitTime.month"  @click.native="handlerPicker('month')"></wv-cell>
                    <wv-cell title="日期" is-link :value="visitTime.day"  @click.native="handlerPicker('day')"></wv-cell>
                </wv-group>
            </div>

            <div class="select_box" v-if="filterType==='sheet'">
                <div class="title">开单险种</div>
                <wv-group class="no_border time_cells">
                    <wv-cell title="年份" is-link :value="visitTime.year"  @click.native="handlerPicker('sheetType')"></wv-cell>
                </wv-group>
            </div>
        </div>
        <div class="fix_bottom_btn filter_btns">
            <wv-flex :gutter="15">
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_plain-blue" :plain="true" @click="reset">重置</wv-button>
                </wv-flex-item>
                <wv-flex-item>
                    <wv-button type="primary" class="weui-btn_blue" @click="confirm">确定</wv-button>
                </wv-flex-item>
            </wv-flex>
        </div>

        <wv-picker
            :visible.sync="showTimePicker"
            :columns="curTimes"
            value-key="time"
            @confirm="confirmTime"
        />

      </div>
  </div>
</template>

<script>

import Icon from 'vue-svg-icon/Icon.vue';
import CustomSlider from './CustomSlider';

export default {
  name: 'FilterDialog',
  data() {
      return {
          score: {
              max: 100,
              min: 0,
          },
          visitTimes: {
              max: 20,
              min: 0,
          },
          buyTimes: {
              max: 20,
              min: 0,
          },
          visitTime: {
              year: '',
              month: '',
              day: ''
          },
          sheetType: 0,
          curTimeKey: 'year',
          showTimePicker: false,
          times: {
            year: {
                values: ['2019','2018','2017'],
                defaultIndex: 0
            },
            month: {
                values: ['1','2'],
                defaultIndex: 0
            },
            day: {
                values: ['1','2'],
                defaultIndex: 0
            },
            sheetType: {
                values: ['一路护航车险'],
                defaultIndex: 0
            }
          },
            curTimes: []
      }
  },
  props: {
    filterType: {
      type: String,
      default: 'customer' //sheet
    }
  },
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        change(vals, type) {
            this[type].min = vals[0];
            this[type].max = vals[1];
        },
        confirmTime(picker, val) {
            const pickerVal = picker.getValues().join();
            if(this.curTimeKey === 'sheetType') {
                this.sheetType = pickerVal
            } else {
                this.$set(this.visitTime, this.curTimeKey, pickerVal);
            }
            
            this.showTimePicker = false;
        },
        handlerPicker(type) {
            this.showTimePicker = true;
            this.curTimes = [this.times[type]];
            this.curTimeKey = type;
        },
        reset() {

        },
        confirm() {
            const {score, visitTimes, buyTimes, visitTime, sheetType} = this;
            this.$emit('confirm', this.filterType === 'customer' ? {score, visitTimes, visitTime} : {buyTimes, visitTime, sheetType})
        }
    },
    components: {Icon, CustomSlider}
}
</script>

<style lang="scss" scoped>
.filter_diaolog{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 501;
    background:rgba(0,0,0,0.5);
    .content{
        position: absolute;
        top:0;
        right: 0;
        bottom: 0;
        left: 24.8%;
        background: #fff;
        .close{
            position: absolute;
            top:10px;
            right: 10px;
            line-height: 1;
            padding: 10px;
        }
        .up{
            padding: 0 20px;
            margin: 50px 0 70px;
            max-height: calc(100% - 120px);
            overflow: scroll;
        }
        .range_box,.pb_area{
            padding-bottom: 42px;
        }
        .select_box{
            .title{
                font-size:14px;
                font-weight:500;
            }
            .time_cells {
                .weui-cell {
                    padding: 13px 0;
                }
            }
        }
        .filter_btns{
            position: absolute;
        }
    }
}


</style>
