<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor';
    import emotions from './emotions';
    import emotions2 from './emotions_2';
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        },
        validateEmpty() {
            if( document.querySelector('.w-e-text').innerHTML=== '<p><br></p>' || !this.editorContent) {
                document.querySelector('.w-e-text').innerHTML='';
            }
        },
        forceEmpty() {
            document.querySelector('.w-e-text').innerHTML='';
            this.editorContent = '';
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor);
        
        editor.customConfig.menus = [
            'image',
            'emoticon'
        ];

        editor.customConfig.linkImgCheck = function (src) {
            console.log(src) // 图片的链接
            return true // 返回 true 表示校验成功
            // return '验证失败' // 返回字符串，即校验失败的提示信息
        };
        editor.customConfig.uploadImgShowBase64 = true;

        console.log(22222, emotions)
        editor.customConfig.emotions = [{
            title: 'emoji_1',
            type: 'image',
            content: emotions
        }, {
            title: 'emoji_2',
            type: 'image',
            content: emotions2
        }];

        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.validateEmpty();
          this.$emit('change', this.editorContent);
        }
        editor.create();
        this.validateEmpty();
        console.log(44444, this.editorContent)
        // document.querySelector('.w-e-text').setAttribute('placeholder', '2222222');
      }
    }
</script>

<style lang="scss">
    .w-e-toolbar{
        height:46px;
        background:rgba(246,247,251,1);
        border: 0!important;
        .w-e-menu i{
            line-height:36px;
            font-size: 18px;
        }
    }
    .w-e-text-container{
        height: 240px!important;
        border: 0!important;
        border-bottom: solid 1px #EEEEF0!important;
        overflow: hidden;
        .w-e-text{
            width: auto!important;
            margin-right: -18px;
            padding: 10px;
            font-size: 14px;
            background: url('../../assets/images/editor_bg.png') center no-repeat;
            &:empty:before{ 
                content: '请输入回答'; 
                color: #C0C4CC; 
            } 
            &:focus{
                content:none;
            }
        }
    }
</style>
