<template>
  <div class="hamburger" @click="toggleClick">
    <i class="el-icon-document">专业版<span class="blue">1.0</span></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  cursor: pointer;
}
.el-icon-document{
    font-size: 16px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
.blue{
    color: #409EFF;
}
</style>
