<template>
    <el-dialog :title="type === 'add' ? '添加题目' : '编辑题目'"  :visible.sync="show" :center="true" :close-on-click-modal="false" width="500px" @close="close">
        <el-form label-position="right" label-width="100px" :model="form" class="content" size="mini" ref="form">
            <el-form-item 
                label="题目：" 
                prop="title"
                :rules="{
                    required: true, message: '请输入问卷标题', trigger: 'blur'
                }">
                <el-input v-model="form.title" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item 
                label="题目类型："
                prop="type"
                 placeholder="请选择"
                :rules="{
                    required: true, message: '请选择题目类型', trigger: 'change'
                }">
                <el-select v-model="form.type" style="width: 350px">
                    <el-option label="单选" value="single"></el-option>
                    <el-option label="多选" value="multiple"></el-option>
                    <el-option label="判断" value="whether"></el-option>
                    <el-option label="填空" value="what"></el-option>
                </el-select>
            </el-form-item>
<!-- 选项 -->
            <el-form-item 
                :label="(item-1) | toEnglishKey('选项')" 
                v-if="['multiple', 'single'].indexOf(form.type)>-1 && multipleNum>0" 
                v-for="item in multipleNum" 
                :key="item">
                <el-input placeholder="请输入" v-model="form.question[item-1]" style="width: 330px"></el-input>
                <i class="el-icon-close" @click="deleteQuestion(item-1)"></i>
            </el-form-item>
            <el-form-item v-if="['multiple', 'single'].indexOf(form.type)>-1">
                <el-button icon="el-icon-plus"  type="primary" plain @click="multipleNum += 1" size="small" style="width: 350px">添加选项</el-button>
            </el-form-item>

            <el-form-item 
                label="答案：" 
                v-if="form.type === 'single' && multipleNum>0">
                <el-radio-group v-model="form.answer">
                    <el-radio :label="(item-1) | toEnglishKey" v-for="item in multipleNum" :key="item"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item 
                label="答案：" 
                v-if="form.type === 'multiple' && multipleNum>0"
                :rules="{
                    required: true, message: '请选择正确答案', trigger: 'blur'
                }">
                <el-checkbox-group v-model="form.answer">
                    <el-checkbox :label="(item-1) | toEnglishKey" v-for="item in multipleNum" :key="item"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item 
                label="答案：" 
                v-if="form.type === 'whether'"
                :rules="{
                    required: true, message: '请选择正确答案', trigger: 'blur'
                }">
                <el-radio-group v-model="form.answer">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item 
                label="答案：" 
                v-if="form.type === 'what'"
                :rules="{
                    required: true, message: '请填写正确答案', trigger: 'blur'
                }">
                <el-input placeholder="请输入" v-model="form.answer"></el-input>
            </el-form-item>

            <el-form-item label="问题解析：" >
                <el-input placeholder="请输入" type="textarea" v-model="form.analyse"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Icon from 'vue-svg-icon/Icon.vue';
export default {
    name: 'StrategyTemplate',
    data() {
        return {
            show: true,
            formLabelWidth: '140px',
            multipleNum: 0,
            form: {
                title: '',
                type: '', //单选 single  多选 multiple  判断 whether  填空 what
                question: [],
                answer: [],
                analyse: ''
            }
        }
    },
    props: {
        type: {
            type: String,
            default: 'add'
        },
        data: {
            type: Object,
            default: ()=> {}
        }
    },
    created() {
        this.form = {...this.form, ...this.data}
        this.multipleNum = (this.form.question || []).length
    },
    watch: {
        'form.type'(nval, oval) {
            if(oval) {
                if(nval === 'what' || nval === 'single') {
                    this.$set(this.form, 'answer', '')
                } else {
                    this.$set(this.form, 'answer', [])
                }

                if(nval === 'what' || nval === 'whether') {
                    this.$set(this.form, 'question', [])
                }
            }
            
        }
    },
    methods: {
        deleteQuestion(item) {
            this.form.question.splice(item, 1);
            if(this.form.type === 'single') {
                this.$set(this.form, 'answer', []);
            }
            if(this.form.type === 'multiple') {
                this.$set(this.form, 'answer', []);
            }
            this.multipleNum -= 1;
        },
        handleRemove(index) {
            this.form.tableData.splice(index, 1);
            console.log(this.form.tableData)
        },
        save(type) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.close()
                    this.$emit('submit', this.form);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        close() {
            this.$emit('close')
        }
    },
    components: {Icon}
}
</script>

<style lang="scss">

</style>
