<template>
	<wd-cell title="退出登录" is-link @click="logout"></wd-cell>
</template>

<script>
export default {
	methods: {
		logout() {
			this.$userData.userInfo = '';
			this.$userData.nickName = '';
			this.$userData.avatarUrl = '';
			uni.setStorageSync('userInfo', '');
			uni.setStorageSync('nickName', '');
			uni.setStorageSync('avatarUrl', '');
			
			this.$userData.openId = '';
			this.$userData.sessionKey = '';
			
			uni.setStorageSync('openId', '');
			uni.setStorageSync('sessionKey', '');
			
			uni.reLaunch({
				url: '/pages/my/my',
				success() {
					
				},
				fail() {
					uni.showToast({
						title: '退出登录失败',
						icon: 'none'
					});
				}
			})
		}
	}
}
</script>

<style>
</style>