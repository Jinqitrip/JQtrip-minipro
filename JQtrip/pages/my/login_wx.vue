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
				<button
                    class="login-btn wx-login-btn"
                    @click="login"
                    :disabled="!isAgreed"
                    :class="{ 'disabled-btn': !isAgreed }"
                >
					<image class="wx-icon" src="https://img.icons8.com/?size=200&id=fxuaZJkYPodW&format=png&color=FFFFFF" mode="aspectFit"></image>
					<text>微信一键登录</text>
				</button>
			</view>

			<view class="policy-agreement" @click="toggleAgreement">
                <checkbox class="agreement-checkbox" :checked="isAgreed" value="agree" />
                <view class="policy-text-container">
                    <text class="policy-text">我已阅读并同意</text>
                    <text class="policy-link" @click.stop="jump('user-agreement')">《用户协议》</text>
                    <text class="policy-text">和</text>
                    <text class="policy-link" @click.stop="jump('privacy-policy')">《隐私政策》</text>
                </view>
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
			currentYear: new Date().getFullYear(),
            isAgreed: false 
		}
	},
	methods: {
		jump(url){
			uni.navigateTo({
				url: 'agreement/'+url
			})
		},

        // 并非只有复选框可以点击
        toggleAgreement() {
            this.isAgreed = !this.isAgreed;
        },

		
		login() {
            if (!this.isAgreed) {
                uni.showToast({
                    title: '请先阅读并同意用户协议和隐私政策',
                    icon: 'none',
                    duration: 2000
                });
                return; 
            }
			
			// 登录并获取用户信息
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
				},
                complete: () => {
                    if (!this.loginInitiated) { 
                       this.proceedWithUniLogin();
                    }
                }
			});
			
            this.loginInitiated = false;
		},

        proceedWithUniLogin() {
            if (this.loginInitiated) return;
            this.loginInitiated = true;

            uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					const { code } = loginRes;
					console.log(code);
					// 发送code到后台换取openId, sessionKey, unionId
					uni.request({
						url: baseUrl + "/v1/auth/wxLogin",
						method: 'POST',
						data: {
							"code": code
						},
						success: (res) => {
                            this.loginInitiated = false;
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
									title: res.data.message || '登录失败', 
									icon: 'none'
								});
							}
						},
						fail: (err) => {
                            this.loginInitiated = false;
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							});
						}
					});
				},
				fail: (err) => {
                    this.loginInitiated = false;
					console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err);
					uni.showToast({
						title: '微信登录调用失败',
						icon: 'none'
					});
				}
			});
        }
	},

    onShow() {
        this.loginInitiated = false;
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
	margin: 60rpx 0; /* Adjusted margin */
    margin-bottom: auto;
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
    transition: background-color 0.3s, opacity 0.3s;
}

.wx-login-btn {
	background-color: #07c160;
	color: white;
}

.wx-login-btn.disabled-btn {
    background-color: #a0e7ae; 
    opacity: 0.7; 
}

.wx-login-btn[disabled] {
     background-color: #a0e7ae !important; 
     opacity: 0.7 !important;
     color: #ffffff !important;
}


.wx-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 15rpx;
}

.policy-agreement {
	display: flex;
	align-items: center; 
	justify-content: center;
	text-align: left;
	font-size: 24rpx;
	color: #999;
	cursor: pointer; 
    padding: 10rpx 0; 
}

.agreement-checkbox {
    transform: scale(0.7); 
    margin-right: 10rpx;
    position: relative;
    top: -2rpx;
}

.policy-text-container {
    line-height: 1.5; 
}


.policy-text {
    color: #999;
}

.policy-link {
	color: #007aff;
    margin: 0 4rpx;
}

.footer {
	padding: 30rpx 0;
    width: 100%;
    text-align: center; 
}

.copyright {
	font-size: 24rpx;
	color: #999;
}
</style>