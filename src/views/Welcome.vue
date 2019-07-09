<template>
<div class="welcome">
  <div>欢迎使用融易网后台管理系统</div>
  <div class="my-chart" ref="myChart"></div>
</div>
</template>

<script>
import '../assets/css/welcome.less'
import axios from 'axios'
import API from '../api/api.js'
import echarts from '../plugins/echarts'

export default {
  name: 'Welcome',
  data() {
    return {
      staticData: null
    }
  },
  mounted() {
    this.getStatics()
  },
  methods: {
    // 获取统计信息
    getStatics() {
      axios.get(API.StatisticsClientInfo)
        .then(res => {
          console.log(res)
          if (res.status === 0) {
            this.staticData = res.data
            this.draw()
          }
        })
        .catch(() => {
          this.$message.error('获取销售人员列表失败')
        })
    },
    draw() {
      // 实例化echarts对象
      const myChart = echarts.init(this.$refs.myChart)
      const option = {
        title : {
          text: '我的客户资源',
          subtext: '总资源数('+ (this.staticData.totalCount || 0) +')',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['新客户数','潜在客户数','重/预/铁客户数']
        },
        series : [
          {
            name: '我的客户资源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value: this.staticData.newCount || 0, name:'新客户数('+ (this.staticData.newCount || 0) +')'},
              {value: this.staticData.latentCount || 0, name:'潜在客户数('+ (this.staticData.latentCount || 0) +')'},
              {value: this.staticData.zhongyutieCount || 0, name:'重/预/铁客户数('+ (this.staticData.zhongyutieCount || 0) +')'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 绘制条形图
      myChart.setOption(option)
    }
  }
}
</script>
