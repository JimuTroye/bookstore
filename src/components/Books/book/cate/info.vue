<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="类型编号" prop="cate_id">
        <span class="w-200">{{form.cate_id}}</span>
      </el-form-item>
      <el-form-item label="类型名称" prop="cate_name">
        <span class="w-200">{{form.cate_name}}</span>
      </el-form-item>
      <el-form-item>
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
        id: null,
        form: {
          cate_id: '',
          cate_name: ''
        },
        isLoading: false
      }
    },
    methods: {
// 获取基本信息
      async getCompleteData() {
        this.apiGet('book/cate/' + this.id).then((res) => {
          console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            console.log(data)
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