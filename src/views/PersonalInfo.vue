<template>
<div class="personal-info">
  <el-row>
    <el-col :span="12">
      <el-form ref="userForm" :model="formData" :rules="formRule" label-width="100px">
        <el-form-item label="账号:" prop="login">
          <el-input v-model="formData.login" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="formData.name" placeHolder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="formData.phone" placeHolder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="role.desc">
          <el-input v-model="formData.roleDesc" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row class="submit-div">
    <el-button type="primary" @click="clickOnSubmit">保存</el-button>
  </el-row>
</div>
</template>

<script>
import '../assets/css/sys-user-list.less'
import axios from 'axios'
import API from '../api/api.js'

export default {
  name: 'SysUserList',
  data() {
    return {
      formData: {
        role: {}
      },
      formRule: {
        name: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    clickOnCancel() {
      this.listMode = true
    },
    clickOnSubmit() {
      this.$refs.userForm.validate().then(() => {
        let api = API.SysUserUpdate
        axios.post(api, this.formData).then(res => {
          if (res.status !== 0) {
            this.$message.error('保存失败')
          } else {
            this.$message.success('保存成功')
            this.getPersonalInfo(1)
          }
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    },
    getPersonalInfo() {
      let sysUserId = this.$store.getters.loginUserId
      if (!sysUserId) {
        sysUserId = localStorage.getItem('loginUserId')
        if (!sysUserId) {
          this.$router.push({
            name: 'login'
          })
        } else {
          axios.get(API.SysUserGetById, {
            params: {
              id: sysUserId
            }
          }).then(res => {
            if (res.status !== 0) {
              this.$message.error(res.msg)
            } else {
              this.formData = res.data
              console.log(res.data)
            }
          }).catch(() => {
            this.$message.error('获取个人信息失败')
          })
        }
      }
    }
  },
  mounted() {
    this.getPersonalInfo()
  }
}
</script>
