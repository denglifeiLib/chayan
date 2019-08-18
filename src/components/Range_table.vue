<template>
  <div class="range_table">
      <table>
          <thead>
              <tr>
                  <td v-for="(columnEl,k) in column" :key="k" :width="columnEl.width">{{columnEl.title}}</td>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(row,k) in rows" :key="k">
                <td v-for="(columnEl,j) in column" :key="j" :class="row.range? 'self':''">
                      <!-- {{[columnEl.key]}} -->
                      <span v-if="columnEl.key!=='name'">
                          {{!row[columnEl.key] && columnEl.key === 'range' ? k+1 : row[columnEl.key]}}
                      </span>
                      <div v-if="columnEl.key==='name'" class="name_column">
                          <img :src="row.header" alt="" class="header">
                          <p class="name">{{row.name}}</p>
                          <p class="dis">{{row.office}}</p>
                      </div>
                </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
import Quota from './Quota';
export default {
  name: 'baogao_card',
  data() {
      return {
          
      }
  },
  props: {
    rows: {
        type: Array,
        detault: ()=>[]
    },
    column: {
        type: Array,
        detault: ()=>[]
    }
  },
  components: {Icon, Quota}
}
</script>

<style scoped lang="less">
.range_table{
    width: 100%;
    table{width: 100%;}
    thead td{
        height: 34px;
        line-height: 34px;
        text-align: center;
        height:34px;
        background:rgba(249,250,252,1);
        font-size:13px;
font-weight:500;
color:rgba(168,168,168,1);
    }
    tbody td{
        padding: 10px 20px;
        vertical-align: middle;
        text-align: center;
        font-size:13px;
        font-weight:500;
        color:rgba(51,51,51,1);
        &.self{
            background: #FFFBEF;
        }
        &:last-child{
            font-size: 14px;
        }
    }
    tbody tr:nth-child(1) td:first-child{
        background: url(../assets/images/range_1.png) center center no-repeat;
        background-size: 24px 24px;
        text-indent: -10000px;
    }
    tbody tr:nth-child(2) td:first-child{
        background: url(../assets/images/range_2.png) center center no-repeat;
        background-size: 24px 24px;
        text-indent: -10000px;
    }
    tbody tr:nth-child(3) td:first-child{
        background: url(../assets/images/range_3.png) center center no-repeat;
        background-size: 24px 24px;
        text-indent: -10000px;
    }
    .name_column{
        text-align: left;
        overflow: hidden;
        .header{
            float: left;
            width:40px;
            height:40px;
            margin-right: 13px;
            border-radius: 100%;
        }
        .dis{
            font-size:12px;
            font-weight:400;
            color:rgba(168,168,168,1);
        }
    }
}
</style>
