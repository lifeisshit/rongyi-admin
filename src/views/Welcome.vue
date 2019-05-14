<template>
<div class="welcome">
  欢迎使用融易网后台管理系统
</div>
</template>

<script>
import axios from 'axios'
import API from '../api/api.js'

export default {
  name: 'Welcome',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    // axios.get(API.Welcome).then(res => {
    //   console.log(res)
    //   this.message = res.data
    // }).catch(error => {
    //   console.log('welcome page error ', error)
    // })
  }
}
</script>
