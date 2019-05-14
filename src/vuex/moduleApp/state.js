const state = {
    loginUserId: '',
    // 当前页面是否全屏, true-全屏 false-在tab页中打开
    isFullPage: false,
    // 菜单项
    menuList: [{
        name: 'Welcome',
        icon: 'el-icon-d-arrow-right',
        title: '首页'
    },
    {
        name: 'AdminUserManagement',
        icon: 'el-icon-tickets',
        title: '后台用户管理',
        role: 'SUPPER_ADMIN',
        subItems: [{
            name: 'AdminUserList',
            // icon: 'el-icon-check',
            title: '后台用户列表'
        }]
    }
    ],
    tabs: [],
    tabComponents: ['Welcome', 'AdminUserList']
}

export default state