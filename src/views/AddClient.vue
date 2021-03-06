<template>
  <div class="add-client">
    <el-row>
      <el-col :span="18">
        <el-form ref="addClientForm" :model="formData" :rules="formRule" label-width="120px">
          <el-form-item label="客戶类型:" prop="type" class="inline-item">
            <el-select v-model="formData.type" placeholder="请选择客戶类型">
              <el-option v-for="(item, index) in clientTypes" :label="item.label" :key="index" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称:" prop="compName" class="inline-item">
            <el-input v-model="formData.compName" placeHolder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="主营行业:" prop="industry" class="inline-item">
            <el-select v-model="formData.industry" placeholder="请选择主营行业">
              <el-option v-for="item in industries" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册资金:" prop="registerAmount" class="inline-item">
            <el-select v-model="formData.registerAmount" placeholder="请选择注册资金">
              <el-option v-for="item in amounts" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业额:" prop="turnover" class="inline-item">
            <el-select v-model="formData.turnover" placeholder="请选择营业额">
              <el-option v-for="item in amounts" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源:" prop="source" class="inline-item">
            <el-select v-model="formData.source" placeholder="请选择来源">
              <el-option v-for="item in clientSources" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区:" prop="region">
            <FormCitySelect
                ref="citySelect"
                :province="formData.province"
                :city="formData.city"
                :region="formData.region"
                @change="onRegionChange"
            ></FormCitySelect>
          </el-form-item>
          <el-form-item label="企业介绍:" prop="compDes">
            <el-input type="textarea" :rows="5" v-model="formData.compDes" placeHolder="请输入企业介绍"></el-input>
          </el-form-item>
          <el-form-item label="小计:" prop="comment">
            <el-input type="textarea" :rows="5" v-model="formData.comment" placeHolder="请输入小计"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="name" class="inline-item">
            <el-input v-model="formData.name" placeHolder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="gender" class="inline-item">
            <el-select v-model="formData.gender" placeholder="请选择性别">
              <el-option v-for="item in genders" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone" class="inline-item">
            <el-input v-model="formData.phone" placeHolder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="职务:" prop="duty" class="inline-item">
            <el-select v-model="formData.duty" placeholder="请选择职务">
              <el-option v-for="item in clientDuties" :label="item" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址:" prop="address">
            <el-input v-model="formData.address" placeHolder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="submit-div">
      <el-button type="primary" @click="clickOnSubmit">提交</el-button>
      <el-button type="primary" @click="onResetClick">{{ this.initRecord ? '关闭' : '重置' }}</el-button>
    </el-row>
  </div>
</template>

<script>
  import '../assets/css/add-client.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import FormCitySelect from '../components/FormCitySelect'
  import { ClientTypes, Industries, Amounts, ClientSources, ClientDuties, Genders } from '../common/constant'
  import { mapActions } from 'vuex'

  export default {
    name: 'AddClient',
    components: {
      FormCitySelect
    },
    props: ['initRecord'],
    data() {
      console.log(this.initRecord)
      const initRecord = this.initRecord
      const userData = initRecord && initRecord.userData

      return {
        clientTypes: ClientTypes,
        industries: Industries,
        amounts: Amounts,
        clientSources: ClientSources,
        clientDuties: ClientDuties,
        genders: Genders,
        formData: {
          type: initRecord && initRecord.type || '',
          phone: initRecord && initRecord.phone || '',
          industry: userData && userData.industry || '',
          registerAmount: userData && userData.registerAmount || '',
          compDes: userData && userData.compDes || '',
          compName: userData && userData.compName || '',
          turnover: userData && userData.turnover || '',
          comment: userData && userData.comment || '',
          gender: initRecord && initRecord.gender || '',
          duty: userData && userData.duty || '',
          name: initRecord && initRecord.name || '',
          address: userData && userData.address || '',
          province: userData && userData.province || '',
          city: userData && userData.city || '',
          region: userData && userData.region || '',
          source: userData && userData.source || '',
        },
        formRule: {
          compName: [{
            required: false,
            message: '请输入单位名称',
            trigger: 'blur'
          }],
          name: [{
            required: false,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          gender: [{
            required: false,
            message: '请选择性别',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            message: '请输入正确的手机号',
            trigger: 'blur',
            pattern: /^\d{11}$/
          }],
          industry: [{
            required: false,
            message: '请选择主营行业',
            trigger: 'blur'
          }],
          type: [{
            required: false,
            message: '请选择客户类型',
            trigger: 'blur'
          }],
          source: [{
            required: false,
            message: '请选择客户来源',
            trigger: 'blur'
          }],
          region: [{
            required: false,
            trigger: 'blur',
            message: '请选择完整的省市区'
          }]
        }
      }
    },
    methods: {
      ...mapActions(['getStatics']),
      // 保存
      clickOnSubmit() {
        var url = this.initRecord ? API.ClientUpdate : API.ClientAdd;
        var msg = this.initRecord ? '修改' : '新增';
        // 如果是修改，则需要填写userId
        if(this.initRecord) {
          this.formData.userId = this.initRecord.id;
        }
        // console.log(this.formData)
        this.$refs.addClientForm.validate().then(() => {
          axios.post(url, this.formData).then(res => {
            if (res.status !== 0) {
              this.$message.error(res.msg)
            } else {
              this.$message.success(msg + '成功')
              this.$emit('onSubmit')
              // 如果客户类型有变化，则刷新首页饼状图
              if(this.initRecord) {
                // 修改
                if(this.formData.type !== this.initRecord.type) {
                  this.getStatics()
                }
              } else {
                // 新增，直接刷新
                this.getStatics()
              }
            }
          }).catch(err => {
            console.log(err)
            this.$message.error(msg + '失败')
          })
        }).catch(err => {
          console.log(err)
          // this.$message.error(msg + '失败')
        })
      },
      // 重置
      onResetClick() {
        this.formData.province = ''
        this.formData.city = ''
        this.formData.region = ''
        this.$refs.addClientForm.resetFields()
        // 清空省市区选择框
        this.$refs.citySelect.resetValue()
        this.$emit('onCancel')
      },
      // 地区变化事件
      onRegionChange(selectAddr) {
        this.formData.province = selectAddr.province
        this.formData.city = selectAddr.city
        this.formData.region = selectAddr.region
      }
    }
  }
</script>
