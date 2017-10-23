<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" :rules="rules" label-width="130px">
      <el-form-item label="借阅人名称">
        <span class="w-200">{{form.username}}</span>
      </el-form-item>
      <el-form-item label="图书编号">
        <span class="w-200">{{form.book_number}}</span>
      </el-form-item>
      <el-form-item label="图书名称">
        <span class="w-200">{{form.book_name}}</span>
      </el-form-item>
      <el-form-item label="图书描述">
        <span class="w-200">{{form.book_description}}</span>
      </el-form-item>
      <el-form-item label="所属类别">
        <span class="w-200">{{form.cate_name}}</span>
      </el-form-item>
      <el-form-item label="借阅次数">
        <span class="w-200">{{form.borrowed}}</span>
      </el-form-item>
      <el-form-item label="借阅时间">
        <span v-if="form.borrowed_time == 0">--</span>
        <span v-else>{{form.borrowed_time|time}}</span>
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
          username: '',
          book_name: '',
          book_number: '',
          book_description: '',
          cate_name: '',
          borrowed: '',
          borrowed_time: ''
        },
        isLoading: false
      }
    },

    methods: {
      // 获取基本信息
      async getCompleteData() {
//      this.groupOptions = await this.getAllGroups()
        this.apiGet('book/borrow/' + this.id).then((res) => {
          console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            console.log(data)
            this.form.book_name = data.book_name
            this.form.book_number = data.book_number
            this.form.book_description = data.book_description
            this.form.cate_name = data.cate_name
            this.form.username = data.username
            this.form.borrowed_time = data.borrowed_time
            this.form.borrowed = data.borrowed
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