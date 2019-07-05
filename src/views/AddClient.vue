<template>
  <div class="add-client">
    <el-row>
      <el-col :span="18">
        <el-form ref="addClientForm" :model="formData" :rules="formRule" label-width="120px">
          <el-form-item label="客戶类型:" prop="title">
            <el-select v-model="formData.type" placeholder="请选择客戶类型">
              <el-option v-for="item in clientTypes" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称:" prop="compName">
            <el-input v-model="formData.compName" placeHolder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="所在地区：">
            <FormCitySelect></FormCitySelect>
          </el-form-item>
          <el-form-item label="主营行业:" prop="industry">
            <el-select v-model="formData.industry" placeholder="请选择主营行业">
              <el-option v-for="item in industries" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册资金:" prop="registerAmount">
            <el-select v-model="formData.registerAmount" placeholder="请选择注册资金">
              <el-option v-for="item in amounts" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业额:" prop="turnover">
            <el-select v-model="formData.turnover" placeholder="请选择营业额">
              <el-option v-for="item in amounts" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源:" prop="source">
            <el-select v-model="formData.source" placeholder="请选择来源">
              <el-option v-for="item in clientSources" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业介绍:" prop="compDes">
            <el-input type="textarea" :rows="8" v-model="formData.compDes" placeHolder="请输入企业介绍"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="submit-div">
      <el-button type="primary" @click="clickOnSubmit">提交</el-button>
      <el-button type="primary" @click="clickOnCancel">取消</el-button>
    </el-row>
  </div>
</template>

<script>
  import '../assets/css/add-client.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import FormCitySelect from '../components/FormCitySelect'
  import { ClientTypes, Industries, Amounts, ClientSources } from '../common/constant'

  export default {
    name: 'Welcome',
    components: {
      FormCitySelect
    },
    data() {
      return {
        clientTypes: ClientTypes,
        industries: Industries,
        amounts: Amounts,
        clientSources: ClientSources,
        formData: {
          id: 0,
          industry: '',
          registerAmount: '',
          compDes: '',
          compName: '',
          turnover: '',
          viewCount: 0,
          enterTime: '',
          successTime: ''
        },
        formRule: {
          compName: [{
            required: true,
            message: '请输入单位名称',
            trigger: 'blur'
          }],
          registerAmount: [{
            required: true,
            message: '请选择注册资金',
            trigger: 'blur'
          }],
          compDes: [{
            required: true,
            message: '请输入企业介绍',
            trigger: 'blur'
          }],
          successAmount: [{
            required: true,
            message: '请输入成功融资金额',
            trigger: 'blur'
          }],
          industry: [{
            required: true,
            message: '请输入主营行业',
            trigger: 'blur'
          }],
          viewCount: [{
            required: true,
            message: '请输入查看次数',
            trigger: 'blur'
          }],
          enterTime: [{
            required: true,
            message: '请选择项目入驻时间',
            trigger: 'blur'
          }],
          successTime: [{
            required: true,
            message: '请选择成功融资时间',
            trigger: 'blur'
          }],
        },
      }
    },
    methods: {
      // 保存
      clickOnSubmit() {
        this.$refs.successCaseForm.validate().then(() => {
          // 获取图片
          if (!this.successCaseImg) {
            this.$message({ type: "error", message: "请先上传封面图片" });
            return false;
          }
          this.formData.img = this.successCaseImg

          let api = this.isAdd ? API.SuccessCaseAdd : API.SuccessCaseUpdate
          axios.post(api, this.formData).then(res => {
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
      // 取消
      clickOnCancel() {}
    }
  }
</script>
