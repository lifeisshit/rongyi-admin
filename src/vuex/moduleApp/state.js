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
      title: '客户管理',
      role: 'sys_admin,sales_manager,sales_man',
      subItems: [{
        name: 'ClientList',
        title: '客户列表'
      },{
        name: 'AppointmentProjectList',
        title: '投递项目列表'
      }]
    },{
      name: 'BusinessManagement',
      icon: 'el-icon-tickets',
      title: '业务管理',
      role: 'sys_admin',
      subItems: [{
        name: 'FundList',
        title: '资金方'
      },{
        name: 'ProjectList',
        title: '项目方'
      },{
        name: 'SuccessCaseList',
        title: '成功案例'
      }]
    },{
      name: 'NewsManagement',
      icon: 'el-icon-tickets',
      title: '资讯管理',
      role: 'sys_admin',
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
      'SlideNewsList',
      'NewsList']
}

export default state
