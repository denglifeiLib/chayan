<template>
  <div class="project_all">
      <card-list :tools="['refresh', 'delete']" @refreshClick="refreshClick" @deleteClick="deleteClick" :hasAdd="false"></card-list>
  </div>
</template>

<script>
import cardList from '@/components/cardList';

export default {
    name: "project_classified",
    data() {
        return {
        }
    },
    props: {

    },
    beforeCreate() {
        this.$emit('changePage', 'project_classified')
    },
    methods: {
       refreshClick(item) {
        alert('refreshClick')
       },
       deleteClick(item) {
            alert('deleteClick')
       }
    },
    components: { cardList }
};
</script>
<style scoped lang="scss">
</style>

