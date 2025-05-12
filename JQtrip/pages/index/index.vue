<template>
	<view class="home-container">
		<!-- 顶部导航栏 -->
		<view class="header-container">
			<view class="status-bar-placeholder"></view>
			<view class="search-bar">
				<view class="area-filter-box">
					<picker @change="onAreaChange" :value="areaIndex" :range="areaList">
						<view class="area-filter">
							<text class="area-text">{{ areaList[areaIndex] }}</text>
							<text class="area-icon">▼</text>
						</view>
					</picker>
				</view>

				<view class="search-input-box">
					<input v-model="searchText" class="search-input" placeholder="搜索校园导览..." />
					<image class="search-icon" src="http://image.jinqitrip.com.cn/search_icon.png" mode="aspectFit">
					</image>
				</view>
			</view>
		</view>

		<!-- 内容区域 -->
		<scroll-view scroll-y class="content-scroll" refresher-enabled @refresherrefresh="onRefresh"
			:refresher-triggered="isRefreshing">
			<!-- 广告轮播图 -->
			<swiper class="banner-swiper" indicator-dots autoplay :interval="3000" :duration="500" circular>
				<swiper-item>
					<image src="http://image.jinqitrip.com.cn/official/011.jpg" mode="aspectFill" class="banner-image">
					</image>
				</swiper-item>
				<swiper-item>
					<image src="http://image.jinqitrip.com.cn/official/012.jpg" mode="aspectFill" class="banner-image">
					</image>
				</swiper-item>
				<swiper-item>
					<image src="http://image.jinqitrip.com.cn/official/013.jpg" mode="aspectFill" class="banner-image">
					</image>
				</swiper-item>
			</swiper>

			<!-- 活跃订单卡片 -->
			<view v-if="order_activated" class="active-order-card" @click="jump_to_order(order_activated)">
				<view class="order-status-badge" :class="getOrderStatusClass(order_activated.step)">
					{{ getOrderStatusText(order_activated.step) }}
				</view>
				<view class="order-content">
					<image :src="order_activated.order_image" alt="order" class="order-image" />
					<view class="order-info">
						<view class="order-title">{{ order_activated.title || '校园导览服务' }}</view>
						<view class="order-detail">
							<text class="order-location">{{ order_activated.location }}</text>
							<text class="order-price">￥{{ order_activated.price }}</text>
						</view>
						<view class="order-time">{{ order_activated.time }}</view>
					</view>
					<view class="order-arrow">
						<text class="arrow-icon">→</text>
					</view>
				</view>
			</view>

			<!-- 添加需求卡片 -->
			<view v-if="!order_activated" class="demand-card" @click="handleAddDemand">
				<view class="demand-content">
					<img src="https://img.icons8.com/?size=100&id=1501&format=png&color=ffffff" class="add-icon">
					<view class="demand-title">创建个性游览需求</view>
					<view class="demand-subtitle">点击定制专属旅程体验</view>
				</view>
				<img src="https://img.icons8.com/ios/100/ffffff/wave-lines.png" class="decorative-pattern">
			</view>

			<!-- 内容分类导航 -->
			<view class="category-nav">
				<view v-for="(category, index) in categories" :key="index" class="category-item"
					@click="selectCategory(index)">
					<image :src="category.icon" class="category-icon"></image>
					<text class="category-name">{{ category.name }}</text>
				</view>
			</view>

			<!-- 帖子列表区域 -->
			<view class="section-title">
				<text class="title-text">热门内容</text>
				<text class="title-more">查看更多 ></text>
			</view>

			<view class="post-list">
				<view class="post-item" v-for="(post, index) in filteredPostList" :key="index"
					@click="goToPostDetail(post)">
					<image :src="post.images && post.images[0]" class="post-image" mode="aspectFill"></image>
					<view class="post-info">
						<text class="post-title">{{ post.title }}</text>
						<view class="post-meta">
							<view class="post-author">
								<image :src="post.authoravatar" class="author-avatar"></image>
								<text class="author-name">{{ post.author }}</text>
							</view>
							<view class="post-location">{{ post.locationName }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 登录提示模态框 -->
		<view v-if="showLoginModal" class="login-modal-mask">
			<view class="login-modal">
				<image class="modal-icon" src="http://image.jinqitrip.com.cn/login-required.png"></image>
				<text class="modal-title">需要登录</text>
				<text class="modal-desc">登录后可以创建和查看个性化需求</text>
				<view class="button-group">
					<view class="modal-btn cancel-btn" @click="showLoginModal = false">稍后再说</view>
					<view class="modal-btn confirm-btn" @click="gotoLogin">立即登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '@/config';

	export default {
		data() {
			return {
				searchText: '',
				order_activated: "",
				isRefreshing: false,
				categories: [{
						name: '名校游览',
						icon: 'http://image.jinqitrip.com.cn/category-school.png'
					},
					{
						name: '学长带路',
						icon: 'http://image.jinqitrip.com.cn/category-guide.png'
					},
					{
						name: '专属定制',
						icon: 'http://image.jinqitrip.com.cn/category-custom.png'
					},
					{
						name: '升学规划',
						icon: 'http://image.jinqitrip.com.cn/category-plan.png'
					}
				],
				postList: [{
						postId: 1,
						title: '锦麒行校园引路人来啦',
						desc: '什么是锦麒行校园引路人计划：\n\n锦麒行校园引路人项目是由一个轻商业化校园体验项目，不同于校园导游，我们旨在通过"校友向导"角色帮助各年龄段的同学及家长深度探索校园文化。负责导览的同学会为游客提供2小时导览服务，导览过程中根据参观家长、同学的提问，结合个人经历分享选课备考攻略，以个人真实故事激励学弟学妹，或提供校园生活介绍等。后续，我们也将建立锦麒行陪伴社群，n对1为孩子的成长问题解答。\n300元/2h：您将获得：\n🔸【各学校优质向导】保研学霸/竞赛大神/活动达人亲自带队，每一名同学均经过严格选拔，面试淘汰率66.67%\n🔸【课本没有的生存秘笈】独家整理高效备考攻略/选课指南/社交资源库，涵盖时间管理、竞赛选择等实战技巧，由各校在读学子亲自讲授，助力快速适应中学、高中、大学等校园生态\n🔸【沉浸式名校体验】深度参访各名校核心场景，匹配孩子兴趣的1v1定制路线，真实感知顶尖学府学术氛围\n🔸【长期社群陪伴】每一名客户均可获享引路人社群联结体验包，在完成您的校园导领订单后，您后续可在随时在客户群中就孩子成长问题提问（体验限2次）或预约一次15分钟语音答疑。用朋辈的视角，为您与孩子解惑\n\n校园引路人计划支持院校：\n武汉地区：\n华中科技大学\n武汉大学\n中南财经政法大学\n中国地质大学\n成都地区：\n西南财经大学\n快来私信预约吧！还有想去的学校，在评论区留言吧！\n关键词：校园导游 成长陪伴 升学规划 武汉游览 华中科技大学 武汉大学 同济大学 西南财经大学 中南财经政法大学 中国地质大学\n#校园导游 #成长陪伴 #升学规划  #武汉游览  #答疑解惑 #华中科技大学 #武汉大学 #同济大学 #西南财经大学 #中南财经政法大学 #中国地质大学',
						images: ['http://image.jinqitrip.com.cn/official/011.jpg',
							'http://image.jinqitrip.com.cn/official/012.jpg',
							'http://image.jinqitrip.com.cn/official/013.jpg',
							'http://image.jinqitrip.com.cn/official/014.jpg',
							'http://image.jinqitrip.com.cn/official/015.jpg',
							'http://image.jinqitrip.com.cn/official/016.jpg',
							'http://image.jinqitrip.com.cn/official/017.jpg',
							'http://image.jinqitrip.com.cn/official/018.jpg',
							'http://image.jinqitrip.com.cn/official/019.jpg'
						],
						author: '锦麒行',
						authoravatar: 'http://image.jinqitrip.com.cn/logo.png',
						locationName: '官方',
						initialLikes: 10
					},
					{
						postId: 2,
						title: '校园导游小程序开源啦',
						desc: '锦麒行校园引路人项目是由一个轻商业化校园体验项目，不同于校园导游，我们旨在通过"校友向导"角色帮助各年龄段的同学及家长深度探索校园文化。负责导览的同学会为游客提供2小时导览服务，导览过程中根据参观家长、同学的提问，结合个人经历分享选课备考攻略，以个人真实故事激励学弟学妹，或提供校园生活介绍等。后续，我们也将建立锦麒行陪伴社群，n对1为孩子的成长问题解答。\n\n目前我们已将小程序源码开源，欢迎各个学校的团队自行搭建部署，亦可选择直接接入锦麒行中心平台\n\n详情请Github搜索：\nJinqitrip\nJQX_campus_guide\nJQtrip-minipro\n#创业 #校园导游 #校园团队',
						images: ['http://image.jinqitrip.com.cn/official/01tui.png'],
						author: '锦麒行',
						authoravatar: 'http://image.jinqitrip.com.cn/logo.png',
						locationName: '官方',
						initialLikes: 10
					}
				],
				areaIndex: 0,
				areaList: ['全部', '官方', '武汉大学', '华中科技大学', '中国地质大学', '中南财经政法大学'],
				currentPost: null,
				showDetail: false,
				showLoginModal: false
			};
		},
		methods: {
			onRefresh() {
				this.isRefreshing = true;
				// 模拟刷新操作
				setTimeout(() => {
					this.loadActiveOrder();
					this.isRefreshing = false;
				}, 1000);
			},
			loadActiveOrder() {
				if (this.$userData.openId) {
					uni.request({
						url: baseUrl + "/v1/orders/user/" + this.$userData.openId + "/active",
						method: 'GET',
						success: (res) => {
							console.log(res);
							if (res.statusCode == 200) {
								var data = res.data;
								var order = {
									"title": "",
									"order_image": "http://image.jinqitrip.com.cn/logo.png",
									"location": "",
									"price": "",
									"time": data.data.date + " " + data.data.time,
									"step": 0,
									"id": data._id
								}
								order.title = (function() {
									if (data.title) {
										return data.title;
									}
									return "未匹配的服务"
								})()
								order.location = (function() {
									if (data.location) {
										return data.location;
									}
									return "未确定"
								})()

								order.price = (function() {
									if (data.price) {
										return data.price;
									}
									return "待议"
								})()

								order.step = (function() {
									if (data.status == 'pending') {
										return 0;
									} else if (data.status == 'selecting') {
										return 1;
									} else if (data.status == 'upcoming') {
										return 2;
									} else if (data.status == 'reviewing') {
										return 3;
									}
									return 4;
								})()
								this.order_activated = order;
							}
						}
					});
				}
			},
			jump_to_order(order) {
				var mynavData = JSON.stringify(order);
				uni.navigateTo({
					url: "/pages/order/order_detail?index=" + mynavData
				});
			},
			getOrderStatusClass(step) {
				const statusClasses = {
					0: 'status-pending',
					1: 'status-selecting',
					2: 'status-upcoming',
					3: 'status-reviewing',
					4: 'status-completed'
				};
				return statusClasses[step] || 'status-pending';
			},
			getOrderStatusText(step) {
				const statusTexts = {
					0: '已下单',
					1: '待选择',
					2: '待开始',
					3: '待评价',
					4: '已完成'
				};
				return statusTexts[step] || '处理中';
			},
			selectCategory(index) {
				uni.showToast({
					title: `选择了${this.categories[index].name}`,
					icon: 'none'
				});
			},
			onAreaChange(e) {
				this.areaIndex = e.detail.value;
			},
			handleAddDemand() {
				if (this.$userData.openId == "") {
					this.showLoginModal = true;
					return;
				}
				uni.navigateTo({
					url: '/pages/index/demandfill'
				});
			},
			gotoLogin() {
				uni.navigateTo({
					url: '/pages/my/login_wx'
				});
				this.showLoginModal = false;
			},
			goToPostDetail(post) {
				uni.navigateTo({
					url: `/pages/index/postdetail?postData=${JSON.stringify(post)}`
				});
			}
		},
		computed: {
			filteredPostList() {
				let filteredList = this.postList;
				// 地区筛选
				if (this.areaIndex !== 0) {
					const selectedArea = this.areaList[this.areaIndex];
					filteredList = filteredList.filter(post => post.locationName === selectedArea);
				}
				// 文本筛选
				if (this.searchText) {
					filteredList = filteredList.filter(post => {
						return post.title.includes(this.searchText) || post.desc.includes(this.searchText);
					});
				}
				return filteredList;
			}
		},
		onLoad() {
			this.loadActiveOrder();
		},
		onPullDownRefresh() {
			this.loadActiveOrder();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	};
</script>

<style>
	.home-container {
		background-color: #f5f7fa;
		min-height: 100vh;
	}

	/* 顶部导航栏 */
	.header-container {
		background-color: #ffffff;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.status-bar-placeholder {
		height: var(--status-bar-height);
	}

	.search-bar {
		display: flex;
		align-items: center;
		height: 88rpx;
		padding: 0 24rpx;
	}

	.area-filter-box {
		flex-shrink: 0;
		padding-right: 20rpx;
	}

	.area-filter {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #333;
	}

	.area-text {
		max-width: 130rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.area-icon {
		font-size: 24rpx;
		margin-left: 8rpx;
		color: #999;
	}

	.logo-box {
		margin-right: 20rpx;
	}

	.logo-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 12rpx;
	}

	.search-input-box {
		flex: 1;
		position: relative;
		background-color: #f5f7fa;
		height: 60rpx;
		border-radius: 30rpx;
		padding: 0 20rpx 0 60rpx;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 20rpx;
		width: 32rpx;
		height: 32rpx;
	}

	.search-input {
		flex: 1;
		height: 60rpx;
		font-size: 26rpx;
	}

	/* 内容区域 */
	.content-scroll {
		height: calc(100vh - 88rpx - var(--status-bar-height));
	}

	/* 轮播图 */
	.banner-swiper {
		width: 100%;
		height: 320rpx;
	}

	.banner-image {
		width: 100%;
		height: 100%;
	}

	/* 活跃订单卡片 */
	.active-order-card {
		position: relative;
		margin: 20rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.order-status-badge {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		color: white;
		z-index: 1;
	}

	.status-pending {
		background-color: #2196f3;
	}

	.status-selecting {
		background-color: #ff9800;
	}

	.status-upcoming {
		background-color: #4caf50;
	}

	.status-reviewing {
		background-color: #f44336;
	}

	.status-completed {
		background-color: #9e9e9e;
	}

	.order-content {
		padding: 30rpx;
		display: flex;
		align-items: center;
	}

	.order-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
		margin-right: 20rpx;
	}

	.order-info {
		flex: 1;
	}

	.order-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 12rpx;
	}

	.order-detail {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8rpx;
	}

	.order-location {
		font-size: 26rpx;
		color: #666;
	}

	.order-price {
		font-size: 26rpx;
		color: #f44336;
		font-weight: bold;
	}

	.order-time {
		font-size: 24rpx;
		color: #999;
	}

	.order-arrow {
		padding-left: 20rpx;
	}

	.arrow-icon {
		font-size: 36rpx;
		color: #ccc;
	}

	/* 需求卡片 */
	.demand-card {
		background: linear-gradient(135deg, #4a6bff, #3b5af0);
		border-radius: 16px;
		padding: 20px;
		margin: 15px;
		color: white;
		position: relative;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(74, 107, 255, 0.3);
	}

	.demand-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
		position: relative;
		z-index: 2;
	}

	.add-icon {
		width: 40px;
		height: 40px;
		margin-bottom: 5px;
	}

	.demand-title {
		font-weight: bold;
		font-size: 18px;
	}

	.demand-subtitle {
		font-size: 14px;
		opacity: 0.9;
	}

	.decorative-pattern {
		position: absolute;
		bottom: -20px;
		right: -20px;
		width: 150px;
		height: 150px;
		opacity: 0.1;
	}

	/* 分类导航 */
	.category-nav {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 20rpx;
		background-color: #ffffff;
		margin: 20rpx;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
	}

	.category-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
	}

	.category-icon {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 12rpx;
	}

	.category-name {
		font-size: 26rpx;
		color: #333;
	}

	/* 帖子列表 */
	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
	}

	.title-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.title-more {
		font-size: 26rpx;
		color: #999;
	}

	.post-list {
		padding: 0 20rpx 30rpx;
	}

	.post-item {
		background-color: #ffffff;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
	}

	.post-image {
		width: 100%;
		height: 320rpx;
	}

	.post-info {
		padding: 20rpx;
	}

	.post-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		line-height: 1.4;
		margin-bottom: 16rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.post-author {
		display: flex;
		align-items: center;
	}

	.author-avatar {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.author-name {
		font-size: 24rpx;
		color: #666;
	}

	.post-location {
		font-size: 24rpx;
		color: #999;
		background-color: #f5f7fa;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
	}

	/* 登录模态框 */
	.login-modal-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.login-modal {
		width: 560rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		padding: 40rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.modal-icon {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
	}

	.modal-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 16rpx;
	}

	.modal-desc {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		margin-bottom: 30rpx;
	}

	.button-group {
		display: flex;
		width: 100%;
		gap: 20rpx;
	}

	.modal-btn {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 28rpx;
	}

	.cancel-btn {
		background-color: #f5f5f5;
		color: #666;
	}

	.confirm-btn {
		background-color: #2196f3;
		color: #ffffff;
	}
</style>