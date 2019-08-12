<template>
    <div class="sys-role-list">
        <div v-if="listMode">
            <el-row>
                <el-col :span="2">
                    <el-tooltip placement="right" content="刷新">
                        <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"/>
                    </el-tooltip>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNewRole">新增角色</el-button>
                </el-col>
            </el-row>
            <br>
            <el-row class="table-div">
                <el-table :data="tableData" border stype="width: 100%">
                    <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="name" label="角色名"></el-table-column>
                    <el-table-column prop="desc" label="角色描述"></el-table-column>
                    <el-table-column prop="gmtCreate" label="创建时间" width="160px"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <!--<el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>-->
                            <el-button @click="updateRow(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged"></el-pagination>
            </el-row>
        </div>

        <div v-if="!listMode">
            <el-row>
                <el-form ref="roleForm" :model="formData" :rules="formRule" label-width="100px">
                    <el-form-item label="角色名:" prop="name">
                        <el-input v-model="formData.name" placeHolder="请输入角色名"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述:" prop="desc">
                        <el-input v-model="formData.desc" placeHolder="请输入角色描述"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="submit-div">
                <el-button type="primary" @click="clickOnSubmit">提交</el-button>
                <el-button type="primary" @click="clickOnCancel">取消</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
  import '../assets/css/sys-user-list.less'
  import axios from 'axios'
  import API from '../api/api.js'

  export default {
    name: "SysRoleList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        roles: [],
        formData: {
          id: 0,
          name: '',
          desc: ''
        },
        formRule: {
          name: [{
            required: true,
            message: '角色名称',
            trigger: 'blur'
          }],
          desc: [{
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20
        }
        axios.get(API.SysRolePageList, params)
          .then(res => {
            if (res.status != 0) {
              this.$message.error('获取角色列表失败')
            } else {
              this.tableData = res.data.dataList
              this.totalPage = res.data.totalPage
            }
          })
          .catch(() => {
            this.$message.error('获取角色列表失败')
          })
      },
      clickOnRefresh() {
        this.getDataList(1)
      },
      updateRow(row) {
        this.formData.id = row.id
        this.formData.name = row.name
        this.formData.desc = row.desc
        this.isAdd = false
        this.listMode = false
      },
      addNewRole() {
        // 重置所有的formData
        this.formData = {}
        this.isAdd = true
        this.listMode = false
      },
      clickOnCancel() {
        this.listMode = true
      },
      clickOnSubmit() {
        this.$refs.roleForm.validate().then(() => {
          let api = this.isAdd ? API.SysRoleInsert : API.SysRoleUpdate
          var qs = require('qs')
          axios.post(api, qs.stringify({
            'id': this.formData.id,
            'name':this.formData.name,
            'desc': this.formData.desc
          })).then(res => {
            if (res.status !== 0) {
              this.$message.error('保存失败')
            } else {
              this.$message.success('保存成功')
              this.getDataList(1)
              this.listMode = true
            }
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
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
