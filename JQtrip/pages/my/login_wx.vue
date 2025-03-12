<template>
	<view>
		<button @click="login">微信登录</button>
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
		// 登录并获取用户信息
		login() {
			uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
					console.log(infoRes.userInfo)
					this.$userData.userInfo = infoRes.userInfo;
					this.$userData.nickName = infoRes.userInfo.nickName;
					this.$userData.avatarUrl = infoRes.userInfo.avatarUrl;
					uni.setStorageSync('userInfo', this.$userData.userInfo);
					uni.setStorageSync('nickName', this.$userData.nickName);
					uni.setStorageSync('avatarUrl', this.$userData.avatarUrl);

				},
				fail: () => {
					uni.showToast({
						title: '用户信息获取失败',
						icon: 'none'
					});
				}
			});

			uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					// 登录成功，获取用户code
					const { code } = loginRes;
					console.log(code);
					// 发送code到后台换取openId, sessionKey, unionId
					uni.request({
						url: baseUrl + "/v1/auth/wxLogin", // 你的登录API地址
						method: 'POST',
						data: {
							"code": code
						},
						success: (res) => {
							if (res.data && res.data.success) {

								//  载入全局变量
								this.$userData.openId = res.data.openId;
								this.$userData.sessionKey = res.data.sessionKey;

								// 将用户信息和session存储到本地
								uni.setStorageSync('openId', this.$userData.openId);
								uni.setStorageSync('sessionKey', this.$userData.sessionKey);

								console.log(res);
								
								uni.reLaunch({
									url: '/pages/my/my',
									success() {
										let page = getCurrentPages().pop();
										if (!page) return;
										page.onLoad();
									},
									fail() {
										uni.showToast({
											title: '登录失败',
											icon: 'none'
										});
									}
								})


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

<style></style>