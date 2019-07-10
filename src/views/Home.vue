<template>
<div id="home">
  <el-container>
    <el-header height="50px">
      <div class="header-left">
        <div class="top_log"><a href="/"></a></div>
      </div>
      <div class="header-right">
        <div class="top_welcome">
          <i class="iconfont icon-yonghu"></i><span id="adminName">{{loginUserName}}</span>欢迎您登录；
          <a href="javascript:" @click="loginOut()"><i class="iconfont icon-tuichu"></i>退出</a>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu :default-active="activeMenuItemName" class="el-menu-vertical-demo" @select="handleMenuSelect" background-color="#23292e" text-color="#fff" active-text-color="#fff">
          <!-- 动态添加菜单，最多两级 -->
          <div v-for="menu in menuList" :key="menu.name">
            <!-- 不带二级菜单的 -->
            <el-menu-item v-bind:index="menu.name" v-if="!menu.subItems && hasRole(menu)">
              <!--<img class="menu-icon" v-bind:src="'/static/img/' + menu.icon" v-if="menu.icon">-->
              <i v-bind:class="menu.icon" v-if="menu.icon"></i>
              <span slot="title" class="menu-title">{{ menu.title }}</span>
            </el-menu-item>
            <!-- 带二级菜单的 -->
            <el-submenu v-bind:index="menu.name" v-if="menu.subItems && hasRole(menu)">
              <template slot="title">
                <!--<img class="menu-icon" v-bind:src="'/static/img/' + menu.icon" v-if="menu.icon">-->
                <i v-bind:class="menu.icon" v-if="menu.icon"></i>
                <span class="menu-title">{{ menu.title }}</span>
              </template>
              <el-menu-item v-bind:index="subMenu.name" v-for="subMenu in menu.subItems" :key="subMenu.name" :class="subMenuItemCls">
                <!--<img class="menu-icon" v-bind:src="'/static/img/' + menu.icon" v-if="subMenu.icon">-->
                <span class="menu-title">{{ subMenu.title }}</span>
              </el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <!-- 内容tab -->
      <el-main>
        <el-tabs v-model="activeTabsValue" type="border-card" :closable="isTabClosable" @tab-remove="removeTab" @tab-click="tabClick">
          <el-tab-pane v-for="(item) in tabs" :key="item.name" :label="item.title" :name="item.name">
            <component v-bind:is="item.name"></component>
          </el-tab-pane>
        </el-tabs>
        <!-- <router-view v-wechat-title="$route.meta.title" img-set="/static/img/logo.png" class="router" /> -->
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import axios from 'axios'
import API from '../api/api'
import { mapGetters } from 'vuex'

import '../assets/css/app.less'

export default {
  name: 'home',
  created: function () {
    this.checkLogin()
    this.init()
    this.tabComponents.forEach(tabComp => {
      this.$options.components[tabComp] = () => import(`./${tabComp}.vue`)
    })
  },
  data() {
    const defaultTabName = localStorage.getItem('activeTab') || 'Welcome'
    return {
      subMenuItemCls: 'custom-sub-item',
      activeTabsValue: defaultTabName,
      activeMenuItemName: defaultTabName,
      isTabClosable: true
      // adminName:localStorage.getItem('AdmInCookies'),
    }
  },
  watch: {
    tabs: function () {
      // tab只有一页的时候禁止删除
      if (this.tabs.length > 1) {
        this.isTabClosable = true
      } else {
        this.isTabClosable = false
      }
    }
  },
  computed: {
    ...mapGetters(['menuList', 'tabs', 'tabComponents', 'loginUserName'])
  },
  methods: {
    checkLogin() {
      let loginUserName = this.$store.getters.loginUserName
      if (!loginUserName || !loginUserName) {
        // 从缓存获取loginUserName
        loginUserName = localStorage.getItem('loginUserName')
        if (!loginUserName || !loginUserName) {
          this.$router.push({
            name: 'login'
          })
        } else {
          this.$store.dispatch('setLoginUserName', {
            loginUserName
          })
        }
      }
    },
    hasRole(menu) {
      if (menu.role) {
        let loginUserRole = this.$store.getters.loginUserRole
        if (!loginUserRole || !loginUserRole) {
          loginUserRole = localStorage.getItem('loginUserRole')
        }
        if (menu.role.indexOf(loginUserRole) == -1) {
          return false
        }
      }
      return true
    },
    init() {
      // 设置默认tab
      if (this.menuList && this.menuList.length > 0) {
        let defaultTab = null

        this.menuList.forEach((menu) => {
          if (menu.name === this.activeMenuItemName) {
            defaultTab = menu
          }
          // 遍历子菜单
          const subItems = menu.subItems
          subItems && subItems.forEach((subMenu) => {
            if (subMenu.name === this.activeMenuItemName) {
              defaultTab = subMenu
            }
          })
        })
        // 如果没有选中的tab，则默认选择第一个
        if (!defaultTab) {
          if (this.menuList[0].subItems && this.menuList[0].subItems.length > 0) {
            defaultTab = this.menuList[0].subItems[0]
          } else {
            defaultTab = this.menuList[0]
          }
        }

        this.$store.dispatch('resetTabs', {
          tabItem: defaultTab
        })
        this.activeTabsValue = defaultTab.name
      }
    },
    addTab(tabName) {
      const menuList = this.menuList

      menuList.forEach((menu) => {
        if (menu.name === tabName) {
          // 一级菜单
          this.$store.dispatch('addTab', {
            tabItem: menu
          })
          // 跳转到指定页
          this.changeToPage(tabName)
        } else {
          // 二级菜单
          if (menu.subItems) {
            let subMenuList = menu.subItems
            subMenuList.forEach((subMenu) => {
              if (subMenu.name === tabName) {
                this.$store.dispatch('addTab', {
                  tabItem: subMenu
                })
                // 跳转到指定页
                this.changeToPage(tabName)
              }
            })
          }
        }
      })
    },
    removeTab(tabName) {
      let tabs = this.tabs
      let activeName = this.activeTabsValue

      if (activeName === tabName) {
        tabs.forEach((tab, index) => {
          if (tab.name === tabName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.changeToPage(activeName)
      this.$store.dispatch('removeTab', {
        tabName: tabName
      })
    },
    /*
     * 跳转到指定name的页面
     *
     */
    changeToPage(name) {
      this.activeTabsValue = name
      this.activeMenuItemName = name
      localStorage.setItem('activeTab', name)
    },
    /*
     * 菜单项选中事件
     * key-当前key, 跟路由里面的name要一一对应 keyPath-自己和父层级的key
     * */
    handleMenuSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === this.activeTabsValue) {
        //选中的菜单项没有变化
        return
      }
      //添加至tab
      this.addTab(key)
    },
    tabClick(tab) {
      // console.log("tabClick tab: ", tab.name)
      this.changeToPage(tab.name)
    },
    loginOut() {
      // 退出登录
      axios.get(API.Logout).then(() => {
        //localStorage.removeItem('AdmInCookies')
        this.$store.dispatch('setLoginUserName', {
          loginUserId: ''
        })
        this.$store.dispatch('setLoginUserId', {
          loginUserName: ''
        })
        this.$store.dispatch('setLoginUserRole', {
          loginUserRole: ''
        })
        localStorage.removeItem('loginUserId')
        localStorage.removeItem('loginUserName')
        localStorage.removeItem('loginUserRole')
        localStorage.removeItem('activeTab')
        this.$message({
          'message': '您已安全退出登录',
          'type': 'success'
        })
        this.$router.push({
          name: 'login'
        })
      }).catch(error => {
        console.log('登出异常', error)
      })

    }
  }
}
</script>

<style lang="less">
.custom-sub-item {
  background: #444 !important;
}
</style>
