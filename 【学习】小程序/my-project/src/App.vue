<script>
export default {
  created () {
    this.checkSession()
  },
  methods: {
    // 检测登录状态
    checkSession () {
      let _this = this
      wx.checkSession({
        success (res) {
          // {errMsg: "login:ok"}
          // session_key 未过期，并且在本生命周期一直有效
          _this.authorize()
        },
        fail () {
          _this.login()
        }
      })
    },
    // 登录
    login () {
      let _this = this
      // 调用登录接口
      wx.login({
        success: (res) => {
          console.log(res)
          // {errMsg: "login:ok", code: "061p4b8w0fxt1j1RxD5w01JY7w0p4b8t"}
          // 调用开发服务器接口登录
          _this.authorize()
          // 登录完成授权
        }
      })
    },
    // 授权
    authorize () {
      let _this = this
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success (res) {
          console.log('授权状态', res)
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: 'scope.address',
              success () {
                // 用户已经同意小程序使用录音功能，调用 wx.startRecord 接口不会弹窗询问
                // wx.startRecord()
              },
              fail () {
                // 如果用户已拒绝授权，则短期内不会出现弹窗，可以通过关闭小程序或微信再打开直接进入接口 fail 回调。请开发者兼容用户拒绝授权的场景。
                _this.openConfirm()
              }
            })
          }
        }
      })
    },
    // 拒绝授权后，弹窗引导授权
    openConfirm () {
      let _this = this
      wx.showModal({
        content: '检测到您没打开获取地址权限，是否去设置打开？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          // 点击“确认”时打开设置页面
          if (res.confirm) {
            _this.openSetting()
          }
        }
      })
    },
    // 打开设置页面，用于再次授权
    openSetting () {
      wx.openSetting({
        success (res) {
          // 点击授权按钮后，点击返回触发，可以再次更新全局的授权状态
          console.log(res)
          // {"scope.userInfo": true, "scope.userLocation": true }
        },
        fail (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
