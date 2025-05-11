<script>
	export default {
		globalData: {
			comments: {},  // 存储评论数据
			likes: {}      // 存储点赞数据
		},
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
