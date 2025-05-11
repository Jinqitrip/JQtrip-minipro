<template>
	<view class="post-detail-page">
		<swiper v-if="postData.images && postData.images.length > 0" class="post-swiper"
			:indicator-dots="postData.images.length > 1" indicator-color="rgba(255, 255, 255, 0.6)"
			indicator-active-color="#ffffff" :autoplay="false" :interval="5000" :duration="500"
			:circular="postData.images.length > 1">
			<swiper-item v-for="(image, index) in postData.images" :key="image" class="swiper-item-container">
				<image :src="image" mode="aspectFit" class="post-image" @click="previewImage(index)" />
			</swiper-item>
		</swiper>
		<view v-else class="post-swiper-placeholder">
		</view>

		<view class="post-content-wrapper">
			<view class="post-header">
				<view class="post-meta">
					<view class="post-title">{{ postData.title }}</view>
					<view class="post-author">By {{ postData.author }}</view>
				</view>
				<view class="post-like-section" @click="toggleLike">
					<image :src="hasLiked ? '/static/redaixin.png' : '/static/aixin.png'" class="post-like-icon" />
					<text class="post-like-count">{{ likeCount }}</text>
				</view>
			</view>

			<view class="post-description">{{ postData.desc }}</view>

			<view class="divider"></view>

			<view class="comment-section">
				<view class="comment-section-title">评论区</view>
				<view v-if="comments.length === 0" class="no-comments">
					暂无评论，快来抢沙发吧！
				</view>
				<view v-else class="comments-list">
					<view v-for="(comment, index) in comments" :key="index" class="comment-item">
						<image :src="comment.userAvatar" class="user-avatar" mode="aspectFill" />
						<view class="comment-main">
							<view class="comment-header">
								<text class="user-nickname">{{ comment.userNickname }}</text>
								<view class="comment-like-wrapper" @click="likeComment(index)">
									<image
										:src="comment.likedBy.includes(loggedInUser) ? '/static/redaixin.png' : '/static/aixin.png'"
										class="comment-like-icon" />
									<text class="comment-like-count">{{ comment.likes }}</text>
								</view>
							</view>
							<p class="comment-content">{{ comment.content }}</p>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixed-comment-input-bar">
			<input v-model="newComment" type="text" placeholder="说点什么..." class="comment-input-field"
				:cursor-spacing="20" confirm-type="send" @confirm="addComment" />
			<button class="submit-button" @click="addComment" :disabled="!newComment.trim()">发送</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				postData: {
					id: null,
					title: 'Loading...',
					author: '',
					desc: '',
					images: [],
					initialLikes: 0
				},
				postId: null,
				loggedInUser: null,
				comments: [],
				newComment: '',
				hasLiked: false,
				likeCount: 0
			};
		},
		onLoad(options) {
			if (this.$userData && this.$userData.openId) {
				this.loggedInUser = this.$userData.openId;
			} else {
				console.warn("User data not available on load!");
				this.loggedInUser = null;
			}

			try {
				if (options.postData) {
					const decodedData = options.postData;
					const parsedData = JSON.parse(decodedData);

					if (parsedData && !Array.isArray(parsedData.images)) {
						console.warn("Parsed postData.images is not an array, defaulting to empty. Received:", parsedData
							.images);
						parsedData.images = [];
					}

					this.postData = parsedData;
					this.postId = this.postData.postId;

					console.log('Successfully parsed postData:', JSON.stringify(this.postData, null, 2));

					this.loadComments();
					this.loadLikes();

				} else {
					console.error("No postData received in options!");
					uni.showToast({
						title: '加载帖子失败',
						icon: 'error'
					});
					this.postData.title = "Error Loading Post";
				}
			} catch (e) {
				console.error("Error parsing postData:", e);
				console.error("Received options.postData:", options.postData);
				uni.showToast({
					title: '加载帖子数据出错',
					icon: 'error'
				});
				this.postData.title = "Error Loading Post Data";
			}
		},
		methods: {
			previewImage(currentIndex) {
				if (!this.postData.images || this.postData.images.length === 0) {
					return;
				}
				uni.previewImage({
					urls: this.postData.images,
					current: currentIndex,
					indicator: 'number'
				});
			},
			loadComments() {
				if (!this.postId) return;
				
				// 尝试从getApp().globalData中获取评论数据
				const app = getApp();
				if (!app.globalData) {
					app.globalData = {};
				}
				if (!app.globalData.comments) {
					app.globalData.comments = {};
				}
				
				// 如果全局变量中有这个帖子的评论，则使用全局变量中的数据
				if (app.globalData.comments[this.postId]) {
					this.comments = app.globalData.comments[this.postId];
				} else {
					// 如果全局变量中没有，则尝试从本地存储加载
					const savedComments = uni.getStorageSync(`comments_${this.postId}`) || [];
					this.comments = savedComments;
					// 并更新到全局变量
					app.globalData.comments[this.postId] = this.comments;
				}
			},
			saveComments() {
				if (!this.postId) return;
				
				// 保存到本地存储
				uni.setStorageSync(`comments_${this.postId}`, this.comments);
				
				// 同时更新到全局变量
				const app = getApp();
				if (!app.globalData) {
					app.globalData = {};
				}
				if (!app.globalData.comments) {
					app.globalData.comments = {};
				}
				app.globalData.comments[this.postId] = this.comments;
			},
			addComment() {
				if (this.newComment.trim() === '') {
					return;
				}
				if (!this.loggedInUser) {
					uni.showToast({
						title: '请先登录后评论',
						icon: 'none'
					});
					return;
				}

				const userAvatar = this.$userData?.avatarUrl || '/static/default-avatar.png';
				const userNickname = this.$userData?.nickName || '匿名用户';

				this.comments.push({
					content: this.newComment.trim(),
					likes: 0,
					likedBy: [],
					userId: this.loggedInUser,
					userAvatar: userAvatar,
					userNickname: userNickname,
				});
				this.newComment = '';
				this.saveComments();
			},
			likeComment(index) {
				if (!this.loggedInUser) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}
				const comment = this.comments[index];
				if (!comment) return;

				const userIndex = comment.likedBy.indexOf(this.loggedInUser);

				if (userIndex === -1) {
					comment.likes++;
					comment.likedBy.push(this.loggedInUser);
				} else {
					comment.likes--;
					comment.likedBy.splice(userIndex, 1);
				}
				this.saveComments();
			},
			toggleLike() {
				if (!this.loggedInUser) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}
				if (!this.postId) return;

				this.hasLiked = !this.hasLiked;
				if (this.hasLiked) {
					this.likeCount++;
				} else {
					this.likeCount = Math.max(0, this.likeCount - 1);
				}
				this.saveLikes();
			},
			loadLikes() {
				if (!this.postId) return;

				const initialCountSource = this.postData.initialLikes !== undefined ? this.postData.initialLikes : 0;
				
				// 从全局变量获取点赞数据
				const app = getApp();
				if (!app.globalData) {
					app.globalData = {};
				}
				if (!app.globalData.likes) {
					app.globalData.likes = {};
				}
				
				if (app.globalData.likes[this.postId]) {
					const likeData = app.globalData.likes[this.postId];
					this.likeCount = likeData.totalCount;
					this.hasLiked = this.loggedInUser && likeData.likedByUsers.includes(this.loggedInUser);
				} else {
					// 如果全局变量中没有，则从本地存储获取
					const savedLikesData = uni.getStorageSync(`likes_post_${this.postId}`);
					
					if (savedLikesData) {
						this.likeCount = savedLikesData.totalCount !== undefined ? savedLikesData.totalCount : initialCountSource;
						this.hasLiked = this.loggedInUser && savedLikesData.likedByUsers ? savedLikesData.likedByUsers.includes(this.loggedInUser) : false;
						
						// 更新到全局变量
						app.globalData.likes[this.postId] = savedLikesData;
					} else {
						this.likeCount = initialCountSource;
						this.hasLiked = false;
						
						// 初始化全局变量
						app.globalData.likes[this.postId] = {
							likedByUsers: [],
							totalCount: initialCountSource
						};
					}
				}
			},
			saveLikes() {
				if (!this.postId || !this.loggedInUser) {
					return;
				}

				// 获取全局变量中的点赞数据
				const app = getApp();
				if (!app.globalData) {
					app.globalData = {};
				}
				if (!app.globalData.likes) {
					app.globalData.likes = {};
				}
				
				// 如果全局变量中没有该帖子的点赞数据，则初始化
				if (!app.globalData.likes[this.postId]) {
					app.globalData.likes[this.postId] = {
						likedByUsers: [],
						totalCount: 0
					};
				}
				
				let likeData = app.globalData.likes[this.postId];
				let likedByUsers = likeData.likedByUsers || [];

				if (this.hasLiked) {
					if (!likedByUsers.includes(this.loggedInUser)) {
						likedByUsers.push(this.loggedInUser);
					}
				} else {
					likedByUsers = likedByUsers.filter(id => id !== this.loggedInUser);
				}

				// 更新全局变量
				app.globalData.likes[this.postId] = {
					likedByUsers: likedByUsers,
					totalCount: this.likeCount
				};
				
				// 同时更新本地存储
				uni.setStorageSync(`likes_post_${this.postId}`, app.globalData.likes[this.postId]);
			}
		}
	};
</script>

<style scoped>
	.post-detail-page {
		background-color: #f8f8f8;
		min-height: 100vh;
		padding-bottom: 160rpx;
		box-sizing: border-box;
	}

	.post-swiper {
		width: 100%;
		height: 65vh;
		max-height: 900rpx;
		background-color: #f0f0f0;
	}

	.post-swiper-placeholder {
		width: 100%;
		height: 65vh;
		max-height: 900rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e0e0e0;
		color: #999;
		font-size: 28rpx;
	}

	.swiper-item-container {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background-color: #FFFFFF;
		height: 100%;
	}

	.post-image {
		width: 100%;
		height: 100%;
	}

	.post-content-wrapper {
		padding: 30rpx 30rpx 40rpx 30rpx;
		background-color: #ffffff;
		margin-top: -20rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
		z-index: 1;
		min-height: 30vh;
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 25rpx;
		gap: 20rpx;
	}

	.post-meta {
		flex: 1;
	}

	.post-title {
		font-size: 42rpx;
		font-weight: bold;
		color: #2c2c2c;
		margin-bottom: 10rpx;
		line-height: 1.4;
	}

	.post-author {
		font-size: 28rpx;
		color: #888888;
	}

	.post-like-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx;
		cursor: pointer;
		margin-top: 5rpx;
		transition: transform 0.2s ease-in-out;
	}

	.post-like-section:active {
		transform: scale(0.95);
	}

	.post-like-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 5rpx;
	}

	.post-like-count {
		font-size: 24rpx;
		color: #666666;
	}

	.post-description {
		font-size: 30rpx;
		color: #444444;
		line-height: 1.75;
		white-space: pre-wrap;
		word-wrap: break-word;
		margin-bottom: 40rpx;
	}

	.divider {
		height: 1px;
		background-color: #f0f0f0;
		margin: 40rpx 0;
	}

	.comment-section {}

	.comment-section-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		margin-bottom: 30rpx;
	}

	.no-comments {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
		padding: 40rpx 0;
	}

	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 30rpx;
	}

	.comment-item {
		display: flex;
		gap: 20rpx;
		padding: 25rpx 20rpx;
		background-color: #f9f9f9;
		border-radius: 16rpx;
	}

	.user-avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		flex-shrink: 0;
		background-color: #eee;
	}

	.comment-main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.user-nickname {
		font-size: 28rpx;
		color: #555555;
		font-weight: 500;
	}

	.comment-like-wrapper {
		display: flex;
		align-items: center;
		gap: 8rpx;
		padding: 5rpx;
		cursor: pointer;
		transition: transform 0.2s ease-in-out;
	}

	.comment-like-wrapper:active {
		transform: scale(0.95);
	}

	.comment-like-icon {
		width: 32rpx;
		height: 32rpx;
	}

	.comment-like-count {
		font-size: 24rpx;
		color: #888888;
	}

	.comment-content {
		font-size: 29rpx;
		color: #333333;
		line-height: 1.65;
		word-wrap: break-word;
		margin: 0;
	}

	.fixed-comment-input-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 15rpx 20rpx;
		padding-bottom: calc(15rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(15rpx + env(safe-area-inset-bottom));
		background-color: #ffffff;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
		z-index: 100;
		gap: 15rpx;
	}

	.comment-input-field {
		flex: 1;
		height: 72rpx;
		padding: 0 25rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
		font-size: 28rpx;
		border: 1px solid #eee;
		box-sizing: border-box;
	}

	.comment-input-field:focus {
		border-color: #007aff;
		background-color: #ffffff;
	}

	.submit-button {
		background-color: #007aff;
		color: #ffffff;
		padding: 0 35rpx;
		height: 72rpx;
		line-height: 72rpx;
		border-radius: 36rpx;
		font-size: 28rpx;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
		margin: 0;
		box-sizing: border-box;
		text-align: center;
	}

	.submit-button[disabled] {
		background-color: #cce5ff;
		color: #f0f0f0;
		cursor: not-allowed;
	}

	.submit-button:active:not([disabled]) {
		background-color: #0056b3;
	}
</style>