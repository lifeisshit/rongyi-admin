/**
 * Created by Jeff on 17/10/29.
 */
import * as types from '../mutation-types'
import { clone, find } from "lodash";

const mutations = {
  [types.SET_LOGIN_USER_ID](state, loginUserId) {
    state.loginUserId = loginUserId
  },
  [types.SET_LOGIN_USER_NAME](state, loginUserName) {
    state.loginUserName = loginUserName
  },
  [types.SET_LOGIN_USER_ROLE](state, loginUserRole) {
    state.loginUserRole = loginUserRole
  },
  // 设置是否全屏
  [types.SET_FULL_PAGE](state, isFullPage) {
    console.log("isFullPage: ", isFullPage);
    state.isFullPage = isFullPage
  },
  // 设置菜单项
  [types.SET_MENU_LIST](state, menuList) {
    console.log('menuList: ', menuList)
    state.menuList = [...menuList]
  },
  // 将tab列表设置为指定的项
  [types.RESET_TABS](state, tabItem) {
    console.log('tabs: ', tabItem)
    state.tabs = [tabItem]
  },
  [types.ADD_TAB](state, tabItem) {
    console.log('add tab: ', tabItem)
    let newTabs = clone(state.tabs)
    let isTabExist = find(state.tabs, tabItem)
    if(isTabExist) {
      return
    }

    if(tabItem.name === 'Welcome') {
      // 如果是首页，放在tab列表的第一个位置
      newTabs.unshift(tabItem)
    } else {
      newTabs.push(tabItem)
    }

    // state.tabs.forEach((tab) => {
    //   if (tab.name === tabItem.name) {
    //     // 已经存在则不重复添加
    //     return
    //   }
    //   if(tabItem.name === 'Welcome') {
    //     // 如果是首页，放在tab列表的第一个位置
    //     newTabs.unshift(tabItem)
    //   } else {
    //     newTabs.push(tabItem)
    //   }
    // })
    console.log('add newTabs: ', newTabs)
    state.tabs = newTabs
  },
  [types.REMOVE_TAB](state, tabName) {
    console.log('remove tab: ', tabName)
    state.tabs = state.tabs.filter(tab => tab.name !== tabName)
  },
  [types.GET_STATIC](state, payload) {
    state.staticData = payload
  },
}

export default mutations
