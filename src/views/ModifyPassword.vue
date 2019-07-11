<template>
<div class="modify-password">
  <el-row>
    <el-col :span="6">
      <el-form ref="pwdForm" :model="formData" :rules="formRule" label-width="100px">
        <el-form-item label="旧密码:" prop="name">
          <el-input v-model="formData.oldPwd" placeHolder="请输入旧密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="phone">
          <el-input v-model="formData.newPwd" placeHolder="请输入新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="phone">
          <el-input v-model="formData.confirmPwd" placeHolder="请再次输入新密码" type="password"></el-input>
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
import '../assets/css/modify-password.less'
import axios from 'axios'
import API from '../api/api.js'

export default {
  name: 'ModifyPassword',
  data() {
    return {
      formData: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      formRule: {
        oldPwd: [{
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        }],
        newPwd: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        confirmPwd: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    clickOnSubmit() {
      this.$refs.pwdForm.validate().then(() => {
        if (this.formData.newPwd != this.formData.confirmPwd) {
          this.$message.error('两次输入的新密码不相同，请确认输入')
          return
        }

        let api = API.SysUserModifyPwd
        let qs = require('qs')
        axios.post(api, qs.stringify(this.formData)).then(res => {
          if (res.status !== 0) {
            this.$message.error(res.msg)
          } else {
            this.$message.success('修改成功')
            this.formData = {}
          }
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    },
  },
  mounted() {

  }
}
</script>
