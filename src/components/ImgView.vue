<template>
    <div class="ImgView">
        <el-image 
            style="width: 100px; height: 100px"
            :src="value" 
            :preview-src-list="[value]">
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
    </div>
</template>

<script>
export default {
  name: 'ImgView',
  props: {
    value: {
        type: String,
        default: ''
    },
    data: {
      type: Object,
      default: ()=> { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: {
        type: Number,
        default: 0
    },
    column: {
        type: Object,
        default: ()=> { return {} }
    }
  },
  created(){
    
  },
  methods: {
    click({key}) {
      this.$emit('action', key, this.data, this.index);
    }
  }
}
</script>

<style lang="scss" scoped>
.ImgView{
    
}
</style>
