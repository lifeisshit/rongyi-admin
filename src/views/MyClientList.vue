<template>
  <div class="my-client-list">
    <div v-if="pageMode === 'list'">
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
              <el-button @click="onEditClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="onTraceClick(scope.row)" type="text" size="small">跟踪</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background
                       @current-chage="currentPageChanged"></el-pagination>
      </el-row>
    </div>
    <div v-if="pageMode === 'trace'">
      <el-row class="trace-table">
        <el-table :data="traceList" border stype="width: 100%">
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="way" label="跟踪方式"></el-table-column>
          <el-table-column prop="offerSituation" label="报价情况"></el-table-column>
          <el-table-column prop="firstCommuDetail" label="沟通详情1"></el-table-column>
          <el-table-column prop="secondCommuDetail" label="沟通详情2"></el-table-column>
          <el-table-column prop="thirdCommuDetail" label="沟通详情3"></el-table-column>
          <el-table-column prop="comment" label="备注"></el-table-column>
          <el-table-column prop="nextRemind" label="下次跟踪提醒"></el-table-column>
        </el-table>
      </el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>新增跟踪信息</span>
        </div>
        <el-row>
          <el-col :span="18">
            <el-form ref="traceForm" :model="traceFormData" :rules="traceFormRule" label-width="120px">
              <el-form-item label="客戶类型:" prop="clientType">
                <el-select v-model="traceFormData.clientType" placeholder="请选择客戶类型">
                  <el-option v-for="(item, index) in clientTypes" :label="item" :key="index" :value="index+1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="跟踪方式:" prop="way">
                <el-radio-group v-model="traceFormData.way">
                  <el-radio v-for="item in traceWays" :label="item" :key="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="报价情况:" prop="offerSituation">
                <el-radio-group v-model="traceFormData.offerSituation">
                  <el-radio v-for="item in offerSituations" :label="item" :key="item"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注:" prop="comment">
                <el-input type="textarea" :rows="5" v-model="traceFormData.comment" placeHolder="请输入备注"></el-input>
              </el-form-item>
              <el-form-item label="下次跟踪提醒:" prop="nextRemind">
                <el-date-picker v-model="traceFormData.nextRemind" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入下次跟踪提醒时间"></el-date-picker>
              </el-form-item>
              <el-form-item label="沟通详情:" prop="secondCommuDetail">
                <el-select v-model="traceFormData.firstCommuDetail" placeholder="请选择是否接通" @change="onFirstCommuChange">
                  <el-option v-for="(item, index) in communicationTypes" :label="item.name" :key="index" :value="item.name">
                  </el-option>
                </el-select>
                <el-select v-model="traceFormData.secondCommuDetail" placeholder="请选择接听详情" @change="onSecondCommuChange" class="second-commu">
                  <el-option v-for="(item, index) in commu2List" :label="item.name" :key="index" :value="item.name">
                  </el-option>
                </el-select>
                <el-checkbox-group v-model="thirdCommuChecks" class="third-commu">
                  <el-checkbox v-for="(item, index) in commu3List" :label="item.name" :key="index"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="submit-div">
          <el-button type="primary" @click="traceClickOnSubmit">提交</el-button>
          <el-button type="primary" @click="traceClickOnCancel">关闭</el-button>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  import '../assets/css/my-client-list.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import { ClientTypes, CommunicationTypes, TraceWays, OfferSituations } from '../common/constant'
  import { find, forEach } from 'lodash'

  export default {
    name: "MyClientList",
    data() {
      return {
        clientTypes: ClientTypes,
        communicationTypes: CommunicationTypes,
        traceWays: TraceWays,
        offerSituations: OfferSituations,
        pageModes: ['list', 'add', 'update', 'trace'],
        pageMode: 'list',
        commu2List: [],
        commu3List: [],
        listMode: false,
        tableData: [],
        totalPage: 1,
        keyword: '',
        thirdCommuChecks: [],
        selectUserId: '',
        traceList: [],
        traceFormData: {
          clientType: 1,
          comment: "",
          firstCommuDetail: "",
          highSeas: false,
          nextRemind: "",
          offerSituation: OfferSituations[0],
          ownerId: localStorage.getItem('loginUserId'),
          secondCommuDetail: "",
          thirdCommuDetail: '',
          userId: '',
          way: TraceWays[0]
        },
        traceFormRule: {
          clientType: [{
            required: true,
            message: '请选择客戶类型',
            trigger: 'blur'
          }],
          offerSituation: [{
            required: true,
            message: '请选择报价情况',
            trigger: 'blur'
          }],
          way: [{
            required: true,
            message: '请选择跟踪方式',
            trigger: 'blur'
          }],
          secondCommuDetail: [{
            required: true,
            message: '请完善沟通详情',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted () {
      this.getDataList(1)
    },
    methods: {
      // 跟踪取消
      traceClickOnCancel() {
        this.pageMode = 'list'
        this.resetTraceForm()
      },
      // 跟踪提交
      traceClickOnSubmit() {
        const result = find(this.commu2List, {'name': this.traceFormData.secondCommuDetail})
        this.traceFormData.highSeas = result ? (result.isToHighSeas ? true : false) : false
        this.traceFormData.thirdCommuDetail = this.thirdCommuChecks.join(',')
        this.traceFormData.userId = this.selectUserId
        // console.log(this.traceFormData)
        this.$refs.traceForm.validate().then(() => {
          axios.post(API.TraceAdd, this.traceFormData).then(res => {
            if (res.status !== 0) {
              this.$message.error(res.msg)
            } else {
              this.$message.success('新增成功')
              // 刷新跟踪列表
              this.getTraceList()
              // 新增成功，重置表单
              this.resetTraceForm()
            }
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
      },
      // 充值跟踪列表
      resetTraceForm() {
        this.$refs.traceForm.resetFields()
        this.thirdCommuChecks = []
        this.selectUserId = ''
      },
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20,
          ownerId: localStorage.getItem('loginUserId')
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
      // 编辑
      onEditClick(row) {
        this.selectUserId = row.id
        this.pageMode = 'edit'
      },
      // 跟踪
      onTraceClick(row) {
        this.selectUserId = row.id
        this.pageMode = 'trace'
        this.getTraceList()
      },
      // 获取跟踪列表信息
      getTraceList() {
        const params = {
          userId: this.selectUserId,
          ownerId: localStorage.getItem('loginUserId')
        }
        axios.get(API.TracePageList, {params: params})
          .then(res => {
            if (res.status != 0) {
              this.$message.error('获取跟踪列表失败')
            } else {
              this.traceList = res.data.dataList
            }
          })
          .catch(() => {
            this.$message.error('获取跟踪列表失败')
          })
      },
      // 沟通详情一级菜单变化
      onFirstCommuChange() {
        this.commu2List = find(CommunicationTypes, {name: this.traceFormData.firstCommuDetail}).sub || []
        this.traceFormData.secondCommuDetail = ''
        this.traceFormData.thirdCommuDetail = ''
        this.thirdCommuChecks = []
        this.commu3List = []
      },
      // 沟通详情二级菜单变化
      onSecondCommuChange() {
        forEach(CommunicationTypes, (item) => {
          if(item.name === this.traceFormData.firstCommuDetail) {
            this.commu3List = find(item.sub, {name: this.traceFormData.secondCommuDetail}).sub || []
            // 提前结束循环
            return false
          }
        })
        this.traceFormData.thirdCommuDetail = ''
        this.thirdCommuChecks = []
      }
    }
  }
</script>
