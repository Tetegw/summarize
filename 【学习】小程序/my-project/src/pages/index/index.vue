<template>
  <div class="container">
    <button open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
    <view class="userinfo-avatar">
      <img :src="userInfo.avatarUrl" alt="">
    </view>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      userInfo: {}
    }
  },

  components: {
    card
  },
  created () {
    let _this = this
    // 查看是否授权
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success (res) {
              _this.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    }
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  overflow: hidden;
}
.userinfo-avatar img{
  width: 100%;
  height: 100%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
