<template>
  <div class="project_all">
      <card-list :tools="['set']" @setClick="setClick" @addClick="addClick"></card-list>
      <project-set-dialog :show="showSetDialog" @close="closeSetDialog"></project-set-dialog>
      <add-project-model :show="showaddDialog" @addProjectClick="addProjectClick" @close="showaddDialog=false"></add-project-model>
      <add-project-form :show="showaddFormDialog" @created="created" @close="showaddFormDialog=false"></add-project-form>
  </div>
</template>

<script>
import cardList from '@/components/cardList';
import ProjectSetDialog from '@/components/ProjectSetDialog';
import addProjectModel from '@/components/addProjectModel';
import addProjectForm from '@/components/addProjectForm';

export default {
    name: "project_all",
    data() {
        return {
           showSetDialog: false,
           showaddDialog: false,
           showaddFormDialog: false,
        }
    },
    props: {

    },
    beforeCreate() {
        this.$emit('changePage', 'project_all')
    },
    methods: {
       setClick(item) {
           this.showSetDialog = true;
       },
       closeSetDialog() {
           this.showSetDialog = false;
       },
       addClick() {
           this.showaddDialog = true;
       },
       addProjectClick() {
           this.showaddDialog = false;
           this.showaddFormDialog = true;
       },
       created() {
           this.$confirm('确认关闭？').then(_ => {
                this.showaddFormDialog = false;
                done();
            }).catch(_ => {});
           
       }
    },
    components: { cardList, ProjectSetDialog, addProjectModel, addProjectForm }
};
</script>
<style scoped lang="scss">
</style>

