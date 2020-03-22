<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: this.content
        }
      },
      props: {
          content: {
              type: String,
              default: ''
          }
      },
      methods: {
        getContent() {
            return this.editorContent;
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.customConfig.uploadImgShowBase64 = true
        editor.create();
        this.content && editor.txt.html(this.content)
      }
    }
</script>

<style scoped>
</style>