/**
 * Created by Jeff on 18/08/07.
 */
import * as types from '../mutation-types'
import axios from "axios";
import API from "../../api/api";

const actions = {
  setLoginUserId: ({commit}, payload) => {
    commit(types.SET_LOGIN_USER_ID, payload.loginUserId)
  },
  setLoginUserName: ({commit}, payload) => {
    commit(types.SET_LOGIN_USER_NAME, payload.loginUserName)
  },
  setLoginUserRole: ({commit}, payload) => {
    commit(types.SET_LOGIN_USER_ROLE, payload.loginUserRole)
  },
  setFullPage: ({commit}, payload) => {
    commit(types.SET_FULL_PAGE, payload.isFullPage)
  },
  setMenuList: ({commit}, payload) => {
    commit(types.SET_MENU_LIST, payload.menuList)
  },
  resetTabs: ({commit}, payload) => {
    commit(types.RESET_TABS, payload.tabItem)
  },
  addTab: ({commit}, payload) => {
    commit(types.ADD_TAB, payload.tabItem)
  },
  removeTab: ({commit}, payload) => {
    commit(types.REMOVE_TAB, payload.tabName)
  },
  getStatics({commit}) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axios.get(API.StatisticsClientInfo)
      commit(types.GET_STATIC, data)
      resolve(data)
    })
  },
}

export default actions
