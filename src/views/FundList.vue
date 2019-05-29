<template>
  <div class="fund-list">
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
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="clickOnAddNew">新增资金方</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="资金方图片" width="150px">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="100px" height="100px"/>
            </template>
          </el-table-column>
          <el-table-column prop="personName" label="人名"></el-table-column>
          <el-table-column prop="investAmount" label="投资资金"></el-table-column>
          <el-table-column prop="investWay" label="投资方式"></el-table-column>
          <el-table-column prop="type" label="资金类型"></el-table-column>
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
          <el-form ref="fundForm" :model="formData" :rules="formRule" label-width="240px">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeHolder="请输入标题"></el-input>
              <!--<el-input v-model="aaa" placeHolder="请输入标题"></el-input>-->
            </el-form-item>
            <el-form-item label="资金方图片">
              <el-upload accept=".jpg, .png"
                         ref="fund_img"
                         class="avatar-uploader"
                         :action="ossHost"
                         :data="ossFormData"
                         :show-file-list="false"
                         :on-change="changeCoverImgUpload"
                         :on-remove="removeCoverImgUpload"
                         :on-success="successCoverImgUpload"
                         :before-upload="beforeCoverImgUpload">
                <img v-if="fund_img" :src="fund_img" class="avatar" width="300px" height="300px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="人名:" prop="personName">
              <el-input v-model="formData.personName" placeHolder="请输入人名"></el-input>
            </el-form-item>
            <el-form-item label="投资地区（最多只能选择五个）:" prop="inventRegion">
              <el-input v-model="formData.inventRegion" placeHolder="请输入投资地区"></el-input>
            </el-form-item>
            <el-form-item label="投资行业（最多只能选择五个）:" prop="investIndustry">
              <el-input v-model="formData.investIndustry" placeHolder="投资行业"></el-input>
            </el-form-item>
            <el-form-item label="投资资金:" prop="investAmount">
              <el-input v-model="formData.investAmount" placeHolder="请输入投资资金"></el-input>
            </el-form-item>
            <el-form-item label="投资类型:（股权投资专用，最多只能选择五个）" prop="investType">
              <!--<el-checkbox-group v-model="selectInvestTypes" :max="5" :min="0">-->
                <!--<el-checkbox v-for="item in investTypes" :label="item" :key="item">{{item}}</el-checkbox>-->
              <!--</el-checkbox-group>-->
              <el-input v-model="formData.investType" placeHolder="请输入投资类型"></el-input>
            </el-form-item>
            <el-form-item label="投资阶段:（股权投资专用）" prop="investPeriod">
              <el-input v-model="formData.investPeriod" placeHolder="请输入投资阶段"></el-input>
            </el-form-item>
            <el-form-item label="投资方式:" prop="investWay">
              <el-input v-model="formData.investWay" placeHolder="请输入投资方式"></el-input>
            </el-form-item>
            <el-form-item label="资金类型:" prop="type">
              <el-input v-model="formData.type" placeHolder="请输入资金类型"></el-input>
            </el-form-item>
            <el-form-item label="风控要求:（债权投资专用）" prop="riskRequire">
              <el-input v-model="formData.riskRequire" placeHolder="请输入风控要求"></el-input>
            </el-form-item>
            <el-form-item label="最低回报要求:（债权投资专用）" prop="minReturnRequire">
              <el-input v-model="formData.minReturnRequire" placeHolder="请输入最低回报要求"></el-input>
            </el-form-item>
            <el-form-item label="投递次数:" prop="deliverCount">
              <el-input v-model="formData.deliverCount" placeHolder="请输入投递次数" type="number"></el-input>
            </el-form-item>
            <el-form-item label="留言次数:" prop="msgCount">
              <el-input v-model="formData.msgCount" placeHolder="请输入留言次数" type="number"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐:" prop="recommend">
              <el-select v-model="formData.recommend" placeholder="请选择是否推荐">
                <el-option v-for="item in recommends" :label="item.label" :key="item.value" :value="item.value">
                </el-option>
              </el-select>
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
  import '../assets/css/fund.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import { InvestTypes, Industries, Regions, Recommend }  from '../common/constant.js'

  export default {
    name: "FundList",
    data() {
      return {
        aaa:'',
        recommends: Recommend,
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        keyword: '',
        formData: {
          id: 0,
          title: '',
          img: '',
          personName: '',
          inventRegion: '',
          investIndustry: '',
          investAmount: '',
          investType: '',
          investPeriod: '',
          investWay: '',
          type: '',
          riskRequire: '',
          minReturnRequire: '',
          deliverCount: '',
          msgCount: '',
          recommend: 0,
        },
        formRule: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          img: [{
            required: false,
            message: '请上传项目图片',
            trigger: 'blur'
          }],
          personName: [{
            required: true,
            message: '请输入人名',
            trigger: 'blur'
          }],
          inventRegion: [{
            required: true,
            message: '请输入投资地区',
            trigger: 'blur'
          }],
          investIndustry: [{
            required: true,
            message: '请输入投资行业',
            trigger: 'blur'
          }],
          investAmount: [{
            required: true,
            message: '请输入投资资金',
            trigger: 'blur'
          }],
          investWay: [{
            required: true,
            message: '请输入投资方式',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请输入资金类型',
            trigger: 'blur'
          }],
          deliverCount: [{
            required: true,
            message: '请输入投递次数',
            trigger: 'blur'
          }],
          msgCount: [{
            required: true,
            message: '请输入留言次数',
            trigger: 'blur'
          }],
          investType: [{
            required: false,
            message: '请输入投资类型：股权投资专用',
            trigger: 'blur'
          }],
          investPeriod: [{
            required: false,
            message: '请输入投资阶段：股权投资专用',
            trigger: 'blur'
          }],
          riskRequire: [{
            required: false,
            message: '请输入风控要求：债权投资专用',
            trigger: 'blur'
          }],
          minReturnRequire: [{
            required: false,
            message: '请输入最低回报要求：债权投资专用',
            trigger: 'blur'
          }],
          recommend: [{
            required: true,
            message: '请选择是否设置为推荐项目',
            trigger: 'blur'
          }],
        },
        fund_img: '',
        //oss data
        accessid: '',
        policy: '',
        signature: '',
        ossDir: '',
        ossHost: '',
        ossFormData: {},
        newImgName: ''
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
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(API.FundDelete, {
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
        console.log(row)
        this.formData.id = row.id
        this.formData.title = row.title
        this.formData.img = row.img
        this.formData.personName = row.personName
        this.formData.inventRegion = row.inventRegion
        this.formData.investIndustry = row.investIndustry
        this.formData.investAmount = row.investAmount
        this.formData.investType = row.investType
        this.formData.investPeriod = row.investPeriod
        this.formData.investWay = row.investWay
        this.formData.type = row.type
        this.formData.riskRequire = row.riskRequire
        this.formData.minReturnRequire = row.minReturnRequire
        this.formData.deliverCount = row.deliverCount
        this.formData.msgCount = row.msgCount
        this.formData.recommend = row.recommend
        this.fund_img = this.getPictureFullPath(this.formData.img)

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
        axios.post(API.FundPageList, params).then(res => {
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
        this.$refs.fundForm.validate().then(() => {
          this.formData.img = this.fund_img
          let api = this.isAdd ? API.FundAdd : API.FundUpdate
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
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
      clickOnCancel() {
        this.listMode = true
      },
      getAliyunOssSign() {
        //获取oss认证
        axios.get(API.OSSUrl).then((result) => {
          if (!result || !result.data) {
            this.$message.error('图片服务器连接异常！')
            return
          }
          this.accessid = result.data.accessid
          this.policy = result.data.policy
          this.signature = result.data.signature
          this.ossDir = result.data.dir
          this.ossHost = result.data.host
        });
      },
      changeCoverImgUpload(file, fileList) {},
      removeCoverImgUpload(res, file) {},
      successCoverImgUpload(response, file, fileList) {},
      beforeCoverImgUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
          return false
        }

        if (this.isAdd) {
          this.newImgName = Date.now() + Math.floor(Math.random() * 10000) + '_' + file.name;
        } else {
          this.newImgName = 'fund_' + this.formData.id + '.' + this.getFileSuffix(file.name);
        }
        this.fund_img = this.getPictureFullPath(this.newImgName)

        this.ossFormData.OSSAccessKeyId = this.accessid
        this.ossFormData.policy = this.policy
        this.ossFormData.Signature = this.signature
        this.ossFormData.key = this.ossDir + 'fund/' + this.newImgName
      },
      // 获取图片完整路径
      getPictureFullPath(fileName) {
        if (!fileName) {
          return fileName
        }
        if (fileName.toLowerCase().startsWith('http://') || fileName.toLowerCase().startsWith('https://')) {
          return fileName
        }
        return this.ossHost + '/' + this.ossDir + 'fund/' + fileName
      },
      // 获取图片名
      getFileNameFromFullPath(fullPath) {
        if (!fullPath) {
          return fullPath
        }
        if (!fullPath.toLowerCase().startsWith('http://') && !fullPath.toLowerCase().startsWith('https://')) {
          return fullPath
        }
        return fullPath.substring(fullPath.lastIndexOf('/') + 1)
      },
      // 获取图片后缀
      getFileSuffix(fileName) {
        return fileName.substring(fileName.lastIndexOf('.') + 1)
      }
    },
    mounted: function () {
      this.getDataList(1)
      this.getAliyunOssSign()
    }
  }
</script>