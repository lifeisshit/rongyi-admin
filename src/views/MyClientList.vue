<template>
  <div class="high-seas-client">
    <div v-if="listMode">
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
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background
                       @current-chage="currentPageChanged"></el-pagination>
      </el-row>
    </div>
    <div v-if="!listMode">
      <el-form ref="traceForm" :model="traceFormData" :rules="traceFormRule" label-width="120px">
        <el-form-item label="客戶类型:" prop="type" class="inline-item">
          <el-select v-model="traceFormData.type" placeholder="请选择客戶类型">
            <el-option v-for="(item, index) in clientTypes" :label="item" :key="index" :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟踪方式:">
          <el-radio-group v-model="traceFormData.traceType">
            <el-radio label="电话"></el-radio>
            <el-radio label="总经理批注"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报价情况:">
          <el-radio-group v-model="traceFormData.isOffer">
            <el-radio label="未报价"></el-radio>
            <el-radio label="已报价"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注:" prop="comment">
          <el-input type="textarea" :rows="5" v-model="traceFormData.comment" placeHolder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="下次跟踪提醒:" prop="nextTraceTime">
          <el-date-picker v-model="traceFormData.nextTraceTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入下次跟踪提醒时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="沟通详情:" prop="type" class="inline-item">
          <el-select v-model="traceFormData.type" placeholder="请选择客戶类型">
            <el-option v-for="(item, index) in clientTypes" :label="item" :key="index" :value="index+1">
            </el-option>
          </el-select>
          <el-select v-model="traceFormData.type" placeholder="请选择客戶类型">
            <el-option v-for="(item, index) in clientTypes" :label="item" :key="index" :value="index+1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import '../assets/css/high-seas-client.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import { ClientTypes } from '../common/constant'

  export default {
    name: "MyClientList",
    data() {
      return {
        clientTypes: ClientTypes,
        listMode: false,
        tableData: [],
        totalPage: 1,
        keyword: '',
        traceFormData: {
          traceType: 1,
          type: 1,
          isOffer: 0,
          comment: '',
          nextTraceTime: ''
        },
        traceFormRule: {}
      }
    },
    methods: {
      getDataList(cp) {
        console.log(this.$store.getters.loginUserId);
        const params = {
          pageNum: cp,
          pageSize: 20,
          ownerLogin: this.$store.getters.loginUserId
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
      }
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>