<template>
	<view class="container">

		<!-- 顶部导航栏 -->
		<view class="search-container">
			<view class="area-filter-box">
				<picker @change="onAreaChange" :value="areaIndex" :range="areaList">
					<view class="area-filter">
						{{ areaList[areaIndex] }}
					</view>
				</picker>
			</view>

			<view class="logobox">
				<image class="logo-icon" src="http://image.jinqitrip.com.cn/logo.png" mode="aspectFit"></image>
			</view>

			<view class="search-input-box">
				<input v-model="searchText" class="search-input" placeholder="搜索..." />
			</view>

			<view class="logobox">
				<image class="search-icon" src="http://image.jinqitrip.com.cn/search_icon.png" mode="aspectFit"></image>
			</view>
		</view>


		<!-- 添加需求模块 -->
		<view v-if="!order_activated" class="demand-card" @click="handleAddDemand">
			<view class="demand-content">
				<image class="add-icon" src="http://image.jinqitrip.com.cn/plus-circle-filled.svg"></image>
				<text class="demand-title">创建个性游览需求</text>
				<text class="demand-subtitle">点击定制专属旅程体验</text>
			</view>
			<image class="decorative-pattern" src="http://image.jinqitrip.com.cn/wave-pattern.png"></image>
		</view>


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

		<wd-card v-if="order_activated" @click="jump_to_order(order_activated)">
			<view style="height:120rpx"></view>
			<view class="content" @click="jump_to_order(order_activated)">
				<image :src="order_activated.order_image" alt="joy"
					style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
				<view>
					<view>{{ order_activated.title }}</view>
					<view>地址：{{ order_activated.location }}</view>
					<view>金额：{{ order_activated.price }}</view>
					<view>时间：{{ order_activated.time }}</view>
				</view>
			</view>
			<template #footer>
				<wd-tag @click="jump_to_order(order_activated)" v-if="order_activated.step == 0" type="primary"
					round>已下单</wd-tag>
				<wd-tag @click="jump_to_order(order_activated)" v-if="order_activated.step == 1" type="warning"
					round>待选择</wd-tag>
				<wd-tag @click="jump_to_order(order_activated)" v-if="order_activated.step == 2" type="success"
					round>待开始</wd-tag>
				<wd-tag @click="jump_to_order(order_activated)" v-if="order_activated.step == 4" round>已完成</wd-tag>
				<wd-tag @click="jump_to_order(order_activated)" v-if="order_activated.step == 3" type="danger"
					round>待评价</wd-tag>
			</template>
		</wd-card>

		<!-- 帖子列表区域 -->
		<view class="post-list-container">
			<view class="post-item-small " v-for="(post, index) in filteredPostList" :key="index"
				@click="goToPostDetail(post)">
				<image :src="post.images && post.images[0]" class="post-small-img" mode="aspectFit">
				</image>
				<view class="post-abb-desc">
					<text class="post-small-title">{{ post.title }}</text>
					<view class="post-writter-box">
						<image :src="post.authoravatar" class="postauavt" mode="aspectFill"></image>
						<text class="post-small-author">{{ post.author }}</text>
					</view>
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
				authoravatar: 'http://image.jinqitrip.com.cn/logo.png', // 假设默认头像路径
				locationName: '官方',
				initialLikes: 10
			}
			],
			areaIndex: '0',
			areaList: ['全部', '官方', '武汉大学', '华中科技大学', '中国地质大学', '中南财经政法大学'],
			currentPost: null,
			showDetail: false,
			showLoginModal: false
		};
	},
	methods: {
		jump_to_order(order) {
			var mynavData = JSON.stringify(order);
			uni.navigateTo({
				url: "/pages/order/order_detail?index=" + mynavData
			});
		},
		onAreaChange(e) {
			this.areaIndex = e.detail.value;
		},
		gotodemand() {
			uni.navigateTo({
				url: '/pages/index/demandfill'
			});
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
		},

		getPostitemBorder() {
			const borderClasses = ['postborder1', 'postborder2', 'postborder3'];
			const randomIndex = Math.random(0, 2);
			return borderClasses[randomIndex];
		}
	},
	computed: {
		filteredPostList() {
			let filteredList = this.postList;
			// 地区筛选
			if (this.areaIndex !== '0') {
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
						order.title = (function () {
							if (data.title) {
								return data.title;
							}
							return "未匹配的服务"
						})()
						order.location = (function () {
							if (data.location) {
								return data.location;
							}
							return "未确定"
						})()

						order.price = (function () {
							if (data.price) {
								return data.price;
							}
							return "待议"
						})()

						order.step = (function () {
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
				},
				fail: () => {
					console.log("fuck")
				}
			})
		}
	}
}
</script>

<style>
.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.search-container {
	position: fixed;
	display: flex;
	flex-direction: row-reverse;
	top: 0;
	left: 0;
	right: 0;
	height: 50px;
	background-color: #ffffff;
	align-items: center;
	padding: 0 15px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	z-index: 100;
}

.area-filter-box {
	margin-right: 5px;
}

.area-filter {
	padding: 5px 10px;
	background-color: #f5f5f5;
	border-radius: 5px;
}

.logobox {
	display: flex;
	width: 10%;
}

.search-input-box {
	display: flex;
	width: 50%;
	flex-direction: row;
	align-items: left;
	text-align: left;
	background-color: #f5f5f5;
	border-radius: 20px;
	padding: 10px;
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left: 5px;
}

.search-input {
	flex: 1;
	height: 25px;
	border: none;
	outline: none;
	background-color: transparent;
}

.logo-icon {
	width: 50px;
	height: 50px;
	margin: 5px;
}

.search-icon {
	width: 20px;
	height: 20px;
	margin-left: 5px;
}

/* 添加需求卡片样式 */
.demand-card {
	position: relative;
	height: 180rpx;
	margin-top: 120rpx;
	margin-bottom: 30rpx;
	margin-left: 30rpx;
	margin-right: 30rpx;
	border-radius: 24rpx;
	background: linear-gradient(135deg, #7FD2F6 0%, #5AA7EB 100%);
	box-shadow: 0 8rpx 24rpx rgba(90, 167, 235, 0.3);
	overflow: hidden;
	transition: transform 0.2s ease;
}

.demand-card:active {
	transform: scale(0.98);
}

.demand-content {
	position: absolute;
	z-index: 2;
	padding: 40rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.add-icon {
	width: 60rpx;
	height: 60rpx;
	margin-bottom: 20rpx;
	filter: drop-shadow(0 4rpx 8rpx rgba(0, 0, 0, 0.1));
}

.demand-title {
	font-size: 36rpx;
	color: #FFFFFF;
	font-weight: 600;
	margin-bottom: 12rpx;
}

.demand-subtitle {
	font-size: 26rpx;
	color: rgba(255, 255, 255, 0.9);
}

.decorative-pattern {
	position: absolute;
	right: -40rpx;
	bottom: -40rpx;
	width: 240rpx;
	height: 240rpx;
	opacity: 0.1;
}

/* 登录提示模态框样式 */
.login-modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.login-modal {
	width: 600rpx;

	background: #FFFFFF;
	border-radius: 32rpx;
	padding: 50rpx;
	text-align: center;
	animation: modalShow 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

@keyframes modalShow {
	from {
		transform: scale(0.8);
		opacity: 0;
	}

	to {
		transform: scale(1);
		opacity: 1;
	}
}

.modal-icon {
	width: 120rpx;
	height: 120rpx;
	margin-bottom: 32rpx;
}

.modal-title {
	display: block;
	font-size: 36rpx;
	color: #333;
	font-weight: 600;
	margin-bottom: 16rpx;
}

.modal-desc {
	display: block;
	font-size: 28rpx;
	color: #666;
	margin-bottom: 48rpx;
}

.button-group {
	display: flex;
	gap: 30rpx;
	justify-content: center;
}

.modal-btn {
	flex: 1;
	height: 80rpx;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	font-weight: 500;
	transition: all 0.2s ease;
}

.cancel-btn {
	background: #F5F5F5;
	color: #666;
}

.cancel-btn:active {
	background: #E0E0E0;
}

.confirm-btn {
	background: #5AA7EB;
	color: #FFFFFF;
}

.confirm-btn:active {
	background: #4A97DB;
}

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

/* 帖子 */
.post-list-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px;
}

.postborder1 {
	border: solid 7px #41403E;
	border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}

.postborder2 {
	border: dashed 5px #41403E;
	border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}

.postborder3 {
	border: dotted 5px #41403E;
	border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}

.post-item-small {
	width: calc(50% - 5px);
	margin-bottom: 10px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-abb-desc {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
}

.post-writter-box {
	display: flex;
	flex-direction: row;
}

.postauavt {
	border-radius: 50%;
	width: 15px;
	height: 15px;
	margin-left: 5px;
	margin-top: 1px;
}

.post-small-img {
	width: 100%;
	height: auto;
	aspect-ratio: 1 / 1;
	object-fit: cover;
}

.post-small-title {
	font-size: 14px;
	font-weight: 600;
	padding: 5px;
}

.post-small-author {
	font-size: 12px;
	color: #666;
	padding: 0 5px 5px 5px;
}
</style>