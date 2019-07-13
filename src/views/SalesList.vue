<template>
<div class="sales-list">
  <el-row :gutter="20">
    <el-col :span="1">
      <el-tooltip placement="right" content="刷新">
        <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="4">
      <el-input v-model="keyword" class="keyword" placeholder="根据姓名搜索">
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
    </el-col>
  </el-row>
  <br>
  <el-row class="table-div">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
      <el-table-column prop="roleDesc" label="角色"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="newCount" label="新客户数量"></el-table-column>
      <el-table-column prop="latentCount" label="潜在客户数量"></el-table-column>
      <el-table-column prop="keyCount" label="重点客户数量"></el-table-column>
      <el-table-column prop="unChargeCount" label="预收费客户"></el-table-column>
      <el-table-column prop="tiedanCount" label="铁单客户"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="160px" fixed="right"></el-table-column>
    </el-table>
    <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged">
    </el-pagination>
  </el-row>
</div>
</template>

<script>
import '../assets/css/sales-list.less'
import axios from 'axios'
import API from '../api/api.js'

export default {
  name: 'SalesList',
  data() {
    return {
      tableData: [],
      totalPage: 1,
      keyword: '',
      formData: {}
    }
  },
  methods: {
    clickOnSearch() {
      this.getDataList(1)
    },
    clickOnRefresh() {
      this.getDataList(1)
    },
    getDataList(cp) {
      const params = {
        pageNum: cp,
        pageSize: 20
      }
      if (this.keyword && this.keyword.trim()) {
        params.keyword = this.keyword
      }
      axios.get(API.SysUserPageListSalesStat, {
        params: params
      }).then(res => {
        if (res.status !== 0) {
          this.$message.error('获取销售列表失败')
        } else {
          this.tableData = res.data.dataList
          this.totalPage = res.data.totalPage
        }
      }).catch(() => this.$message.error('获取销售列表失败'))
    },
    currentPageChanged(cp) {
      this.getDataList(cp)
    }
  },
  mounted() {
    this.getDataList(1)
  }
}
</script>
