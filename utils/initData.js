const init = {
  loginedTabBarArr: [
    {
      "title": "职位",
      "iconClass": "icon-position",
      "iconStyle": ""
    },
    {
      "title": "公司",
      "iconClass": "icon-company",
      "iconStyle": ""
    },
    {
      "title": "消息",
      "iconClass": "icon-message",
      "iconStyle": ""
    },
    {
      "title": "我的",
      "iconClass": "icon-username",
      "iconStyle": ""
    }
  ],
  unloginedTabBarArr: [
    {
      "title": "职位",
      "iconClass": "icon-position",
      "iconStyle": ""
    },
    {
      "title": "公司",
      "iconClass": "icon-company",
      "iconStyle": ""
    },
    {
      "title": "登录",
      "iconClass": "icon-username",
      "iconStyle": ""
    }
  ],
  demandArr : [
    {
      name: 'degree',
      title: '最低学历',
      data:[
        { name: '大专', query: 'college' },
        { name: '本科', query: 'undergradute'},
        { name: '硕士', query: 'master'},
        { name: '博士', query: 'doctor'},
        { name: '其他', query: 'high'}
      ]
    },
    {
      name: 'experience',
      title: '工作经验',
      data: [
        { name: '应届毕业生', query: 'graduate' },
        { name: '一年以内', query: 'lt_1y' },
        { name: '1-3年', query: '1_3y' },
        { name: '3-5年', query: '3_5y' },
        { name: '5-10年', query: '5_10y' }
      ]
    },
    {
      name: 'salary',
      title: '薪资',
      data: [
        { name: '0-3K', query: '0_3k' },
        { name: '3K-6K', query: '3_6k' },
        { name: '6K-10K', query: '6_10k' },
        { name: '10K-15K', query: '10_15k' },
        { name: '15K-20K', query: '15_20k' }
      ]
    }
  ]
}

module.exports = {
  init
}