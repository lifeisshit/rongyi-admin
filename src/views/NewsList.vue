<template>
  <div class="success-case-list">
    <div v-if="listMode">
      <el-row :gutter="20">
        <el-col :span="1">
          <el-tooltip placement="right" content="刷新">
            <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain
                       @click="clickOnRefresh"></el-button>
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
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="clickOnAddNew">新增资讯</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column label="资讯图片" width="150px">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="100px" height="100px"/>
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" width="160px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
              <el-button @click="updateRow(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background
                       @current-change="currentPageChanged">
        </el-pagination>
      </el-row>
    </div>
    <div v-if="!listMode">
      <el-row>
        <el-col :span="18">
          <el-form ref="newsForm" :model="formData" :rules="formRule" label-width="120px">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeHolder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="资讯图片">
              <el-upload accept=".jpg, .png"
                         ref="newsImg"
                         class="avatar-uploader"
                         :action="ossHost"
                         :data="ossFormData"
                         :show-file-list="false"
                         :on-change="changeCoverImgUpload"
                         :on-remove="removeCoverImgUpload"
                         :on-success="successCoverImgUpload"
                         :before-upload="beforeCoverImgUpload">
                <img v-if="newsImg" :src="newsImg" class="avatar" width="300px" height="300px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="资讯内容:">
              <!--<el-input type="textarea" :rows="8" v-model="formData.content" placeHolder="请输入项目信息"></el-input>-->
              <UEditor :config=config ref="ueditor" :id="'1'"></UEditor>
            </el-form-item>
            <el-form-item label="阅读次数:" prop="viewCount">
              <el-input v-model="formData.readCount" placeHolder="请输入阅读次数" type="number"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐:" prop="recommend">
              <el-select v-model="formData.recommend" placeholder="请选择是否推荐">
                <el-option v-for="item in recommends" :label="item.label" :key="item.value" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否热门:" prop="hot">
              <el-select v-model="formData.hot" placeholder="请选择是否热门">
                <el-option v-for="item in hots" :label="item.label" :key="item.value" :value="item.value">
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
  import '../assets/css/success-case.less'
  import axios from 'axios'
  import API from '../api/api.js'
  import * as constant from '../common/constant'
  import UEditor from '../components/ueditor/ueditor.vue'

  export default {
    name: "SuccessCaseList",
    components: {
      UEditor,
    },
    data() {
      return {
        tableData: [],
        totalPage: 1,
        listMode: true,
        isAdd: true,
        keyword: '',
        recommends: constant.Recommend,
        hots: constant.Hot,
        formData: {
          id: 0,
          title: '',
          img: '',
          content: '',
          readCount: 0,
          recommend: 0,
          hot: 0,
        },
        formRule: {
          img: [{
            required: false,
            message: '请上传资讯图片',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入资讯内容',
            trigger: 'blur'
          }],
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          readCount: [{
            required: true,
            message: '请输入阅读次数',
            trigger: 'blur'
          }],
          recommend: [{
            required: true,
            message: '请选择是否推荐',
            trigger: 'blur'
          }],
          hot: [{
            required: true,
            message: '请选择是否热门',
            trigger: 'blur'
          }],
        },
        config: {
          //可以在此处定义工具栏的内容
          // toolbars: [
          //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
          //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
          //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
          // ],
          toolbars: [
            [
              'fullscreen', 'source', '|', 'undo', 'redo', '|',
              'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
              'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
              'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
              'directionalityltr', 'directionalityrtl', 'indent', '|',
              'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
              'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
              'simpleupload', 'insertvideo', 'map', 'insertframe', 'inserttable', 'deletetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
            ]
          ],
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '', //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent: false, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 350,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'ueditor/',
          ossUrl: API.AbsOSSUrl,
          sectionIndex: 1
        },
        newsImg: '',
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
          axios.get(API.NewsDelete, {
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
        this.formData.readCount = row.readCount
        this.formData.recommend = row.recommend
        this.formData.hot = row.hot
        this.newsImg = this.getPictureFullPath(this.formData.img)
        this.config.initialContent = row.content

        this.isAdd = false
        this.listMode = false
      },
      clickOnAddNew() {
        // 重置所有的formData
        this.formData = {}
        this.newsImg = ''
        this.config.initialContent =''
        this.isAdd = true
        this.listMode = false
      },
      getDataList(cp) {
        const params = {
          pageNum: cp,
          pageSize: 20,
          type: 0
        }
        if (this.keyword && this.keyword.trim()) {
          params.keyword = this.keyword
        }
        axios.post(API.NewsPageList, params).then(res => {
          if (res.status !== 0) {
            this.$message.error('获取资讯列表失败')
          } else {
            this.tableData = res.data.dataList
            this.totalPage = res.data.totalPage
          }
        }).catch(() => this.$message.error('获取资讯列表失败'))
      },
      currentPageChanged(cp) {
        this.getDataList(cp)
      },
      clickOnSubmit() {
        this.$refs.newsForm.validate().then(() => {
          // 获取图片
          /*if (!this.newsImg) {
            this.$message({type: "error", message: "请先上传资讯图片"});
            return false;
          }*/
          this.formData.img = this.newsImg

          const content = this.$refs.ueditor.getUEContent()
          this.formData.content = content

          this.formData.type = 0

          let api = this.isAdd ? API.NewsAdd : API.NewsUpdate
          axios.post(api, this.formData).then(res => {
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
            dir: 'edit/news',
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
      changeCoverImgUpload(file, fileList) {
      },
      removeCoverImgUpload(res, file) {
      },
      successCoverImgUpload(response, file, fileList) {
        this.$message.info('文件上传成功')
        this.removeOriginFile(this.newsImg)
        this.newsImg = this.getPictureFullPath(this.newImgName)
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
        this.ossFormData.key = this.ossDir + 'news/' + this.newImgName
      },
      // 获取图片完整路径
      getPictureFullPath(fileName) {
        if (!fileName) {
          return fileName
        }
        if (fileName.toLowerCase().startsWith('http://') || fileName.toLowerCase().startsWith('https://')) {
          return fileName
        }
        return this.ossHost + '/' + this.ossDir + 'news/' + fileName
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
