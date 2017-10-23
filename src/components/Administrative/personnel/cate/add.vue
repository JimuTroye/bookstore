<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="类型名称" prop="cate_name">
        <el-input v-model.trim="form.cate_name" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('form')" :loading="isLoading">提交</el-button>
        <el-button @click="goback()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style type="text/css">
  .form-checkbox:first-child {
    margin-left: 15px;
  }
</style>
<script>
  import http from '../../../../assets/js/http'
  import fomrMixin from '../../../../assets/js/form_com'

  export default {
    data() {
      return {
        isLoading: false,
        form: {
          cate_name: ''
        },
        rules: {
          cate_name: [
            { required: true, message: '请输入类型名称' }
          ]
        }
      }
    },
    methods: {
      add(form) {
        console.log('res = ', _g.j2s(this.form))
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading
            this.apiPost('book/cate', this.form).then((res) => {
              this.handelResponse(res, (data) => {
                _g.toastMsg('success', '添加成功')
//                _g.clearVuex('setUsers')
                setTimeout(() => {
                  this.goback()
                }, 1500)
              }, () => {
                this.isLoading = !this.isLoading
              })
            })
          }
        })
      }
    },
    created() {
      _g.closeGlobalLoading()
    },
    mixins: [http, fomrMixin]
  }
</script>