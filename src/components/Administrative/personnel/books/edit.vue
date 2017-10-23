<template>
  <div class="m-l-50 m-t-30 w-500">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="图书编号" prop="book_number">
        <el-input v-model.trim="form.book_number" class="h-40 w-200" :maxlength=12 disabled></el-input>
      </el-form-item>
      <el-form-item label="图书名称" prop="book_name">
        <el-input v-model.trim="form.book_name" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="图书描述" prop="book_description">
        <el-input type="textarea" v-model="form.book_description" class="w-300"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" prop="cate_id">
        <el-select v-model="form.cate_id" placeholder="请选择图书所属类别" class="w-200">
          <el-option v-for="item in cateOptions" :label="item.cate_name" :value="item.cate_id"></el-option>
        </el-select>
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
          book_name: '',
          book_number: '',
          book_description: '',
          cate_id: null
        },
        cateOptions: [],
        rules: {
          book_name: [
            { required: true, message: '请输入图书名称' }
          ],
          book_description: [
            { required: true, message: '请输入图书描述' }
          ],
          cate_id: [
            { required: true, message: '请选择图书所属类别' }
          ]
        }
      }
    },
    methods: {
      // 获取完整的图书信息
      async getCompleteData() {
        this.getAllCate()
        this.apiGet('book/books/' + this.id).then((res) => {
          console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            console.log(data)
            this.form.book_name = data[0].book_name
            this.form.book_number = data[0].book_number
            this.form.book_description = data[0].book_description
          })
        })
      },
      add() {
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading
            this.apiPut('book/books/', this.id, this.form).then((res) => {
              this.handelResponse(res, (data) => {
                _g.toastMsg('success', '编辑成功')
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