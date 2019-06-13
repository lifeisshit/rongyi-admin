<template>
  <div class="appointment-project-list">
    <div v-if="listMode">
      <el-row>
        <el-col :span="4">
          <el-tooltip placement="right" content="刷新">
            <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-input v-model="keyword" class="keyword" placeholder="根据手机，标题，姓名搜索">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
          <el-table-column prop="contact" label="联系人"></el-table-column>
          <el-table-column prop="phone" label="联系人手机"></el-table-column>
          <el-table-column prop="title" label="投递标题"></el-table-column>
          <el-table-column prop="user.name" label="投递人姓名"></el-table-column>
          <el-table-column prop="user.phone" label="投递人电话"></el-table-column>
          <el-table-column prop="user.phone" label="投递人性别"></el-table-column>
          <el-table-column prop="fund.personName" label="资金方姓名"></el-table-column>
          <el-table-column prop="fund.title" label="资金方标题"></el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
  import '../assets/css/appointment-project.less'
  import axios from 'axios'
  import API from '../api/api.js'

  export default {
    name: "AppointmentProjectList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        keyword: '',
      }
    },
    methods: {
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
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20
        }
        if (this.keyword && this.keyword.trim()) {
          params.keyword = this.keyword
        }
        axios.post(API.AppointmentProjectPageList, params).then(res => {
          if (res.status !== 0) {
            this.$message.error('获取投递项目列表失败')
          } else {
            this.tableData = res.data.dataList
            this.totalPage = res.data.totalPage
          }
        }).catch(() => this.$message.error('获取投递项目列表失败'))
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
    },
    mounted() {
      this.getDataList(1)
    }
  }
</script>
