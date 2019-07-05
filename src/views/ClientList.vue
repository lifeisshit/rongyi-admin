<template>
  <div class="client-list">
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
        <el-table-column prop="type" label="类型" :formatter="formatterType"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="userData.compName" label="公司"></el-table-column>
        <el-table-column prop="userData.department" label="部门"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-chage="currentPageChanged"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import '../assets/css/sys-user-list.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import * as constant from '../common/constant'

  export default {
    name: "ClientList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
        keyword: '',
        clientTypes: constant.ClientTypes
      }
    },
    methods: {
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20
        }
        if (this.keyword && this.keyword.trim()) {
          params.keyword = this.keyword
        }
        axios.get(API.ClientPageList, {params: params})
          .then(res => {
            if (res.status != 0) {
              this.$message.error('获取客户列表失败')
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
      formatterType(row, column) {
        return this.clientTypes[row.type - 1]
      }
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>