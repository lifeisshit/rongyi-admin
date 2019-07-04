const state = {
    loginUserId: '',
    loginUserRole: '',
    // 当前页面是否全屏, true-全屏 false-在tab页中打开
    isFullPage: false,
    // 菜单项
    menuList: [{
        name: 'Welcome',
        icon: 'el-icon-d-arrow-right',
        title: '首页'
    },{
      name: 'ClientManagement',
      icon: 'el-icon-tickets',
      title: '公司客户',
      role: 'sys_admin,gen_mgr',
      subItems: [{
        name: 'ClientList',
        title: '客户'
      },{
        name: 'AppointmentProjectList',
        title: '投递项目'
      },{
        name: 'FinanceNeedsList',
        title: '融资需求'
      }]
    },{
      name: 'BusinessManagement',
      icon: 'el-icon-tickets',
      title: '业务管理',
      role: 'sys_admin,sales_mgr,sales_man,gen_mgr',
      subItems: [{
        name: 'FundList',
        title: '资金方'
      },{
        name: 'ProjectList',
        title: '项目方'
      },{
        name: 'SuccessCaseList',
        title: '成功案例'
      },{
        name: 'InvestorList',
        title: '投资人'
      },{
        name: 'InvestOrgList',
        title: '投资机构'
      }]
    },{
      name: 'NewsManagement',
      icon: 'el-icon-tickets',
      title: '资讯管理',
      role: 'sys_admin,sales_mgr,sales_man,gen_mgr',
      subItems: [{
        name: 'SlideNewsList',
        title: '资讯幻灯片'
      },
        {
          name: 'NewsList',
          title: '资讯列表'
        }]
    },{
      name: 'SysUserManagement',
      icon: 'el-icon-tickets',
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
    tabComponents: ['Welcome',
      'SysRoleList',
      'SysUserList',
      'FundList',
      'ProjectList',
      'SuccessCaseList',
      'ClientList',
      'AppointmentProjectList',
      'FinanceNeedsList',
      'SlideNewsList',
      'NewsList',
      'InvestorList',
      'InvestOrgList']
}

export default state
