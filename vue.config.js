const { defineConfig } = require('@vue/cli-service')
const bodyParse = require('body-parser')
const data = require('./src/mock/data.ts')
const jwt = require('jsonwebtoken')
const key = 'xyyyds'
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {

      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer.app.use(bodyParse.json())
      devServer.app.post('/api/data', (req, res) => {
        const { id, value, allTypeInit, ownId, edit } = req.body
        if (id === 1 && value) {
          // 名字搜索
          const newList = data.list.filter(item => item.name.includes(value))
          res.send({
            data: newList
          })
        } else if (id === 2 && value) {
          // ID搜索
          const newList = data.list.filter(item => item.id.includes(value))
          res.send({
            data: newList
          })
        } else if (ownId) {
          // 删除单个
          data.list.splice(data.list.findIndex(item => item.id === ownId), 1)
          res.send({
            data: data.list
          })
        } else if (edit) {
          // 编辑
          console.log(edit)
          data.list.map(item => item.id === edit.id ? Object.assign(item, edit) : item)
          res.send({
            data: data.list
          })
        } else if (allTypeInit === '全部订单') {
          // 全部订单
          res.send({
            data: data.list
          })
        } else {
          // 按钮筛选
          const newList = data.list.filter(item => item.state === allTypeInit)
          res.send({
            data: newList
          })
        }
      })
      devServer.app.post('/api/Chart', (req, res) => {
        const type = ["待付款", "代发货", "已发货", "已完成", "已关闭"];
        const ChartData = type.map((item, index) => {
          const arr = {};
          arr.name = item;
          let count = 0;
          data.list.filter((v) => {
            if (v.state === item) {
              count++;
            }
            arr.value = count;
          });
          return arr;
        });
        const option = {
          title: {
            text: "Referer of a Website",
            subtext: "Fake Data",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "订单状态",
              type: "pie",
              radius: "50%",
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              data: ChartData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        res.send({
          option: option
        })
      })

      devServer.app.post('/api/login', (req, res) => {
        const { user, pass } = req.body
        console.log(user, pass)
        if (data.login.some(item => item.user === Number(user) && item.pass === Number(pass))) {
          console.log(1111111)
          res.send({
            code: 200,
            token: jwt.sign({ user }, key),
            message: '登陆成功'
          })
        } else {
          res.send({
            code: 400,
            message: '账号或密码不正确'
          })
        }
      })
      devServer.app.post('/api/token', (req, res) => {
        const { token } = req.body
        try {
          const item = jwt.verify(token, key)
          res.send({
            code: 200,
            user: item.user,
            message: '验证token成功'
          })
        } catch {
          res.send({
            code: 400,
            message: '非法登录'
          })
        }

      })
      return middlewares
    }
  }
})
