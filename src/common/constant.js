// 会员对象
const MemberObject = {
  PROJECT : 1,
  FUND : 2,
  properties: {
    1: {name: "项目方", value: 1},
    2: {name: "资金方", value: 2}
  }
}

// 会员身份
const MemberType = {
  PERSON : 1,
  ENTERPRISE : 2,
  GOVERNMENT : 3,
  properties: {
    1: {name: "个人", value: 1},
    2: {name: "企业", value: 2},
    3: {name: "政府", value: 3}
  }
}

// 会员职务
const MemberDuty = {
  OTHER : 1,
  MANAGER : 2,
  CHIEF : 3,
  VICE_PRESIDENT : 4,
  PRESIDENT : 5,
  DIRECTOR : 6,
  CHAIRMAN : 7,
  properties: {
    1: {name: "其他职务", value: 1},
    2: {name: "经理", value: 2},
    3: {name: "总监", value: 3},
    4: {name: "副总经理", value: 4},
    5: {name: "总经理", value: 5},
    6: {name: "董事", value: 6},
    7: {name: "董事长", value: 7}
  }
}

// 投资种类
const InvestTypes = ['个人资金', '企业资金', '天使投资', 'VC投资', 'PE投资', '担保公司', '金融租赁', '投资公司', '基金公司', '资产管理', '其它资金']

// 行业
const Industries = ['房地产', '矿产冶金', '金融投资', '农林牧渔', '能源', '建筑建材', '旅游酒店', '医疗保健', '机械机电', 'IT互联网', '电子通信', '文化传媒广告',
    '纺织服装饰品', '行政事业机构', '节能环保', '基础设施', '国防军工', '航空航天', '电气设备', '交通运输', '汽车汽配', '餐饮休闲娱乐', '教育培训体育',
    '批发零售', '食品饮料烟草', '家居日用', '生物医药', '海洋开发', '商务贸易', '家政服务', '园林园艺', '收藏品', '化学化工', '仓储物流', '家电数码',
    '其他行业']

// 地区
const Regions = ['北京', '天津', '上海', '重庆', '浙江省', '福建省', '甘肃省', '广东省', '广西省', '贵州省', '海南省', '河北省', '河南省', '黑龙江省',
  '湖北省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '内蒙古', '宁夏', '青海省', '山东省', '山西省', '陕西省', '四川省', '西藏', '新疆',
  '云南省', '安徽省', '香港', '澳门', '台湾', '海外']

// 项目类型
const ProjectTypes = ['项目融资', '资产交易', '政府招商', '投资理财']

export { MemberObject, MemberType, MemberDuty, InvestTypes, Industries, Regions, ProjectTypes}