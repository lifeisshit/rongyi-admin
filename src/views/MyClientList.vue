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
              <el-button @click="grab(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="grab(scope.row)" type="text" size="small">跟踪</el-button>
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
          <el-radio-group v-model="traceFormData.way">
            <el-radio label="电话"></el-radio>
            <el-radio label="总经理批注"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报价情况:">
          <el-radio-group v-model="traceFormData.offerSituation">
            <el-radio label="未报价"></el-radio>
            <el-radio label="已报价"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注:" prop="comment">
          <el-input type="textarea" :rows="5" v-model="traceFormData.comment" placeHolder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="下次跟踪提醒:" prop="nextRemind">
          <el-date-picker v-model="traceFormData.nextRemind" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入下次跟踪提醒时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="沟通详情:" prop="firstCommuDetail" class="inline-item">
          <el-select v-model="traceFormData.firstCommuDetail" placeholder="请选择是否接通" @change="onFirstCommuChange">
            <el-option v-for="(item, index) in communicationTypes" :label="item.name" :key="index" :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="traceFormData.secondCommuDetail" placeholder="请选择接听详情" @change="onSecondCommuChange">
            <el-option v-for="(item, index) in commu2List" :label="item.name" :key="index" :value="item.name">
            </el-option>
          </el-select>
          <el-checkbox-group v-model="traceFormData.thirdCommuDetail">
            <el-checkbox v-for="(item, index) in commu3List" :label="item.name" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import '../assets/css/high-seas-client.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import { ClientTypes, CommunicationTypes } from '../common/constant'

  export default {
    name: "MyClientList",
    data() {
      return {
        clientTypes: ClientTypes,
        communicationTypes: CommunicationTypes,
        commu2List: [],
        commu3List: [],
        listMode: false,
        tableData: [],
        totalPage: 1,
        keyword: '',
        traceFormData: {
          clientType: 0,
          comment: "",
          firstCommuDetail: "",
          highSeas: false,
          nextRemind: "",
          offerSituation: "",
          ownerId: localStorage.getItem('loginUserId'),
          secondCommuDetail: "",
          thirdCommuDetail: "",
          userId: 0,
          way: ""
        },
        traceFormRule: {}
      }
    },
    methods: {
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
      // 沟通详情一级菜单变化
      onFirstCommuChange() {
        this.commu2List = this.getSecondCommus(this.traceFormData.firstCommuDetail)
        this.traceFormData.secondCommuDetail = ''
        this.traceFormData.thirdCommuDetail = ''
        this.commu3List = []
      },
      // 沟通详情二级菜单变化
      onSecondCommuChange() {
        this.commu3List = this.getThirdCommus(this.traceFormData.firstCommuDetail, this.traceFormData.secondCommuDetail)
        this.traceFormData.thirdCommuDetail = ''
      },
      // 获取第二级沟通详情
      getSecondCommus(firstName) {
        for(let i = 0, len = CommunicationTypes.length; i < len; i++) {
          if(firstName === CommunicationTypes[i].name) {
            return CommunicationTypes[i].sub || []
          }
        }
        return []
      },
      // 获取第三级沟通详情
      getThirdCommus(firstName, secondName) {
        // 遍历第一级
        for(let i = 0, len = CommunicationTypes.length; i < len; i++) {
          if(firstName === CommunicationTypes[i].name) {
            let subs = CommunicationTypes[i].sub
            if(!subs || !subs.length) {
              return []
            }
            // 遍历第二级
            for(let j = 0, len2 = subs.length; j < len2; j++) {
              if(secondName === subs[j].name) {
                return subs[j].sub || []
              }
            }
          }
        }
        return []
      }
    },
    mounted () {
      this.getDataList(1)
    }
  }
</script>