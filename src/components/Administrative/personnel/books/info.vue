<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" label-width="130px">
      <el-form-item label="图书编号">
        <span class="w-200">{{book_number}}</span>
      </el-form-item>
      <el-form-item label="图书名称">
        <span class="w-200">{{book_name}}</span>
      </el-form-item>
      <el-form-item label="图书描述">
        <span class="w-200">{{book_description}}</span>
      </el-form-item>
      <el-form-item label="所属类别">
        <span class="w-200">{{cate_name}}</span>
      </el-form-item>
      <el-form-item label="借阅次数">
        <span class="w-200">{{borrowed}}</span>
      </el-form-item>
      <el-form-item label="借阅时间">
        <span v-if="borrowed_time == 0" class="w-200">--</span>
        <span v-else class="w-200">{{borrowed_time|time}}</span>
      </el-form-item>
      <el-form-item label="归还时间">
        <span v-if="return_time == 0" class="w-200">--</span>
        <span v-else class="w-200">{{return_time|time}}</span>
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
        book_name: '',
        book_number: '',
        book_description: '',
        cate_name: '',
        borrowed: '',
        borrowed_time: '',
        return_time: '',
        isLoading: false
      }
    },
    methods: {
// 获取基本信息
      async getCompleteData() {
        this.apiGet('book/books/' + this.id).then((res) => {
          this.handelResponse(res, (data) => {
            console.log(data[0].book_name)
            this.book_name = data[0].book_name
            this.book_number = data[0].book_number
            this.book_description = data[0].book_description
            this.cate_name = data[0].cate_name
            this.borrowed = data[0].borrowed
            this.borrowed_time = data[0].borrowed_time
            this.return_time = data[0].return_time
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