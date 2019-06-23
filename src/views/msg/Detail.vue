<template>
    <div>
       <div class="card_wrapper mt25">
           <div class="card_cont">
               <h1>运行错误</h1>
               <p class="dis">
                   <span>爬虫服务-保监会数据</span>
                   <span class="time">2019-03-08 23:12:00</span>
               </p>
               <el-row :gutter="20">
                    <el-col :span="14">
                        <div class="detail">
                            <p>好，下面我就回答一下早应该干嘛。</p>
                            <p>1、单干还是结盟？当然，你也可以单干，和很多老外一样------设计施工、室内室外统统自己搞定。如果做不了孤胆英雄独行侠，那就只能选择结盟。结盟的方式也无外乎两种，1、自己+施工方；2自己+设计方+施工方。2、如何选择盟友？ 先说选择施工队，注意，我所说的是“施工队”而非“装修公司”。因为，只有施工队才是实实在在和你、和你的房子发生关系的人，这个具体的队伍、这些具体的人，比抽象的公司更易于考量。评估办法：直接走访既往客户。最好3户以上，经由预选施工队施工以及经由预选设计师设计的业主，直接倾听业主反馈。注意，a、最好不要让施工队陪同拜访；b、最好是入住半年以上的业主。同样的用户立场、现实的用户体验，是最有说服力的论据。3、歃血为盟。磨刀不费砍柴工，经过筛选，锁定最中意的盟友。签订正式合同，确定彼此的义务，保护彼此的利益。志同道合，是合作的基础。所谓“志同”，就是盟友们都希望打造一个专属于某个人的家，好用、好看、好实惠。所谓“道合”，就是大家彼此认同各自的工作方式、获利方式。3、结盟原则？用人不疑，疑人不用。你已经用理性去判断，就请相信自己的判断，其余的交给运气，更要交给自己。世界就是你的影子，你怎样对待他人，他人也会怎样对待你。在这个诚信普遍缺失的社会，你呼唤和珍惜的，大多数人也不忍践踏。</p>
                        </div>
                    </el-col>
                    <el-col :span="810"></el-col>
                </el-row>
           </div>
       </div>
    </div>
</template>

<script>

export default {
    name: 'msg_detail',
    data() {
        return {
            
        }
    },
    methods: {
        _query() {
            console.log('发送请求', this.$router.history.current.params.id);
            const loading = this.$loading({background:'rgba(0,0,0,0)'});
            setTimeout(() => {
                loading.close();
            }, 500);
            
        },
    },
    created() {
        this._query();
    },
}
</script>

<style scoped lang="scss">
.card_cont{
    padding: 33px 60px;
    h1{
        font-size:20px;
        color:rgba(48,49,51,1);
        line-height:22px;
    }
    .dis{
        font-size:14px;
        color:rgba(96,98,102,1);
        line-height:22px;
        padding: 17px 0 21px;
        border-bottom: solid 1px #E4E7ED;
        span{padding-right: 60px;}
    }
    .detail{
        padding-top: 15px;
        font-size:14px;
        color:rgba(48,49,51,1);
        line-height:23px;
    }
}
</style>