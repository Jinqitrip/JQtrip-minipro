<template>
  <view>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
  </view>
</template>

<script>
import { baseUrl } from '@/config';
export default {
  data() {
    return {
      userInfo: null,
      hasUserInfo: false
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo(e) {
      if (e.mp.detail.userInfo) {
        this.userInfo = e.mp.detail.userInfo;
        this.hasUserInfo = true;
        this.login();
      } else {
        uni.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    },
    // 登录并获取用户信息
    login() {
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          // 登录成功，获取用户code
          const { code } = loginRes;
		  console.log(code);
          // 发送code到后台换取openId, sessionKey, unionId
          uni.request({
            url: baseUrl, // 你的登录API地址
            method: 'POST',
            data: {
              code
            },
            success: (res) => {
              if (res.data && res.data.success) {
				//  载入全局变量
                this.$userData.openId = res.data.openId;
                this.$userData.sessionKey = res.data.sessionKey;
                this.$userData.unionId = res.data.unionId;
				this.$userData.userInfo = this.userInfo;
				
                // 将用户信息和session存储到本地
                uni.setStorageSync('userInfo', this.userInfo);
                uni.setStorageSync('openId', this.$userData.openId);
                uni.setStorageSync('sessionKey', this.$userData.sessionKey);
                uni.setStorageSync('unionId', this.$userData.unionId);
				
              } else {
                uni.showToast({
                  title: '登录失败',
                  icon: 'none'
                });
              }
            },
            fail: () => {
              uni.showToast({
                title: '请求失败',
                icon: 'none'
              });
            }
          }); 
        },
        fail: (err) => {
          console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err);
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    }
  }
}
</script>

<style>
</style>