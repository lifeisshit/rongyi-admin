<template>
  <div class="high-seas-client">
    <el-row>
      <el-col :span="2">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"/>
        </el-tooltip>
      </el-col>
      <el-col :span="8">
        <el-input v-model="keyword" class="keyword" placeholder="根据姓名，电话搜索">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row class="table-div">
      <el-table :data="tableData" border stype="width: 100%">
        <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="userData.compName" label="公司"></el-table-column>
        <el-table-column prop="userData.department" label="部门"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="grab(scope.row)" type="text" size="small">抓取</el-button>
            <!--<el-button @click="updateRow(scope.row)" type="text" size="small">编辑</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-chage="currentPageChanged"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import '../assets/css/high-seas-client.less'
  import axios from 'axios'
  import API from '../api/api.js'

  export default {
    name: "HighSeasClientList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
        keyword: '',
      }
    },
    methods: {
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20,
          type: 8
        }
        if (this.keyword && this.keyword.trim()) {
          params.keyword = this.keyword
        }
        axios.get(API.ClientPageList, {params: params})
          .then(res => {
            if (res.status != 0) {
              this.$message.error('获取公海客户列表失败')
            } else {
              this.tableData = res.data.dataList
              this.totalPage = res.data.totalPage
            }
          })
          .catch(() => {
            this.$message.error('获取客户列表失败')
          })
      },
      clickOnSearch() {
        if (!this.keyword || !this.keyword.trim()) {
          this.$message.warning('请输入搜索关键字')
        } else {
          this.getDataList(1)
        }
      },
      clickOnRefresh() {
        this.getDataList(1)
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
      grab(row) {
        this.$confirm('确定要抓取此客户到"我的客户"吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(API.SysUserGrabHighSeasClient, {
            params: {
              userId: row.id
            }
          }).then(res => {
            if (res.status !== 0) {
              this.$message.error(res.msg)
            } else {
              this.$message({
                type: 'success',
                message: '抓取成功!'
              })
            }
            this.getDataList(1)
          }).catch(() => {
            this.$message.error('抓取失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消抓取'
          })
        })
      }
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>