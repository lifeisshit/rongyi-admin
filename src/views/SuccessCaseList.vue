<template>
  <div class="success-case-list">
    <div v-if="listMode">
      <el-row :gutter="20">
        <el-col :span="1">
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
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="clickOnAddNew">新增案例</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column label="案例图片" width="150px">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="100px" height="100px"/>
            </template>
          </el-table-column>
          <el-table-column prop="fundRequire" label="资金需求">
          </el-table-column>
          <el-table-column prop="successAmount" label="成功融资金额">
          </el-table-column>
          <el-table-column prop="enterTime" label="项目入驻时间">
          </el-table-column>
          <el-table-column prop="successTime" label="成功融资时间">
          </el-table-column>
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
          <el-form ref="successCaseForm" :model="formData" :rules="formRule" label-width="120px">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeHolder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="案例图片">
              <el-upload accept=".jpg, .png"
                         ref="successCaseImg"
                         class="avatar-uploader"
                         :action="ossHost"
                         :data="ossFormData"
                         :show-file-list="false"
                         :on-change="changeCoverImgUpload"
                         :on-remove="removeCoverImgUpload"
                         :on-success="successCoverImgUpload"
                         :before-upload="beforeCoverImgUpload">
                <img v-if="successCaseImg" :src="successCaseImg" class="avatar" width="300px" height="300px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="项目信息:" prop="info">
              <el-input type="textarea" :rows="8" v-model="formData.info" placeHolder="请输入项目信息"></el-input>
            </el-form-item>
            <el-form-item label="资金需求:" prop="fundRequire">
              <el-input v-model="formData.fundRequire" placeHolder="请输入资金需求"></el-input>
            </el-form-item>
            <el-form-item label="成功融资金额:" prop="successAmount">
              <el-input v-model="formData.successAmount" placeHolder="请输入成功融资金额"></el-input>
            </el-form-item>
            <el-form-item label="查看次数:" prop="viewCount">
              <el-input v-model="formData.viewCount" placeHolder="请输入查看次数" type="number"></el-input>
            </el-form-item>
            <el-form-item label="项目入驻时间:" prop="enterTime">
              <el-date-picker v-model="formData.enterTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入项目入驻时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="成功融资时间:" prop="successTime">
              <el-date-picker v-model="formData.successTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入项目入驻时间"></el-date-picker>
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
  import '../assets/css/success-case.less'
  import axios from 'axios'
  import API from '../api/api.js'

  export default {
    name: "SuccessCaseList",
    data() {
      return {
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        keyword: '',
        formData: {
          id: 0,
          title: '',
          img: '',
          info: '',
          fundRequire: '',
          successAmount: '',
          viewCount: 0,
          enterTime: '',
          successTime: ''
        },
        formRule: {
          fundRequire: [{
            required: true,
            message: '请输入资金需求',
            trigger: 'blur'
          }],
          img: [{
            required: true,
            message: '请上传案例图片',
            trigger: 'blur'
          }],
          info: [{
            required: true,
            message: '请输入项目信息',
            trigger: 'blur'
          }],
          successAmount: [{
            required: true,
            message: '请输入成功融资金额',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入标题',
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
        successCaseImg: '',
        newImgName: '',
        //oss data
        accessid: '',
        policy: '',
        signature: '',
        ossDir: '',
        ossHost: '',
        ossFormData: {},
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
          axios.get(API.SuccessCaseDelete, {
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
        this.formData.title = row.title
        this.formData.img = row.img
        this.formData.info = row.info
        this.formData.fundRequire = row.fundRequire
        this.formData.successAmount = row.successAmount
        this.formData.viewCount = row.viewCount
        this.formData.enterTime = row.enterTime
        this.formData.successTime = row.successTime
        this.successCaseImg = this.getPictureFullPath(this.formData.img)

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
        axios.get(API.SuccessCasePageList, {
          params: params
        }).then(res => {
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
            dir: 'edit/successCase',
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
      changeCoverImgUpload(file, fileList) {},
      removeCoverImgUpload(res, file) {},
      successCoverImgUpload(response, file, fileList) {
        this.$message.info('文件上传成功')
        this.removeOriginFile(this.successCaseImg)
        this.successCaseImg = this.getPictureFullPath(this.newImgName)
      },
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

        this.newImgName = 'img_' + Date.now() + Math.floor(Math.random() * 10000) + '_' + file.name
        this.ossFormData.OSSAccessKeyId = this.accessid
        this.ossFormData.policy = this.policy
        this.ossFormData.Signature = this.signature
        this.ossFormData.key = this.ossDir + 'successCase/' + this.newImgName
      },
      // 获取图片完整路径
      getPictureFullPath(fileName) {
        if (!fileName) {
          return fileName
        }
        if (fileName.toLowerCase().startsWith('http://') || fileName.toLowerCase().startsWith('https://')) {
          return fileName
        }
        return this.ossHost + '/' + this.ossDir + 'successCase/' + fileName
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
    mounted() {
      this.getDataList(1)
      this.getAliyunOssSign()
    }
  }
</script>
