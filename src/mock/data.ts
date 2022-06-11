const Mock = require('mockjs')
const data = Mock.mock({
    'list|99': [
        {
            'id': '@id',
            'time': '@datetime',
            'name': '@name',
            'price|199-999': 0,
            'pay|1': ['支付宝', '微信'],
            'state|1': ['待付款', '代发货', '已发货', '已完成', '已关闭']
        }
    ],
    'login': [
        {
            user: 179521,
            pass: 179521
        }
    ]
})
module.exports = data