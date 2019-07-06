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
          <el-table-column label="项目图片" width="150px">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="100px" height="100px"/>
            </template>
          </el-table-column>
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
        <el-col :span="18">
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
            <el-form-item label="项目图片">
              <el-upload accept=".jpg, .png"
                         ref="projectImg"
                         class="avatar-uploader"
                         :action="ossHost"
                         :data="ossFormData"
                         :show-file-list="false"
                         :on-change="changeImgUpload"
                         :on-remove="removeImgUpload"
                         :on-success="successImgUpload"
                         :before-upload="beforeImgUpload">
                <img v-if="projectImg" :src="projectImg" class="avatar" width="300px" height="300px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload accept=".jpg, .png"
                         ref="attachmentImg"
                         class="avatar-uploader"
                         :action="ossHost"
                         :data="ossFormData"
                         :show-file-list="false"
                         :on-change="changeAttachmentUpload"
                         :on-remove="removeAttachmentUpload"
                         :on-success="successAttachmentUpload"
                         :before-upload="beforeAttachmentUpload">
                <img v-if="attachmentImg" :src="attachmentImg" class="avatar" width="300px" height="300px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="提供材料:" prop="material">
              <el-checkbox-group v-model="formData.material" placeholder="请选择提供材料">
              <el-checkbox v-for="item in provideMaterials" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
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
              <el-select v-model="formData.industry" placeholder="请选择所在行业">
                <el-option v-for="item in industries" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="融资金额:（项目融资专用）" prop="financeAmount">
              <el-select v-model="formData.financeAmount" placeholder="请选择融资金额">
                <el-option v-for="item in amounts" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="融资方式:（项目融资专用）" prop="financeWay">
              <el-select v-model="formData.financeWay" placeholder="请选择融资方式">
                <el-option v-for="item in financeWays" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="融资用途:（项目融资专用）" prop="financeUse">
              <el-input v-model="formData.financeUse" placeHolder="请输入融资用途"></el-input>
            </el-form-item>
            <el-form-item label="项目阶段:（项目融资专用）" prop="projectPeriod">
              <el-select v-model="formData.projectPeriod" placeholder="请选择项目阶段">
                <el-option v-for="item in projectPeriods" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="转让价格:（资产交易专用）" prop="transferPrice">
              <el-input v-model="formData.transferPrice" placeHolder="请输入转让价格"></el-input>
            </el-form-item>
            <el-form-item label="资产估价:（资产交易专用）" prop="assetValue">
              <el-input v-model="formData.assetValue" placeHolder="请输入资产估价"></el-input>
            </el-form-item>
            <el-form-item label="交易类别:（资产交易专用）" prop="dealType">
              <el-checkbox-group v-model="formData.dealType" placeholder="请选择交易类别">
                <el-checkbox v-for="item in dealTypes" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="交易方式:（资产交易专用）" prop="dealWay">
              <el-select v-model="formData.dealWay" placeholder="请选择交易方式">
                <el-option v-for="item in dealWays" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资估算:（政府招商专用）" prop="investEstimate">
              <el-input v-model="formData.investEstimate" placeHolder="请输入投资估算"></el-input>
            </el-form-item>
            <el-form-item label="招商方式:（政府招商专用）" prop="attractWay">
              <el-select v-model="formData.attractWay" placeholder="请选择招商方式">
                <el-option v-for="item in attractWays" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型:（投资理财专用）" prop="productType">
              <el-select v-model="formData.productType" placeholder="请选择产品类型">
                <el-option v-for="item in productTypes" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资门槛:（投资理财专用）" prop="investThreshold">
              <el-input v-model="formData.investThreshold" placeHolder="请输入投资门槛"></el-input>
            </el-form-item>
            <el-form-item label="投资期限:（投资理财专用）" prop="investTime">
              <el-input v-model="formData.investTime" placeHolder="请输入投资期限"></el-input>
            </el-form-item>
            <el-form-item label="投资金额:（投资理财专用）" prop="investAmount">
              <el-select v-model="formData.investAmount" placeholder="请选择投资金额">
                <el-option v-for="item in amounts" :lable="item" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐:" prop="recommend">
              <el-select v-model="formData.recommend" placeholder="请选择是否推荐">
                <el-option v-for="item in recommends" :label="item.label" :key="item.value" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="去年营业额:" prop="lastYearTurnover">
              <el-input v-model="formData.lastYearTurnover" placeHolder="请输入去年营业额"></el-input>
            </el-form-item>
            <el-form-item label="项目描述:" prop="projectDesc">
              <el-input type="textarea" :rows="8" v-model="formData.projectDesc" placeHolder="请输入项目描述"></el-input>
            </el-form-item>
            <el-form-item label="其他备注:" prop="otherComment">
              <el-input type="textarea" :rows="8" v-model="formData.otherComment" placeHolder="请输入其他备注"></el-input>
            </el-form-item>
            <el-form-item label="标签:" prop="tag">
              <el-input v-model="formData.tag" placeHolder="请输入标签"></el-input>
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
  import * as constant from '../common/constant.js'

  export default {
    name: "ProjectList",
    data() {
      return {
        // some data
        regions: constant.Regions,
        projectTypes: constant.ProjectTypes,
        recommends: constant.Recommend,
        industries: constant.Industries,
        amounts: constant.Amounts,
        financeWays: constant.FinanceWays,
        projectPeriods: constant.ProjectPeriods,
        dealTypes: constant.DealTypes,
        dealWays: constant.DealWays,
        attractWays: constant.AttractWays,
        productTypes: constant.ProjectTypes,
        provideMaterials: constant.ProvideMaterials,
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        keyword: '',
        formData: {
          id: 0,
          type: '',
          title: '',
          img: '',
          attachment: '',
          material: [],
          personName: '',
          talkNum: 0,
          msgNum: 0,
          investTime: '',
          investThreshold: '',
          investEstimate: '',
          assetValue: '',
          transferPrice: '',
          investAmount: '',
          productType: '',
          attractWay: '',
          dealWay: '',
          dealType: [],
          projectPeriod: '',
          financeUse: '',
          financeAmount: '',
          financeWay: '',
          region: '',
          industry: '',
          recommend: 0,
          projectDesc: '',
          otherComment: '',
          tag: '',
          lastYearTurnover: '',
        },
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
          img: [{
            required: false,
            message: '请上传项目图片',
            trigger: 'blur'
          }],
          attachment: [{
            required: false,
            message: '请上传附件图片',
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
          recommend: [{
            required: true,
            message: '请选择是否设置为推荐项目',
            trigger: 'blur'
          }],
          projectDesc: [{
            required: true,
            message: '请输入项目描述',
            trigger: 'blur'
          }],
          otherComment: [{
            required: true,
            message: '请输入其他备注',
            trigger: 'blur'
          }],
          tag: [{
            required: true,
            message: '请选择标签',
            trigger: 'blur'
          }],
          lastYearTurnover: [{
            required: false,
            message: '请输入去年营业额',
            trigger: 'blur'
          }],
          material: [{
            required: false,
            message: '请选择提供材料',
            trigger: 'blur'
          }],
        },
        projectImg: '',
        attachmentImg: '',
        //oss data
        accessid: '',
        policy: '',
        signature: '',
        ossDir: '',
        ossHost: '',
        ossFormData: {},
        newImgName: '',
        newAttachmentName: '',
      }
    },
    methods: {
      clickOnSearch() {
        this.getDataList(1)
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
        this.formData.img = row.img
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
        this.formData.dealType = (row.dealType || '').trim().split(',')
        this.formData.projectPeriod = row.projectPeriod
        this.formData.financeUse = row.financeUse
        this.formData.financeAmount = row.financeAmount
        this.formData.financeWay = row.financeWay
        this.formData.region = row.region
        this.formData.industry = row.industry
        this.formData.recommend = row.recommend
        this.formData.projectDesc = row.projectDesc
        this.formData.otherComment = row.otherComment
        this.formData.tag = row.tag
        this.formData.lastYearTurnover = row.lastYearTurnover
        this.formData.material = (row.material || '').trim().split(',')

        this.projectImg = this.getPictureFullPath(this.formData.img)
        this.attachmentImg = this.getPictureFullPath(this.formData.attachment)

        this.isAdd = false
        this.listMode = false
      },
      clickOnAddNew() {
        // 重置所有的formData
        this.formData = {
          id: 0,
          type: '',
          title: '',
          img: '',
          attachment: '',
          personName: '',
          talkNum: 0,
          msgNum: 0,
          investTime: '',
          investThreshold: '',
          investEstimate: '',
          assetValue: '',
          transferPrice: '',
          investAmount: '',
          productType: '',
          attractWay: '',
          dealWay: '',
          dealType: [],
          projectPeriod: '',
          financeUse: '',
          financeAmount: '',
          financeWay: '',
          region: '',
          industry: '',
          recommend: 0,
          projectDesc: '',
          otherComment: '',
          tag: '',
          lastYearTurnover: '',
          material: [],
        }
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
            this.$message.error('获取项目列表失败')
          } else {
            this.tableData = res.data.dataList
            this.totalPage = res.data.totalPage
          }
        }).catch(() => this.$message.error('获取项目列表失败'))
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
      clickOnSubmit() {
        this.$refs.projectForm.validate().then(() => {
          this.formData.img = this.projectImg
          this.formData.attachment = this.attachmentImg
          this.formData.dealType = this.formData.dealType.join(',')
          this.formData.material = this.formData.material.join(',')

          let api = this.isAdd ? API.ProjectAdd : API.ProjectUpdate
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
      removeOriginFile(fileName) {
        axios.get(API.OSSUrlDelete, {
          params: {
            bucketName: 'rongy',
            dir: 'edit/project',
            fileName: this.getFileNameFromFullPath(fileName)
          }
        }).then(res => {
          if (res.status !== 0) {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$message.error('删除失败')
        })
      },
      changeImgUpload(file, fileList) {},
      removeImgUpload(res, file) {},
      successImgUpload(response, file, fileList) {
        this.$message.info('文件上传成功')
        this.removeOriginFile(this.projectImg)
        this.projectImg = this.getPictureFullPath(this.newImgName)
      },
      beforeImgUpload(file) {
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

        this.newImgName = 'img_' + Date.now() + '_' + Math.floor(Math.random() * 10000) + '_' + file.name
        this.ossFormData.OSSAccessKeyId = this.accessid
        this.ossFormData.policy = this.policy
        this.ossFormData.Signature = this.signature
        this.ossFormData.key = this.ossDir + 'project/' + this.newImgName
      },
      changeAttachmentUpload(file, fileList) {},
      removeAttachmentUpload(res, file) {},
      successAttachmentUpload(response, file, fileList) {
        this.$message.info('文件上传成功')
        this.removeOriginFile(this.attachmentImg)
        this.attachmentImg = this.getPictureFullPath(this.newAttachmentName)
      },
      beforeAttachmentUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传附件只能是 JPG 或者 PNG 格式!')
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传附件大小不能超过 5MB!')
          return false
        }

        this.newAttachmentName = 'atm_' + Date.now() + Math.floor(Math.random() * 10000) + '_' + file.name
        this.ossFormData.OSSAccessKeyId = this.accessid
        this.ossFormData.policy = this.policy
        this.ossFormData.Signature = this.signature
        this.ossFormData.key = this.ossDir + 'project/' + this.newAttachmentName
      },
      // 获取图片完整路径
      getPictureFullPath(fileName) {
        if (!fileName) {
          return fileName
        }
        if (fileName.toLowerCase().startsWith('http://') || fileName.toLowerCase().startsWith('https://')) {
          return fileName
        }
        return this.ossHost + '/' + this.ossDir + 'project/' + fileName
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