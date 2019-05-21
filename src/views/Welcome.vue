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
  }
}
</script>
