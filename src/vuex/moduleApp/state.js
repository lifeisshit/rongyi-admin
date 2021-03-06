const state = {
  loginUserId: '',
  loginUserName: '',
  loginUserRole: '',
  // 当前页面是否全屏, true-全屏 false-在tab页中打开
  isFullPage: false,
  // 菜单项
  menuList: [{
    name: 'Welcome',
    icon: 'el-icon-d-arrow-right',
    title: '首页'
  }, {
    name: 'SalesManagement',
    icon: 'el-icon-view',
    title: '销售管理',
    role: 'sys_admin,gen_mgr',
    subItems: [{
      name: 'SalesList',
      title: '销售列表'
    }]
  }, {
    name: 'ClientManagement',
    icon: 'el-icon-phone',
    title: '公司客户',
    role: 'sys_admin,gen_mgr',
    subItems: [{
      name: 'ClientList',
      title: '所有公司客户'
    }, {
      name: 'DirectorClientList',
      title: '移交总监客户'
    }, {
      name: 'AppointmentProjectList',
      title: '投递项目'
    }, {
      name: 'FinanceNeedsList',
      title: '融资需求'
    }]
  }, {
    name: 'MyClientManagement',
    icon: 'el-icon-star-on',
    title: '我的客户',
    role: 'sys_admin,gen_mgr,sales_mgr,sales_man',
    subItems: [{
      name: 'MyClientList',
      title: '所有我的客户'
    }, {
      name: 'AddClient',
      title: '新增客户'
    }]
  }, {
    name: 'HighSeasClientManagement',
    icon: 'el-icon-goods',
    title: '公海客户',
    role: 'sys_admin,gen_mgr,sales_mgr',
    subItems: [{
      name: 'HighSeasClientList',
      title: '所有公海客户'
    }]
  }, {
    name: 'BusinessManagement',
    icon: 'el-icon-edit',
    title: '业务管理',
    role: 'sys_admin,gen_mgr,sales_mgr',
    subItems: [{
      name: 'FundList',
      title: '资金方'
    }, {
      name: 'ProjectList',
      title: '项目方'
    }, {
      name: 'SuccessCaseList',
      title: '成功案例'
    }, {
      name: 'InvestorList',
      title: '投资人'
    }, {
      name: 'InvestOrgList',
      title: '投资机构'
    }]
  }, {
    name: 'NewsManagement',
    icon: 'el-icon-news',
    title: '资讯管理',
    role: 'sys_admin,gen_mgr,sales_mgr',
    subItems: [{
      name: 'SlideNewsList',
      title: '资讯幻灯片'
    },
      {
        name: 'NewsList',
        title: '资讯列表'
      }]
  }, {
    name: 'PersonalManagement',
    icon: 'el-icon-info',
    title: '个人信息',
    role: 'sys_admin,gen_mgr,sales_mgr,sales_man',
    subItems: [{
      name: 'PersonalInfo',
      title: '个人信息'
    }, {
      name: 'ModifyPassword',
      title: '修改密码'
    }]
  }, {
    name: 'SysUserManagement',
    icon: 'el-icon-setting',
    title: '系统管理',
    role: 'sys_admin',
    subItems: [{
      name: 'SysRoleList',
      title: '系统角色'
    },
      {
        name: 'SysUserList',
        title: '系统用户'
      }]
  }
  ],
  tabs: [],
  tabComponents: [
    'Welcome',
    'SysRoleList',
    'SysUserList',
    'FundList',
    'ProjectList',
    'SuccessCaseList',
    'ClientList',
    'DirectorClientList',
    'AppointmentProjectList',
    'FinanceNeedsList',
    'SlideNewsList',
    'NewsList',
    'InvestorList',
    'InvestOrgList',
    'HighSeasClientList',
    'AddClient',
    'MyClientList',
    'PersonalInfo',
    'ModifyPassword',
    'SalesList'
  ],
  staticData: null, // 首页饼状图统计信息
}

export default state
