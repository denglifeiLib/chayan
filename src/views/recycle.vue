<template>
  <div class="project_all">
      <card-list :tools="['refresh', 'delete', 'classify']" @refreshClick="(item)=>{showConfirm('refresh', item)}" @deleteClick="(item)=>{showConfirm('delete', item)}" @classifyClick="(item)=>{showConfirm('classify', item)}" :hasAdd="false"></card-list>
  </div>
</template>

<script>
import cardList from '@/components/cardList';

export default {
    name: "recycle",
    data() {
        return {
        }
    },
    props: {

    },
    beforeCreate() {
        this.$emit('changePage', 'recycle')
    },
    methods: {
       showConfirm(type, item) {
            let tips = '';
            let btnTxt = '';
            let title = '';
            if(type==='delete') {
                title = '彻底删除项目';
                tips = '一旦将【建筑项目】移到回收站，所有与项目有关的信息将会被移到回收站，其中的内容也不会被统计和搜索记录，需要去回收站恢复后才能继续使用。';
                btnTxt = '移至回收站';
            }
            if(type==='classify') {
                title = '归档项目';
                tips = '一旦将【建筑项目】归档，本项目和所含信息将会被移到【归档项目】内，其中的内容依然会被通缉和搜索收录，归档项目可以随时回复并继续使用。';
                btnTxt = '归档';
            }
            if(type==='refresh') {
                title = '恢复项目';
                tips = '恢复本项目后，你就可以正常使用本项目了。';
                btnTxt = '确定';
            }
            if(type!=='refresh') {
                this.$alert(tips, {
                    customClass: 'cus_alert',
                    title: title,
                    confirmButtonText: btnTxt,
                    confirmButtonClass: 'cus_btn',
                    center: true,
                    callback: ()=> {
                       this.$message({
                            type: 'success',
                            message: '成功' + btnTxt 
                        });
                    }
                })
            } else {
                this.$confirm(tips, {
                    customClass: 'cus_alert',
                    title: title,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // center: true,
                    // callback: ()=> {
                    //     // this.$emit(type)
                    // }
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '成功恢复项目!'
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
            }
            
        }
    },
    components: { cardList }
};
</script>
<style scoped lang="scss">
</style>

