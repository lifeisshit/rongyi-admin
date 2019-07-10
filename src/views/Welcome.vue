<template>
<div class="welcome">
  <div>欢迎使用融易网后台管理系统</div>
  <div class="my-chart" ref="myChart"></div>
</div>
</template>

<script>
import '../assets/css/welcome.less'
import echarts from '../plugins/echarts'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Welcome',
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    ...mapGetters(['staticData'])
  },
  async mounted() {
    await this.getStatics()
    // console.log('staticData: ', this.staticData)
    this.draw()
  },
  watch: {
    staticData() {
      // console.log('watch staticData: ', this.staticData)
      this.draw()
    }
  },
  methods: {
    ...mapActions(['getStatics']),
    draw() {
      // 实例化echarts对象
      if(!this.myChart) {
        this.myChart = echarts.init(this.$refs.myChart)
      }
      const totalText = '总资源数('+ (this.staticData.totalCount || 0) +')'
      const option = {
        title : {
          text: '我的客户资源',
          subtext: totalText,
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: totalText + "<br/>{b} : ({d}%)"
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
      this.myChart.setOption(option)
    }
  }
}
</script>
