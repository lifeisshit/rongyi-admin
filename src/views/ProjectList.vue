<template>
  <div class="project-list">
    <div v-if="listMode">
      <el-row>
        <el-col :span="4">
          <el-tooltip placement="right" content="刷新">
            <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-input v-model="keyword" class="keyword" placeholder="根据标题搜索">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="clickOnAddNew">新增项目</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="personName" label="人名"></el-table-column>
          <el-table-column prop="region" label="地区"></el-table-column>
          <el-table-column prop="industry" label="行业"></el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
              <el-button @click="updateRow(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged">
        </el-pagination>
      </el-row>
    </div>
    <div v-if="!listMode">
      <el-row>
        <el-col :span="12">
          <el-form ref="projectForm" :model="formData" :rules="formRule" label-width="280px">
            <el-form-item label="项目类型:" prop="type">
              <el-select v-model="formData.type" placeholder="请选择项目类型">
                <el-option v-for="item in projectTypes" :label="item" :key="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeHolder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="人名:" prop="personName">
              <el-input v-model="formData.personName" placeHolder="请输入人名"></el-input>
            </el-form-item>
            <el-form-item label="所在地区:" prop="region">
              <el-select v-model="formData.region" placeholder="请选择所在地区">
                <el-option v-for="item in regions" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="约谈次数:" prop="talkNum">
              <el-input v-model="formData.talkNum" placeHolder="请输入约谈次数" type="number"></el-input>
            </el-form-item>
            <el-form-item label="留言次数:" prop="msgNum">
              <el-input v-model="formData.msgNum" placeHolder="请输入留言次数" type="number"></el-input>
            </el-form-item>
            <el-form-item label="所在行业:（项目融资，政府招商专用）" prop="industry">
              <el-input v-model="formData.industry" placeHolder="请输入所在行业"></el-input>
            </el-form-item>
            <el-form-item label="融资金额:（项目融资专用）" prop="financeAmount">
              <el-input v-model="formData.financeAmount" placeHolder="请输入融资金额"></el-input>
            </el-form-item>
            <el-form-item label="融资方式:（项目融资专用）" prop="financeWay">
              <el-input v-model="formData.financeWay" placeHolder="请输入融资方式"></el-input>
            </el-form-item>
            <el-form-item label="融资用途:（项目融资专用）" prop="financeUse">
              <el-input v-model="formData.financeUse" placeHolder="请输入融资用途"></el-input>
            </el-form-item>
            <el-form-item label="项目阶段:（项目融资专用）" prop="projectPeriod">
              <el-input v-model="formData.projectPeriod" placeHolder="请输入项目阶段"></el-input>
            </el-form-item>
            <el-form-item label="转让价格:（资产交易专用）" prop="transferPrice">
              <el-input v-model="formData.transferPrice" placeHolder="请输入转让价格"></el-input>
            </el-form-item>
            <el-form-item label="资产估价:（资产交易专用）" prop="assetValue">
              <el-input v-model="formData.assetValue" placeHolder="请输入资产估价"></el-input>
            </el-form-item>
            <el-form-item label="交易类别:（资产交易专用）" prop="dealType">
              <el-input v-model="formData.dealType" placeHolder="请输入交易类别"></el-input>
            </el-form-item>
            <el-form-item label="交易方式:（资产交易专用）" prop="dealWay">
              <el-input v-model="formData.dealWay" placeHolder="请输入交易方式"></el-input>
            </el-form-item>
            <el-form-item label="投资估算:（政府招商专用）" prop="investEstimate">
              <el-input v-model="formData.investEstimate" placeHolder="请输入投资估算"></el-input>
            </el-form-item>
            <el-form-item label="招商方式:（政府招商专用）" prop="attractWay">
              <el-input v-model="formData.attractWay" placeHolder="请输入招商方式"></el-input>
            </el-form-item>
            <el-form-item label="产品类型:（投资理财专用）" prop="productType">
              <el-input v-model="formData.productType" placeHolder="请输入产品类型"></el-input>
            </el-form-item>
            <el-form-item label="投资门槛:（投资理财专用）" prop="investThreshold">
              <el-input v-model="formData.investThreshold" placeHolder="请输入投资门槛"></el-input>
            </el-form-item>
            <el-form-item label="投资期限:（投资理财专用）" prop="investTime">
              <el-input v-model="formData.investTime" placeHolder="请输入投资期限"></el-input>
            </el-form-item>
            <el-form-item label="投资金额:（投资理财专用）" prop="investAmount">
              <el-input v-model="formData.investAmount" placeHolder="请输入投资金额"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="submit-div">
        <el-button type="primary" @click="clickOnSubmit">提交</el-button>
        <el-button type="primary" @click="clickOnCancel">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import '../assets/css/project.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import { Regions, ProjectTypes } from '../common/constant.js'

  export default {
    name: "ProjectList",
    data() {
      return {
        // some data
        regions: Regions,
        projectTypes: ProjectTypes,
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        keyword: '',
        formData: {},
        formRule: {
          type: [{
            required: true,
            message: '请输入项目类型',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          personName: [{
            required: true,
            message: '请输入人名',
            trigger: 'blur'
          }],
          talkNum: [{
            required: true,
            message: '请输入约谈次数',
            trigger: 'blur'
          }],
          msgNum: [{
            required: true,
            message: '请输入留言次数',
            trigger: 'blur'
          }],
          investTime: [{
            required: false,
            message: '请输入投资期限',
            trigger: 'blur'
          }],
          investThreshold: [{
            required: false,
            message: '请输入投资门槛',
            trigger: 'blur'
          }],
          investEstimate: [{
            required: false,
            message: '请输入投资估算',
            trigger: 'blur'
          }],
          assetValue: [{
            required: false,
            message: '请输入资产估价',
            trigger: 'blur'
          }],
          transferPrice: [{
            required: false,
            message: '请输入转让价格',
            trigger: 'blur'
          }],
          investAmount: [{
            required: false,
            message: '请输入投资金额',
            trigger: 'blur'
          }],
          productType: [{
            required: false,
            message: '请输入产品类型',
            trigger: 'blur'
          }],
          attractWay: [{
            required: false,
            message: '请输入招商方式',
            trigger: 'blur'
          }],
          dealWay: [{
            required: false,
            message: '请输入交易方式',
            trigger: 'blur'
          }],
          dealType: [{
            required: false,
            message: '请输入交易类别',
            trigger: 'blur'
          }],
          projectPeriod: [{
            required: false,
            message: '请输入项目阶段',
            trigger: 'blur'
          }],
          financeUse: [{
            required: false,
            message: '请输入融资用途',
            trigger: 'blur'
          }],
          financeAmount: [{
            required: false,
            message: '请输入融资金额',
            trigger: 'blur'
          }],
          financeWay: [{
            required: false,
            message: '请输入融资方式',
            trigger: 'blur'
          }],
          region: [{
            required: true,
            message: '请输入所在地区',
            trigger: 'blur'
          }],
          industry: [{
            required: true,
            message: '请输入所在行业',
            trigger: 'blur'
          }],
        }
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
      deleteRow(rId) {
        console.log(rId)
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(API.ProjectDelete, {
            params: {
              id: rId
            }
          }).then(res => {
            if (res.status !== 0) {
              this.$message.error(res.msg)
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.getDataList(1)
          }).catch(() => {
            this.$message.error('删除失败')
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      updateRow(row) {
        this.formData.id = row.id
        this.formData.type = row.type
        this.formData.title = row.title
        this.formData.personName = row.personName
        this.formData.talkNum = row.talkNum
        this.formData.msgNum = row.msgNum
        this.formData.investTime = row.investTime
        this.formData.investThreshold = row.investThreshold
        this.formData.investEstimate = row.investEstimate
        this.formData.assetValue = row.assetValue
        this.formData.transferPrice = row.transferPrice
        this.formData.investAmount = row.investAmount
        this.formData.productType = row.productType
        this.formData.attractWay = row.attractWay
        this.formData.dealWay = row.dealWay
        this.formData.dealType = row.dealType
        this.formData.projectPeriod = row.projectPeriod
        this.formData.financeUse = row.financeUse
        this.formData.financeAmount = row.financeAmount
        this.formData.financeWay = row.financeWay
        this.formData.region = row.region
        this.formData.industry = row.industry

        this.isAdd = false
        this.listMode = false
      },
      clickOnAddNew() {
        // 重置所有的formData
        this.formData = {}
        this.isAdd = true
        this.listMode = false
      },
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20
        }
        if (this.keyword && this.keyword.trim()) {
          params.keyword = this.keyword
        }
        axios.post(API.ProjectPageList, params).then(res => {
          if (res.status !== 0) {
            this.$message.error('获取成功案例列表失败')
          } else {
            this.tableData = res.data.dataList
            this.totalPage = res.data.totalPage
          }
        }).catch(() => this.$message.error('获取成功案例列表失败'))
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
      clickOnSubmit() {

        this.$refs.projectForm.validate().then(() => {
          console.log(this.formData)
          let api = this.isAdd ? API.ProjectAdd : API.ProjectUpdate
          axios.post(api, this.formData).then(res => {
            console.log(res)
            if (res.status !== 0) {
              this.$message.error('保存失败')
            } else {
              this.$message.success(res.msg)
              this.getDataList(1)
              this.listMode = true
            }
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
      clickOnCancel() {
        this.listMode = true
      },
    },
    mounted: function () {
      this.getDataList(1)
    }
  }
</script>