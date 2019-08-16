<template>
  <div class="high-seas-client">
    <el-row :gutter="20">
      <el-col :span="1">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"/>
        </el-tooltip>
      </el-col>
      <el-col :span="6">
        <el-input v-model="keyword" class="keyword" placeholder="根据姓名，电话，公司，小计搜索">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="lastFlushTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择剔除日期"></el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-select v-model="industry" placeholder="请选择行业">
          <el-option label="全部行业" value=""></el-option>
          <el-option v-for="(item, index) in industries" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row class="table-div">
      <el-table :data="tableData" border stype="width: 100%">
        <el-table-column type="index" label="序号" width="60px" header-align="center" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120px"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60px"></el-table-column>
        <el-table-column prop="userData.industry" label="行业" width="140px" show-overflow-tooltip=:"true"></el-table-column>
        <el-table-column prop="userData.compName" label="公司" width="200px" show-overflow-tooltip=:"true"></el-table-column>
        <el-table-column prop="lastTracerName" label="剔除人员"></el-table-column>
        <el-table-column prop="lastFlushTime" label="剔除时间" width="160px"></el-table-column>
        <el-table-column prop="userData.comment" label="小计" show-overflow-tooltip=:"true"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" width="160px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="showInfo(scope.row)" type="text" size="small">查看小计</el-button>
            <el-button @click="grab(scope.row)" type="text" size="small">抓取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged"></el-pagination>
    </el-row>
  </div>
</template>

<script>
  import '../assets/css/high-seas-client.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import * as constant from '../common/constant'

  export default {
    name: "HighSeasClientList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
        keyword: '',
        industry: null,
        industries: constant.Industries,
        lastFlushTime: ''
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
        if (this.industry) {
          params.industry = this.industry
        }
        console.log(this.lastFlushTime)
        if (this.lastFlushTime) {
          params.lastFlushTime = this.lastFlushTime
        }
        axios.post(API.ClientPageList, params)
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
        this.getDataList(1)
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
      },
      showInfo(row) {
        this.$alert(row.userData.comment, '用户小计：' + row.name, {
          confirmButtonText: '确定'
        });
      }
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>