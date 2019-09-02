<template>
  <div class="client-list">
    <el-row :gutter="20">
      <el-col :span="1">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"/>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-input v-model="keyword" class="keyword" placeholder="根据姓名，电话，小计搜索">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="deliverStatus" placeholder="请选择上交状态">
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="item in deliverStates" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row class="table-div">
      <el-table :data="tableData" border stype="width: 100%" style="font-size: 8px">
        <el-table-column type="index" label="序号" width="60" header-align="center" align="center"></el-table-column>
        <el-table-column prop="type" label="客户类型" width="70px" :formatter="formatType"></el-table-column>
        <el-table-column prop="phone" label="电话" width="100px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
        <el-table-column prop="deliverStatus" label="上交状态" width="70px" :formatter="formatDeliverStatus"></el-table-column>
        <el-table-column prop="userData.comment" label="小计" show-overflow-tooltip></el-table-column>
        <el-table-column prop="turnOverName" label="移交人" width="70px"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" width="140px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="setDeliverStatus(scope.row)" type="text" size="small">设置上交</el-button>
            <el-button @click="showInfo(scope.row)" type="text" size="small">查看小计</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged">
      </el-pagination>
    </el-row>
    <el-dialog title="设置上交状态" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="客户">
          <el-input v-model="deliverClientName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上交状态">
          <el-select v-model="form.deliverStatus" placeholder="请选择上交状态">
            <el-option v-for="item in deliverStates" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliverDirectorClient">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import '../assets/css/director-client.less'
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
        clientTypes: constant.ClientTypes,
        deliverStates: constant.DeliverStatus,
        deliverStatus: null,
        dialogFormVisible: false,
        deliverClientId: 0,
        deliverClientName: '',
        form: {
        },
        currentPage: 1,
      }
    },
    methods: {
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20,
          type: 9
        }
        if (this.keyword && this.keyword.trim()) {
          params.keyword = this.keyword
        }
        if (this.deliverStatus && this.deliverStatus > 0) {
          params.deliverStatus = this.deliverStatus
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
      formatType(row) {
        return this.clientTypes[row.type - 1].label
      },
      formatDeliverStatus(row) {
        return this.deliverStates[row.deliverStatus - 1].label
      },
      showInfo(row) {
        if (!row.userData || !row.userData.comment) {
          this.$message.info('无用户小计')
          return
        }
        this.$alert(row.userData.comment, '用户小计：' + row.name + ' ' + row.phone, {
          confirmButtonText: '确定'
        })
      },
      setDeliverStatus(row) {
        this.deliverClientId = row.id
        this.deliverClientName = row.name
        this.dialogFormVisible = true
        this.form.deliverStatus = 1
      },
      deliverDirectorClient() {
        if (!this.deliverClientId) {
          this.$message.warning('请选择客户')
          return
        }
        const params = {
          userId: this.deliverClientId,
          status: this.form.deliverStatus
        }
        axios.get(API.DeliverDirectorClient, {
          params: params
        }).then((res) => {
          if (res.status != 0) {
            this.$message.error(res.msg)
          } else {
            this.$message.success('设置成功')
            this.getDataList(this.currentPage)
          }
        }).catch(() => {
          this.$message.error('设置失败')
        })

        this.dialogFormVisible = false
        this.getDataList(this.currentPage)
      },
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>