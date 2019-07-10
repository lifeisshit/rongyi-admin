const getters = {
  loginUserId: state => state.loginUserId,
  loginUserName: state => state.loginUserName,
  loginUserRole: state => state.loginUserRole,
  isFullPage: state => state.isFullPage,
  menuList: state => state.menuList,
  tabs: state => state.tabs,
  tabComponents: state => state.tabComponents,
  staticData: state => state.staticData
}

export default getters
