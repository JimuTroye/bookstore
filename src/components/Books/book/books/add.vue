<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="图书名称" prop="book_name">
        <el-input v-model.trim="form.book_name" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="book_description">
        <el-input type="textarea" v-model="form.book_description" class="w-200"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" prop="cate_id">
        <el-select v-model="form.cate_id" placeholder="请选择类别" class="w-200">
          <!--循环类别-->
          <el-option v-for="item in cateOptions" :label="item.cate_name" :value="item.cate_id"></el-option>
        </el-select>
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
          book_name: '',
          book_description: '',
          cate_id: null
        },
        cateOptions: [], // 类别列表
        rules: {
          book_name: [
            { required: true, message: '请输入图书名称' }
          ],
          book_description: [
            { required: true, message: '请输入图书描述' }
          ],
          cate_id: [
            { required: true, message: '请选择所属类别' }
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
            this.apiPost('book/books', this.form).then((res) => {
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
      },
//      加载所有图书类型
      getAllCate() {
        this.apiGet('book/cate').then((res) => {
          this.handelResponse(res, (data) => {
            this.cateOptions = data.data
            console.log(this.orgsOptions)
          })
        })
      }
    },
    created() {
      _g.closeGlobalLoading()
      this.getAllCate()
    },
    mixins: [http, fomrMixin]
  }
</script>