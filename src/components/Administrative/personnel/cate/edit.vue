<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="类型编号" prop="cate_id">
        <el-input v-model.trim="form.cate_id" class="h-40 w-200" :maxlength=12 disabled></el-input>
      </el-form-item>
      <el-form-item label="类型名称" prop="cate_name">
        <el-input v-model.trim="form.cate_name" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add()" :loading="isLoading">提交</el-button>
        <el-button @click="goback()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
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
        id: null,
        form: {
          cate_id: '',
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
      add() {
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading
            this.apiPut('book/cate/', this.id, this.form).then((res) => {
              this.handelResponse(res, (data) => {
                _g.toastMsg('success', '编辑成功')
                _g.clearVuex('setUsers')
                setTimeout(() => {
                  this.goback()
                }, 1500)
              }, () => {
                this.isLoading = !this.isLoading
              })
            })
          }
        })
      },
      // 获取完整的信息
      async getCompleteData() {
        this.apiGet('book/cate/' + this.id).then((res) => {
//        console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            this.form.cate_id = data.cate_id
            this.form.cate_name = data.cate_name
          })
        })
      }
    },
    created() {
      _g.closeGlobalLoading()
      this.id = this.$route.params.id
      this.getCompleteData()
    },
    mixins: [http, fomrMixin]
  }
</script>