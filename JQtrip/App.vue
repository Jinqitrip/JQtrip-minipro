<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			
			//获取用户信息
			this.$userData.openId = uni.getStorageSync('openId');
			this.$userData.sessionKey = uni.getStorageSync('sessionKey');
			this.$userData.unionId = uni.getStorageSync('unionId');
			this.$userData.userInfo = uni.getStorageSync('userInfo');
			this.$userData.avatarUrl = uni.getStorageSync('avatarUrl');
			this.$userData.nickName = uni.getStorageSync('nickName');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
  @import '@/uni_modules/tuniaoui-vue3/index.css';
</style>
