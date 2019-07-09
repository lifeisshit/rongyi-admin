const API = {
  AbsOSSUrl: 'http://47.103.55.170:28080/sys/aliyun-oss/getSign',
  OSSUrl: '/aliyun-oss/getSign',
  OSSUrlDelete: '/aliyun-oss/deleteObject',
  Login: '/sys-user/login',
  Logout: '/sys-user/logout',
  Welcome: '/welcome',
  SysRolePageList:'/sys-role/pageList',
  SysRoleInsert:'/sys-role/add',
  SysRoleUpdate:'/sys-role/update',
  SysUserPageList:'/sys-user/pageList',
  SysUserInsert:'/sys-user/add',
  SysUserUpdate:'/sys-user/update',
  SysUserDelete:'/sys-user/deleteById',
  SysUserGrabHighSeasClient:'/sys-user/grabHighSeasClient',
  SysUserListSales: '/sys-user/listSales',
  SuccessCaseAdd:'/success-case/add',
  SuccessCaseDelete:'/success-case/deleteById',
  SuccessCaseGet:'/success-case/getById',
  SuccessCaseUpdate:'/success-case/update',
  SuccessCasePageList:'/success-case/pageList',
  ProjectAdd:'/project/add',
  ProjectDelete:'/project/deleteById',
  ProjectGet:'/project/getById',
  ProjectUpdate:'/project/update',
  ProjectPageList:'/project/pageList',
  FundAdd:'/fund/add',
  FundDelete:'/fund/deleteById',
  FundGet:'/fund/getById',
  FundUpdate:'/fund/update',
  FundPageList:'/fund/pageList',
  NewsAdd:'/news/add',
  NewsDelete:'/news/deleteById',
  NewsGet:'/news/getById',
  NewsUpdate:'/news/update',
  NewsPageList:'/news/pageList',
  AppointmentProjectPageList:'/appointment-project/pageList',
  FinanceNeedsPageList:'/finance-needs/pageList',
  InvestorAdd:'/investor/add',
  InvestorDelete:'/investor/deleteById',
  InvestorGet:'/investor/getById',
  InvestorUpdate:'/investor/update',
  InvestorPageList:'/investor/pageList',
  InvestOrgAdd:'/invest-org/add',
  InvestOrgDelete:'/invest-org/deleteById',
  InvestOrgGet:'/invest-org/getById',
  InvestOrgUpdate:'/invest-org/update',
  InvestOrgPageList:'/invest-org/pageList',
  // ================用户管理================
  ClientAdd: '/user/add', // 新增用户
  ClientUpdate: '/user/updateUserInfo', // 修改用户信息
  ClientAssignOwner: '/user/assignOwner', // 分配销售人员
  ClientGetById: '/user/getById', // 根据id获取记录
  ClientPageList: '/user/pageList', // 列表
  ClientPushToHighSeas: '/user/pushToHighSeas', // 设置为公海客户
  StatisticsClientInfo: '/user/statisticsClientInfo', // 客户统计信息
  // ================追踪客户记录================
  TracePageList: '/trace-rec/pageList', // 列表
  TraceAdd: '/trace-rec/trace', // 添加跟踪记录
}

export default API
