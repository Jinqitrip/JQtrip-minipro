<template>
	<view class="login-container">
		<view class="logo-container">
			<image class="logo" src="http://image.jinqitrip.com.cn/logo.png" mode="aspectFit"></image>
			<text class="app-name">锦麒行</text>
			<text class="app-slogan">探索校园、定制旅程</text>
		</view>
		
		<view class="login-card">
			<view class="welcome-text">
				<text class="welcome-title">欢迎使用锦麒行</text>
				<text class="welcome-desc">登录后即可体验全部功能</text>
			</view>
			
			<view class="login-btn-container">
				<button class="login-btn wx-login-btn" @click="login">
					<image class="wx-icon" src="/static/wechat-icon.png" mode="aspectFit"></image>
					<text>微信一键登录</text>
				</button>
			</view>
			
			<view class="policy-agreement">
				<text class="policy-text">登录即表示您同意</text>
				<text class="policy-link">《用户协议》</text>
				<text class="policy-text">和</text>
				<text class="policy-link">《隐私政策》</text>
			</view>
		</view>
		
		<view class="footer">
			<text class="copyright">© 2024-{{currentYear}} 锦麒行 All Rights Reserved</text>
		</view>
	</view>
</template>

<script>
import { baseUrl } from '@/config';
export default {

	data() {
		return {
			userInfo: null,
			hasUserInfo: false,
			currentYear : new Date().getFullYear()
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

								uni.showToast({
									title: '登录成功',
									icon: 'success',
									duration: 1500,
									success: () => {
										setTimeout(() => {
											uni.reLaunch({
												url: '/pages/my/my'
											});
										}, 1500);
									}
								});

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
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	min-height: 100vh;
	background-color: #f8f8f8;
	padding: 60rpx 40rpx;
	box-sizing: border-box;
}

.logo-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 80rpx;
}

.logo {
	width: 180rpx;
	height: 180rpx;
	border-radius: 24rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
}

.app-name {
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.app-slogan {
	font-size: 28rpx;
	color: #666;
}

.login-card {
	width: 100%;
	background-color: #fff;
	border-radius: 24rpx;
	padding: 50rpx 40rpx;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
	margin: 60rpx 0;
}

.welcome-text {
	text-align: center;
	margin-bottom: 50rpx;
}

.welcome-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.welcome-desc {
	font-size: 28rpx;
	color: #666;
}

.login-btn-container {
	margin-bottom: 40rpx;
}

.login-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90rpx;
	border-radius: 45rpx;
	font-size: 32rpx;
	font-weight: 500;
}

.wx-login-btn {
	background-color: #07c160;
	color: white;
}

.wx-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 15rpx;
}

.policy-agreement {
	text-align: center;
	font-size: 24rpx;
	color: #999;
}

.policy-link {
	color: #007aff;
}

.footer {
	margin-top: auto;
	padding: 30rpx 0;
}

.copyright {
	font-size: 24rpx;
	color: #999;
}
</style>