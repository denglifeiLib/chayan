<template>
    <div ref="wrapper" class="refresh_box">
        <div class="content refresh_box_content">
            <div class="newxin" v-if="down"><wv-loadmore></wv-loadmore></div>
            <!-- <div class="fake">sdd</div> -->
            <slot></slot>
            <div class="newxin" v-if="up"><wv-loadmore></wv-loadmore></div>
        </div>
    </div>

</template>

<script>

import BScroll from 'better-scroll'

export default {
    name: 'Refresh',
    data() {
        return {
            scroll: null,
            down: false,
            up: false,
            data: 100,
            options: {
                pullDownRefresh: {
                    threshold: 20,
                    stop: 20
                },
                pullUpLoad: {
                    threshold: 20, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                    stop: 20
                }
            },
            parentRefresh: true,
            parentLoadMore: false
        };
    },
    // props: {
    //     refresh:{
    //         type: Boolean,
    //         default: false
    //     },
    //     loadMore:{
    //         type: Boolean,
    //         default: false
    //     }
    // },

    mounted() {
        this.$nextTick(()=>{
            let h = document.querySelector('.refresh_box_content').getBoundingClientRect().height;
            document.querySelector('.refresh_box').style.height = h + 'px';
            document.querySelector('.refresh_box_content').style.height = (h+2) + 'px';
            console.log(333333333, h)
        })

    },
    watch: {
        refresh(n,o) {
            console.log('change refresh-----:', n,o)
            this.parentRefresh = n
        },
        loadMore(n,o) {
            console.log('change loadMore------:', n,o)
            this.parentLoadMore = n
        }
    },
    computed: {
        
    },
    methods: {
        init(obj) {
            this.scroll = new BScroll(this.$refs.wrapper, this.options);
            obj.refresh && this.scroll.on('pullingDown', this.pullingDownAction);
            obj.loadmore && this.scroll.on('pullingUp', this.pullingUpAction)
        },
        pullingDownAction() {
            this.down = true;
            this.$emit('refreshAction', ()=> {
                this.scroll.finishPullDown();
                this.down = false;
            });
            console.log('pullingDown......');
        },
        pullingUpAction() {
            this.up = true;
            this.$emit('loadMoreAction', ()=> {
                this.scroll.finishPullUp();
                this.up = false;
            });
            console.log('pullingUp......');
        }
    },
    props: {

    }
}
</script>


<style lang="scss" scoped>


.refresh_box {
    width: 100%;
    // height: calc(100% - 30px);
    // position: absolute;
    overflow: hidden;
    .fake{
        height: 1px;
        text-indent: -2000px;
    }
    .weui-loadmore{
        margin: 0 auto;
        padding: 10px 0;
    }
    .content {
        background: orange;
        width: 100%;
        // min-height: calc(100% + 30px);
    }
}


.wrapper .content li {
    background-color: #ffffff;
    width: 100%;
    height: 66px;
    text-align: center;
    line-height: 66px;
    border-bottom: solid 1px #f0f0f0;
}
/* 刷新 */

// .newxin {
//     width: 100%;
//     height: 50px;
//     text-align: center;
//     line-height: 50px;
//     background: red;
// }

</style>
