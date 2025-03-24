<template>
    <view class="post-detail-container">
      <!-- 帖子图片 -->
      <swiper :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
        <swiper-item v-for="(image, index) in postData.images" :key="index">
          <!-- 确保图片完整显示 -->
          <image :src="image" mode="aspectFit" class="post-image"></image>
        </swiper-item>
      </swiper>
      <!-- 帖子标题 -->
      <text class="post-detail-title">{{ postData.title }}</text>
      <!-- 帖子作者 -->
      <text class="post-detail-author">{{ postData.author }}</text>
      <!-- 帖子详细信息 -->
      <view class="post-detail-info">
        <p>{{ postData.desc }}</p>
        <text>位置名称: {{ postData.locationName }}</text>
        <text>详细地址: {{ postData.address }}</text>
        <text>时间: {{ postData.time }}</text>
      </view>
  
      <!-- 评论区 -->
      <view class="comment-section">
        <!-- 评论输入框 -->
        <view class="comment-input">
          <input v-model="newComment" type="text" placeholder="发表评论" ref="commentInput" />
          <!-- 根据输入框内容显示“提交”按钮或“message.png” -->
          <view v-if="newComment.trim()!== ''" @click="addComment" class="submit-button">提交</view>
          <img v-else src="/static/message.png" alt="提交" @click="focusOnCommentInput" class="icon submit-icon" />
          <!-- 点赞图标，根据用户是否点赞切换图片 -->
          <img :src="hasLiked ? '/static/redaixin.png' : '/static/aixin.png'" alt="点赞" @click="toggleLike"
            class="icon like-icon" />
          <span class="like-count">{{ likeCount }}</span>
        </view>
        <!-- 评论列表 -->
        <view v-for="(comment, index) in comments" :key="index">
          <CommentItem :comment="comment" :index="index" :comments="comments" :loggedInUser="loggedInUser"
            :saveComments="saveComments" :fetchUserInfo="fetchUserInfo" :likeComment="likeComment"
            :focusOnReply="focusOnReply" :level="0" :isOwner="comment.userId === loggedInUser"
            :deleteComment="deleteComment"></CommentItem>
        </view>
      </view>
    </view>
  </template>
  
  <script>
    import CommentItem from './CommentItem.vue';
  
    export default {
      components: {
        CommentItem
      },
      data() {
        return {
          postData: {},
          postId: null,
          // 模拟登录
          loggedInUser: 'user123',
          comments: [], // 存储当前帖子的评论
          newComment: '',
          replyingToIndex: null,
          hasLiked: false, // 点赞状态
          likeCount: 0 // 点赞数量
        };
      },
      onLoad(options) {
        this.postData = JSON.parse(options.postData);
        this.postId = this.postData.id; // 获取帖子ID
        this.loadComments();
        this.loadLikes();
      },
      methods: {
        async loadComments() {
          // 从本地存储或后端API获取对应帖子的评论
          const savedComments = uni.getStorageSync(`comments_${this.postId}`) || [];
          // 为每条评论添加用户头像和昵称信息
          const commentsWithUserInfo = await Promise.all(
            savedComments.map(async (comment) => {
              const userInfo = await this.fetchUserInfo(comment.userId);
              return {
                ...comment,
                userAvatar: userInfo.avatar,
                userNickname: userInfo.nickname,
                showAllReplies: false,
                shownRepliesCount: 3
              };
            })
          );
          this.comments = commentsWithUserInfo;
        },
        saveComments() {
          // 将评论保存到本地存储或后端API
          uni.setStorageSync(`comments_${this.postId}`, this.comments);
        },
        async addComment() {
          if (this.newComment.trim() !== '') {
            const userInfo = await this.fetchUserInfo(this.loggedInUser);
            this.comments.push({
              content: this.newComment,
              likes: 0,
              likedBy: [],
              replies: [],
              userId: this.loggedInUser,
              userAvatar: userInfo.avatar,
              userNickname: userInfo.nickname,
              showAllReplies: false,
              shownRepliesCount: 3
            });
            this.newComment = '';
            this.saveComments(); // 保存评论
          }
        },
        likeComment(index) {
          const comment = this.comments[index];
          const userIndex = comment.likedBy.indexOf(this.loggedInUser);
          if (userIndex === -1) {
            comment.likes++;
            comment.likedBy.push(this.loggedInUser);
          } else {
            comment.likes--;
            comment.likedBy.splice(userIndex, 1);
          }
          this.saveComments(); // 保存评论
        },
        focusOnReply(index) {
          this.replyingToIndex = index;
        },
        toggleLike() {
          this.hasLiked = !this.hasLiked;
          if (this.hasLiked) {
            this.likeCount++;
          } else {
            this.likeCount--;
          }
          this.saveLikes();
        },
        loadLikes() {
          const savedLikes = uni.getStorageSync(`likes_${this.postId}`);
          if (savedLikes) {
            this.hasLiked = savedLikes.hasLiked;
            this.likeCount = savedLikes.likeCount;
          }
        },
        saveLikes() {
          uni.setStorageSync(`likes_${this.postId}`, {
            hasLiked: this.hasLiked,
            likeCount: this.likeCount
          });
        },
        async fetchUserInfo(userId) {
          try {
            // 这里需要替换为实际的 API 请求地址
            const response = await uni.request({
              url: `https://your-api-url.com/users/${userId}`,
              method: 'GET'
            });
            return response.data;
          } catch (error) {
            console.error('获取用户信息失败:', error);
            return {
              avatar: '/static/my.png',
              nickname: '未知用户'
            };
          }
        },
        deleteComment(index) {
          this.comments.splice(index, 1);
          this.saveComments();
        },
        focusOnCommentInput() {
          this.$refs.commentInput.focus();
        }
      }
    };
  </script>
  
  <style scoped>
    .post-detail-container {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    .post-detail-swiper {
      width: 100%;
      height: auto;
      margin-bottom: 15px;
    }
  
    .post-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .post-detail-title {
      font-size: 24px;
      color: #222222;
      font-weight: 700;
      margin-bottom: 8px;
    }
  
    .post-detail-author {
      font-size: 16px;
      color: #666666;
      margin-bottom: 15px;
    }
  
    .post-detail-info {
      margin-bottom: 25px;
    }
  
    .post-detail-info p {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: inherit;
      line-height: 1.6;
      color: #333333;
    }
  
    .comment-section {
      border-top: 1px solid #e0e0e0;
      padding-top: 25px;
    }
  
    .comment-input {
      margin-top: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .comment-input input {
      flex: 1;
      margin-right: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }
  
    .comment-input input:focus {
      outline: none;
    }
  
    .icon {
      width: 25px;
      height: 25px;
      margin-left: 10px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
  
    .icon:hover {
      transform: scale(1.1);
    }
  
    .submit-button {
      background-color: #007aff;
      color: #fff;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;
    }
  
    .like-icon {
      color: #ff4d4f;
    }
  
    .like-count {
      margin-left: 5px;
      font-size: 14px;
      color: #666666;
    }
  </style>