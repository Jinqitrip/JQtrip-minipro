<template>
	<view class="container">
		<view class="header">
			<image class="service-icon" src="http://image.jinqitrip.com.cn/customer-service.png"></image>
			<text class="title">联系客服</text>
			<text class="subtitle">扫码添加客服微信，获得专业咨询</text>
		</view>
		
		<view class="qr-code-section">
			<image class="qr-code" src="/static/WechatIMG433.jpg" mode="aspectFit"></image>
			<text class="qr-tip">长按识别二维码添加客服</text>
		</view>
		
		<view class="service-info">
			<view class="info-item">
				<image class="info-icon" src="http://image.jinqitrip.com.cn/clock-icon.png"></image>
				<text class="info-text">服务时间：9:00 - 21:00</text>
			</view>
			<view class="info-item">
				<image class="info-icon" src="http://image.jinqitrip.com.cn/message-icon.png"></image>
				<text class="info-text">快速响应，专业解答</text>
			</view>
			<view class="info-item">
				<image class="info-icon" src="http://image.jinqitrip.com.cn/star-icon.png"></image>
				<text class="info-text">个性化定制服务</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CustomerService',
	data() {
		return {
			
		}
	},
	methods: {
		
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	padding: 40rpx;
}

.header {
	text-align: center;
	margin-bottom: 80rpx;
}

.service-icon {
	width: 120rpx;
	height: 120rpx;
	margin-bottom: 30rpx;
}

.title {
	display: block;
	font-size: 48rpx;
	color: #333;
	font-weight: 600;
	margin-bottom: 20rpx;
}

.subtitle {
	display: block;
	font-size: 28rpx;
	color: #666;
}

.qr-code-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
	background: #FFFFFF;
	border-radius: 32rpx;
	padding: 60rpx 40rpx;
	box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.1);
}

.qr-code {
	width: 500rpx;
	height: 500rpx;
	border-radius: 24rpx;
	margin-bottom: 40rpx;
}

.qr-tip {
	font-size: 26rpx;
	color: #999;
	text-align: center;
}

.service-info {
	background: #FFFFFF;
	border-radius: 24rpx;
	padding: 40rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
}

.info-item {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.info-item:last-child {
	margin-bottom: 0;
}

.info-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}

.info-text {
	font-size: 28rpx;
	color: #333;
}
</style> 