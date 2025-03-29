<template>
  <view class="post-detail-container">
    <!-- 帖子图片 -->
    <swiper :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
      <swiper-item v-for="(image, index) in postData.images" :key="index">
        <image :src="image" mode="aspectFit" class="post-image"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <view class="post-detail-box">
      <view class="post-detail-title">{{ postData.title }}</view>
      <view class="post-detail-author">{{ postData.author }}</view>
      <img :src="hasLiked ? '/static/redaixin.png' : '/static/aixin.png'" alt="点赞" @click="toggleLike"
        class="post-like-icon" />
      <span class="like-count">{{ likeCount }}</span>
    </view>
    <view class="post-detail-info">{{ postData.desc }}</view>
    <!-- 评论区 -->
    <view class="comment-section">
      <view class="comments-list">
        <view v-for="(comment, index) in comments" :key="index" class="comment-item">
          <view class="user-info">
            <image :src="comment.userAvatar" class="user-avatar" />
            <text class="user-nickname">{{ comment.userNickname }}</text>
          </view>
          <view class="comment-content-wrapper">
            <p class="comment-content">{{ comment.content }}</p>
            <view class="like-wrapper">
              <img :src="comment.likedBy.includes(loggedInUser)? '/static/redaixin.png' : '/static/aixin.png'" alt="点赞"
                @click="likeComment(index)" class="like-icon" />
              <span class="like-count">{{ comment.likes }}</span>
            </view>
          </view>
        </view>
      </view>
      <view class="fixed-comment-input">
        <input v-model="newComment" type="text" placeholder="发表评论..." ref="commentInput" />
        <view class="submit-button" @click="addComment">提交</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        postData: {},
        postId: null,
        loggedInUser: this.$userData.openId,
        comments: [],
        newComment: '',
        hasLiked: false,
        likeCount: 0
      };
    },
    onLoad(options) {
      this.postData = JSON.parse(options.postData);
      this.postId = this.postData.id;
      this.loadComments();
      this.loadLikes();
    },
    methods: {
      async loadComments() {
        // 从本地存储或后端API获取对应帖子的评论
        const savedComments = uni.getStorageSync(`comments_${this.postId}`) || [];
        this.comments = savedComments;
      },
      saveComments() {
        // 将评论保存到本地存储或后端API
        uni.setStorageSync(`comments_${this.postId}`, this.comments);
      },
      async addComment() {
        if (this.newComment.trim() !== '') {
          this.comments.push({
            content: this.newComment,
            likes: 0,
            likedBy: [],
            userId: this.$userData.openId,
            userAvatar: this.$userData.avatarUrl,
            userNickname: this.$userData.nickName
          });
          this.newComment = '';
          this.saveComments();
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
        this.saveComments();
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
    height: 100%;
  }

  .post-detail-swiper {
    width: 100%;
    height: 500px;
    margin-bottom: 15px;
  }

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .post-detail-box {
    display: flex;
    flex-direction: row;
  }

  .post-detail-title {
    font-size: 24px;
    color: #222222;
    font-weight: 700;
    margin-bottom: 8px;
    margin-right: 5px;
  }

  .post-detail-author {
    font-size: 16px;
    color: #666666;
    margin-top: 10px;
  }

  .post-detail-info {
    margin-bottom: 25px;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    color: #333333;
    max-width: 100%;
    overflow-wrap: break-word;
  }

  .comment-section {
    border-top: 1px solid #e0e0e0;
    padding-top: 25px;
    position: relative;
    padding-bottom: 100rpx;
  }

  .comments-list {
    margin-bottom: 20px;
  }

  .comment-item {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-nickname {
    font-size: 14px;
    color: #666;
  }

  .comment-content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-content {
    font-size: 16px;
    color: #333;
  }

  .like-wrapper {
    display: flex;
    align-items: center;
  }

  .like-icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .like-icon:hover {
    transform: scale(1.1);
  }

  .fixed-comment-input {
    position: fixed;
    bottom: 80rpx;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  }

  .fixed-comment-input input {
    flex: 1;
    margin-right: 10px;
    padding: 0px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }

  .fixed-comment-input input:focus {
    outline: none;
  }

  .submit-button {
    background-color: #007aff;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  .post-like-icon {
    color: #ff4d4f;
    margin-left: 10rpx;
    width: 20px;
    height: 20px;
    margin-top: 10px;
  }

  .like-count {
    margin-top: 10px;
    margin-left: 5px;
    font-size: 14px;
    color: #666666;
  }
</style>