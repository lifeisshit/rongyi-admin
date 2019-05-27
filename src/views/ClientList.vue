<template>
  <div class="client-list">
    <el-row>
      <el-col :span="2">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"/>
        </el-tooltip>
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
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-chage="currentPageChanged"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import '../assets/css/sys-user-list.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import { MemberObject, MemberType, MemberDuty } from '../common/constant'

  export default {
    name: "ClientList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
      }
    },
    methods: {
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20
        }
        axios.get(API.ClientPageList, params)
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
      clickOnRefresh() {
        this.getDataList(1)
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      }
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>