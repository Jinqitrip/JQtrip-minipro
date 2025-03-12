<template>
	<wd-card type="rectangle">
		<view style="height: 40px" class="content" @click="jump_to_login">
			<image v-if="$userData.avatarUrl!=''" :src="$userData.avatarUrl" width="40" height="40" alt="joy"
				style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px" />
			<image v-if="$userData.avatarUrl==''" src="/static/my.png" width="40" height="40" alt="joy"
				style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px" />
			<view v-if="$userData.nickName!=''">
				<view class="custom-main" > {{$userData.nickName}} </view>
				<view class="custom-sub">ID</view>
			</view>
			<view v-if="$userData.nickName==''">
				<view class="custom-main" > 请登录 </view>
			</view>
		</view>
	</wd-card>

	<wd-cell title="账号管理" is-link @click.native="jump"></wd-cell>
	<wd-cell title="邀请新用户" is-link to="/pages/index/index"></wd-cell>
	<wd-cell title="联系客服" is-link to="/pages/index/index"></wd-cell>
	<wd-cell title="反馈与投诉" is-link to="/pages/index/index"></wd-cell>


</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()

function showToast() {
	toast.show('点击')
}


function jump() {

	uni.navigateTo({
		url: '/pages/my/account_manage'
	});
	console.log(423);
}

function jump_to_login() {

	uni.navigateTo({
		url: '/pages/my/login_wx'
	});
	console.log(423);
}
</script>

<style scoped>
page {
	font-weight: normal;
	/* 非nvue端使用此变量改变list线条颜色，nvue端请查看文档 */
	/* --fui-color-border:#B2B2B2; */
}

.fui-section__title {
	margin-left: 32rpx;
}

.fui-list__item {
	flex: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.fui-text__explain {
	font-size: 28rpx;
	color: #7F7F7F;
	flex-shrink: 0;
}

.fui-list__icon {
	width: 48rpx;
	height: 48rpx;
	margin-right: 24rpx;
}

.wot-theme-dark {
	.title-tip {
		color: rgba(232, 230, 227, 0.8);
	}

	.custom-main {
		color: $-dark-color;
	}

	.custom-sub {
		color: $-dark-color-gray;
	}
}

.content,
.title {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.content {
	justify-content: flex-start;
}

.title {
	justify-content: space-between;
}

.title-tip {
	color: rgba(0, 0, 0, 0.25);
	font-size: 12px;
}

.custom-main {
	color: rgba(0, 0, 0, 0.85);
	font-size: 16px;
}

.custom-sub {
	color: rgba(0, 0, 0, 0.25);
	font-size: 12px;
}
</style>