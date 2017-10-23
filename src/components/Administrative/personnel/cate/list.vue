<template>
  <div>
    <div class="m-b-20 ovf-hd">
      <div class="fl" v-show="addShow">
        <router-link class="btn-link-large add-btn" to="add">
          <i class="el-icon-plus"></i>&nbsp;&nbsp;添加类型
        </router-link>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="cate_id" label="类型编号"></el-table-column>
      <el-table-column label="类型名称" prop="cate_name"></el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <div>
            <span>
              <router-link :to="{ name: 'cateEdit', params: { id: scope.row.cate_id }}" class="btn-link edit-btn">
                编辑
              </router-link>
            </span>
            <span>
              <router-link :to="{ name: 'cateInfo', params: { id: scope.row.cate_id }}" class="btn-link edit-btn">
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
        limit: null,
        value: ''
      }
    },
    methods: {
      search() {
        router.push({ path: this.$route.path, query: { page: 1 }})
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(page) {
        router.push({ path: this.$route.path, query: { page: page }})
      },
      confirmDelete(item) {
        this.$confirm('确认删除该图书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiDelete('book/cate/', item.cate_id).then((res) => {
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
      getAllCates() {
        this.loading = true
        const data = {
          params: {
            page: this.currentPage
          }
        }
        // 这里获取类型列表
        this.apiGet('book/cate/', data).then((res) => {
          // console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            this.tableData = data.data
            this.dataCount = data.total
            this.limit = 3
            console.log(this.tableData)
          })
        })
      },
      getCurrentPage() {
        let data = this.$route.query
//        console.log(data)
        if (data) {
          if (data.page) {
            this.currentPage = parseInt(data.page)
          } else {
            this.currentPage = 1
          }
        }
      },
      init() {
        this.getCurrentPage()
        this.getAllCates()
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