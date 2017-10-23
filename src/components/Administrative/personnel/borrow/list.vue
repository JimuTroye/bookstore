<template>
  <div>
    <div class="m-b-20 ovf-hd">
      <div class="fl" v-show="addShow">
        借阅归还列表
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
      <el-table-column label="名称" prop="book_name"></el-table-column>
      <el-table-column label="被借次数" prop="borrowed" width="100"></el-table-column>
      <el-table-column label="所属类别" prop="cate_name" width="100"></el-table-column>
      <el-table-column label="借阅时间" width="150">
        <template scope="scope">
          <span v-if="scope.row.borrowed_time == 0">--</span>
          <span v-else>{{scope.row.borrowed_time|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="归还时间" width="150">
        <template scope="scope">
          <span v-if="scope.row.return_time == 0">--</span>
          <span v-else>{{scope.row.return_time|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <div>
            <!--借阅按钮-->
            <span>
              <el-button size="small" type="primary" @click="confirmBorrow(scope.row)"
                         :disabled="scope.row.borrowed_time != 0">借阅</el-button>
            </span>
            <!--归还按钮-->
            <span>
              <el-button size="small" type="primary" @click="confirmReturn(scope.row)"
                         :disabled="scope.row.borrowed_time == 0">归还</el-button>
            </span>
            <!--详情按钮-->
            <span>
              <router-link :to="{ name: 'borrowInfo', params: { id: scope.row.book_number }}">
                <el-button size="small" type="success">详情</el-button>
              </router-link>
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
        user_id: null,
        select: ''
      }
    },
    methods: {
      selectShow() {
//        console.log(this.select)
        this.getAllBooks()
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
      },
      search() {
        router.push({ path: this.$route.path, query: { page: 1 }})
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(page) {
        router.push({ path: this.$route.path, query: { page: page }})
      },
//      图书借阅
      confirmBorrow(item) {
        const data = {
          book_number: item.book_number, // 图书编号
          user_id: this.user_id // 用户id
        }
        this.$confirm('确认借阅该图书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiPost('book/borrow', data).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '借阅成功')
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
          // catch error
        })
      },
//      图书归还
      confirmReturn(item) {
        const data = {
          user_id: this.user_id
        }
        this.$confirm('确认归还该图书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiPut('book/borrow/', item.book_number, data).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '归还成功')
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
            console.log(this.dataCount)
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
      init() {
//        this.getKeywords()
        this.getCurrentPage()
        this.getAllBooks()
      }
    },
    created() {
      this.user_id = Lockr.get('userInfo').id
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