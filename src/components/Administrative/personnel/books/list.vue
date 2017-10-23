<template>
  <div>
    <div class="m-b-20 ovf-hd">
      <div class="fl" v-show="addShow">
        <router-link class="btn-link-large add-btn" to="add">
          <i class="el-icon-plus"></i>&nbsp;&nbsp;添加图书
        </router-link>
      </div>
      <el-select v-model="select" class="fr" @change="selectShow">
        <el-option label="全部" value="0"></el-option>
        <el-option label="借阅书籍" value="1"></el-option>
        <el-option label="未被借阅" value="2"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
      <!--复选框-->
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="book_number" label="编号" width="100"></el-table-column>
      <el-table-column label="名称" prop="book_name" ></el-table-column>
      <el-table-column label="被借次数" prop="borrowed" width="100"></el-table-column>
      <el-table-column label="所属类别" prop="cate_name" width="100"></el-table-column>
      <el-table-column v-if="borrowed_time == 0" label="借阅时间" prop="--" width="150"></el-table-column>
      <el-table-column label="借阅时间" width="150">
        <template scope = "scope">
          <span v-if="scope.row.borrowed_time == 0">--</span>
          <span v-else>{{scope.row.borrowed_time|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="归还时间" width="150">
        <template scope = "scope">
          <span v-if="scope.row.return_time == 0">--</span>
          <span v-else>{{scope.row.return_time|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <div>
            <span>
              <router-link :to="{ name: 'booksEdit', params: { id: scope.row.book_number }}" class="btn-link edit-btn">
                编辑
              </router-link>
            </span>
            <span>
              <router-link :to="{ name: 'booksInfo', params: { id: scope.row.book_number }}" class="btn-link edit-btn">
                详情
              </router-link>
            </span>
            <span>
              <el-button size="small" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pos-rel p-t-20">
      <!--<btnGroup :selectedData="multipleSelection" :type="'users'"></btnGroup>-->
      <!--分页-->
      <div class="block pages">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="limit"
                       :current-page="currentPage" :total="dataCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import btnGroup from '../../../Common/btn-group.vue'
  import http from '../../../../assets/js/http'

  export default {
    data() {
      return {
        tableData: [],
        dataCount: null,
        currentPage: null,
        multipleSelection: [],
        limit: 3,
        select: ''
      }
    },
    methods: {
      selectShow() {
//        console.log(this.select)
        this.getAllBooks()
      },
      search() {
        router.push({ path: this.$route.path, query: { keywords: this.keywords, page: 1 }})
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(page) {
        router.push({ path: this.$route.path, query: { keywords: this.keywords, page: page }})
      },
      // 删除图书
      confirmDelete(item) {
        this.$confirm('确认删除该图书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiDelete('book/books/', item.book_number).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '删除成功')
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
          // catch error
        })
      },
      getAllBooks() {
        this.loading = true
        const data = {
          params: {
            select: this.select, // 选择显示
            page: this.currentPage // 当前页
          }
        }
        // 这里获取图书列表
        this.apiGet('book/books', data).then((res) => {
          // console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            this.tableData = data.data
            this.dataCount = data.total
          })
        })
      },
      getCurrentPage() {
        let data = this.$route.query
        if (data) {
          if (data.page) {
            this.currentPage = parseInt(data.page)
          } else {
            this.currentPage = 1
          }
        }
      },
      getKeywords() {
        let data = this.$route.query
        if (data) {
          if (data.keywords) {
            this.keywords = data.keywords
          } else {
            this.keywords = ''
          }
        }
      },
      init() {
        this.getKeywords()
        this.getCurrentPage()
        this.getAllBooks()
        console.log('value' + this.select)
      }
    },
    created() {
      this.init()
    },
    computed: {
      addShow() {
        return _g.getHasRule('users-save')
      },
      editShow() {
        return _g.getHasRule('users-update')
      },
      deleteShow() {
        return _g.getHasRule('users-delete')
      }
    },
    watch: {
      '$route'(to, from) {
        this.init()
      }
    },
    components: {
      btnGroup
    },
    mixins: [http]
  }
</script>