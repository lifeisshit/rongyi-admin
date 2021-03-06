// 投资方式
export const InvestMethods = ['股权投资', '债权投资', '金融投资', 'BT/BOT', '项目投资', '其它投资'];

// 金额
export const Amounts = ['不限', '1万-10万', '10万-50万', '50万-100万', '100万-500万', '500万-1000万', '1000万-5000万', '5000万-1亿']

// 投资种类
export const InvestTypes = ['个人资金', '企业资金', '天使投资', 'VC投资', 'PE投资', '担保公司', '金融租赁', '投资公司', '基金公司', '资产管理', '其它资金']

// 行业
export const Industries = ['房地产', '矿产冶金', '金融投资', '农林牧渔', '能源', '建筑建材', '旅游酒店', '医疗保健', '机械机电', 'IT互联网', '电子通信', '文化传媒广告',
  '纺织服装饰品', '行政事业机构', '节能环保', '基础设施', '国防军工', '航空航天', '电气设备', '交通运输', '汽车汽配', '餐饮休闲娱乐', '教育培训体育',
  '批发零售', '食品饮料烟草', '家居日用', '生物医药', '海洋开发', '商务贸易', '家政服务', '园林园艺', '收藏品', '化学化工', '仓储物流', '家电数码',
  '其他行业']

// 地区
export const Regions = ['北京', '天津', '上海', '重庆', '浙江省', '福建省', '甘肃省', '广东省', '广西省', '贵州省', '海南省', '河北省', '河南省', '黑龙江省',
  '湖北省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省', '内蒙古', '宁夏', '青海省', '山东省', '山西省', '陕西省', '四川省', '西藏', '新疆',
  '云南省', '安徽省', '香港', '澳门', '台湾', '海外']

// 项目类型
export const ProjectTypes = ['项目融资', '资产交易', '政府招商', '投资理财']

// 融资方式
export const FinanceWays = ['债权融资', '股权融资', '整体转让', '其他融资']

// 投资阶段
export const InvestPeriods = ['种子期', '初创期', '成长期', '扩张期', '成熟期', 'Pre-IPO']

// 项目阶段
export const ProjectPeriods = ['种子期', '初创期', '成长期', '扩张期', '成熟期', 'Pre-IPO']

// 交易类别
export const DealTypes = ['房屋', '土地', '交通工具', '机械设备', '账款债权', '有价票据', '无形资产', '股权', '矿产', '林权', '存货', '收藏品', '经营权',
  '金融资产', '其它']

// 交易方式
export const DealWays = ['拍卖', '协议', '竟价', '招标']

// 招商方式
export const AttractWays = ['合资', '独资', 'BT或BOT', '其它合作方式']

// 产品类型
export const ProductTypes = ['银行理财', '信托产品', '有限合伙', '阳光私募', '私募股权', '券商集合', '一对多', '私募债']

// 提供材料
export const ProvideMaterials = ['商业/项目计划书', '公司证件', '相关财务资料', '其他材料']

// 是否推荐
export const Recommend = [{
  value: 0,
  label: '不推荐'
}, {
  value: 1,
  label: '推荐'
}]

// 是否热门
export const Hot = [{
  value: 0,
  label: '不热门'
}, {
  value: 1,
  label: '热门'
}]

// 投资方式
export const InvestWays = [{
  value: '股权投资',
  label: '股权投资'
}, {
  value: '债权投资',
  label: '债权投资'
}, {
  value: '其它投资',
  label: '其它投资'
}]

// 客户类型
export const ClientTypes = [{
  value: 1,
  label: '新客户'
}, {
  value: 2,
  label: '潜在客户'
}, {
  value: 3,
  label: '重点客户'
}, {
  value: 4,
  label: '预收费客户'
}, {
  value: 5,
  label: '铁单客户'
}, {
  value: 6,
  label: '收费会员'
}, {
  value: 7,
  label: '过期会员'
}, {
  value: 8,
  label: '公海客户'
}, {
  value: 9,
  label: '移交总监'
}]
// 客户来源
export const ClientSources = ['搜索引擎', '报纸', '朋友介绍', '公众号', '其他']
// 客户职位
export const ClientDuties = ['经理', '总监', '副总经理', '总经理', '董事长', '其他职位']
// 性别
export const Genders = ['男', '女']
// 跟踪方式
export const TraceWays = ['电话', '总经理批注', '其他']
// 报价情况
export const OfferSituations = ['未报价', '已报价']
// 沟通类型
export const CommunicationTypes = [{
  name: '接通',
  sub: [{
    name: '正在忙'
  }, {
    name: '有需求',
    sub: [{ name: '有需求详情' }, { name: '确认KP或KP推动人' }, { name: '认可网站' }, { name: '认可付款模式' },
      { name: '一星期内付款' }, { name: '确定办款人' }, { name: '确定办款方式' }, { name: '确定一天内办款' }]
  }, {
    name: '不需要(自动剔除)',
    isToHighSeas: true
  }, {
    name: '有需要暂不考虑(自动剔除)',
    isToHighSeas: true
  }]
}, {
  name: '未接通',
  sub: [{ name: '无人接听' }, { name: '停机' }, { name: '空号(自动剔除)', isToHighSeas: true }]
}]
// 移交总监的客户的提交到投资公司的状态
export const DeliverStatus = [{
  value: 1,
  label: '未上交'
}, {
  value: 2,
  label: '已上交'
}]
// 客户是否投递过项目
export const AppointmentProjectStatus = [{
  value: 1,
  label: '未投递'
}, {
  value: 2,
  label: '已投递'
}]