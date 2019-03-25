<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
    name: 'LineChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    getTimes() {
        let arr = Object.keys(Array.apply(null, {length:24})).map((item)=>{
            let val = +item + 1;
            return val > 9 ? `${val}:00`:`0${val}:00`;
        })
        return arr;
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.getTimes(),
          boundaryGap: false,
          axisTick: {
            show: true
          },
          axisLine: {
              lineStyle: {
                  color: '#5A5A5A'
              }
          }
        },
        yAxis: {
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#5A5A5A'
            },
            splitArea: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted'
                }
            }
        },
        dataZoom: [{
            type: 'slider',
            handleSize: 24,
            height: 24,
            left: 34,
            right: 0,
            bottom: 10,
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            backgroundColor: '#F0F2F5',
            fillerColor: 'rgba(206, 212, 217, .4)',
            handleSize: 24,
            handleColor: '#fff',
            handleStyle: {
                color: '#ffffff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        }, {
            type: 'inside',
            start: 0,
            end: 100
        }],
        grid: {
          left: 10,
          right: 10,
          bottom: 50,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
            right: '14',
            itemHeight: 5,
            data: ['数据1', '数据2']
        },
        series: [{
          name: '数据1', itemStyle: {
            normal: {
              color: '#0285FF',
              lineStyle: {
                color: '#0285FF',
                width: 2
              }
            }
          },
          smooth: false,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '数据2',
          smooth: false,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#2FC25B',
              lineStyle: {
                color: '#2FC25B',
                width: 2
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
