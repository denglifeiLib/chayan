<template>
  <div class="app-wrapper">
    工作台
  </div>
</template>

<script>

export default {
    name: 'Workbench',
    data () {
        return {
           
        };
    },
    computed: {},
    methods: {
        toggleSideBar() {
            this.isCollapse = !this.isCollapse;
        },
    },
    components: { },
}
</script>
<style lang="scss" scoped>

</style>
