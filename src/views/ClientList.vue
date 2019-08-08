<template>
  <div class="client-list">
    <el-row :gutter="20">
      <el-col :span="1">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"/>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <el-input v-model="keyword" class="keyword" placeholder="根据姓名，电话，公司搜索">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="clientType" placeholder="请选择客户类型">
          <el-option label="全部客户" value="0"></el-option>
          <el-option v-for="item in clientTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="industry" placeholder="请选择行业">
          <el-option label="全部行业" value=""></el-option>
          <el-option v-for="(item, index) in industries" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row class="table-div">
      <el-table :data="tableData" border stype="width: 100%">
        <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="type" label="客户类型" :formatter="formatterType"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="userData.industry" label="行业"></el-table-column>
        <el-table-column prop="userData.compName" label="公司"></el-table-column>
        <el-table-column prop="userData.department" label="部门"></el-table-column>
        <el-table-column prop="owner.name" label="所属销售"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" width="160px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="assignClient(scope.row)" type="primary" size="small">分 配</el-button>
            <el-button @click="pushToHighSeas(scope.row)" type="primary" size="small">设为公海</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged">
      </el-pagination>
    </el-row>

    <el-dialog title="分配销售人员" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="30%">
      <el-form :model="form">
        <el-form-item label="销售人员">
          <el-select v-model="form.salesmanId" placeholder="销售人员" width="20%">
            <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignToSales">确 定</el-button>
      </div>
    </el-dialog>
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
        clientType: null,
        clientTypes: constant.ClientTypes,
        industry: null,
        industries: constant.Industries,
        dialogFormVisible: false,
        form: {
        },
        salesList: [],
        assignClientId: 0,
        currentPage: 1
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
        if (this.clientType && this.clientType > 0) {
          params.type = this.clientType
        }
        if (this.industry) {
          params.industry = this.industry
        }
        axios.post(API.ClientPageList, params)
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
        this.getDataList(1)
      },
      clickOnRefresh() {
        this.getDataList(1)
      },
      currentPageChanged(cp) {
        this.currentPage = cp
        this.getDataList(cp)
      },
      formatterType(row) {
        return this.clientTypes[row.type - 1].label
      },
      getSalesList() {
        axios.get(API.SysUserListSales)
          .then(res => {
            if (res.status != 0) {
              this.$message.error('获取销售人员列表失败')
            } else {
              this.salesList = res.data
            }
          })
          .catch(() => {
            this.$message.error('获取销售人员列表失败')
          })
      },
      assignClient(row) {
        this.assignClientId = row.id
        this.dialogFormVisible = true
      },
      assignToSales() {
        if (!this.form.salesmanId) {
          this.$message.warning('请选择销售人员')
          return
        }
        const params = {
          userId: this.assignClientId,
          ownerId: this.form.salesmanId
        }
        let qs = require('qs')
        axios.post(API.ClientAssignOwner, qs.stringify(params)).then((res) => {
          if (res.status != 0) {
            this.$message.error(res.msg)
          } else {
            this.$message.success('分配成功')
            this.getDataList(this.currentPage)
          }
        }).catch(() => {
          this.$message.error('分配失败')
        })

        this.dialogFormVisible = false
      },
      pushToHighSeas(row) {
        this.$confirm(`确定将"${row.name}"设置为公海客户吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let qs = require('qs')
          const params = {
            userId: row.id
          }
          axios.post(API.ClientPushToHighSeas, qs.stringify(params)).then(res => {
            if (res.status !== 0) {
              this.$message.error(res.msg)
            } else {
              this.$message.success('设置成功')
              this.getDataList(this.currentPage)
            }
          }).catch(() => {
            this.$message.error('设置失败')
          })

        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    },
    mounted: function () {
      this.getSalesList()
      this.getDataList(1)
    }
  }
</script>