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

export { MemberObject, MemberType, MemberDuty }