<template>
  <view class="post-detail-page">
    <!-- Swiper for Images -->
    <swiper
      v-if="postData.images && postData.images.length > 0"
      class="post-swiper"
      :indicator-dots="postData.images.length > 1"
      indicator-color="rgba(255, 255, 255, 0.6)"
      indicator-active-color="#ffffff"
      :autoplay="false"
      :interval="5000"
      :duration="500"
      :circular="postData.images.length > 1"
    >
      <swiper-item v-for="(image, index) in postData.images" :key="image" class="swiper-item-container">
        <!-- Use aspectFit to show the whole image, background handles empty space -->
        <image :src="image" mode="aspectFit" class="post-image" @click="previewImage(index)" />
      </swiper-item>
    </swiper>
     <view v-else class="post-swiper-placeholder">
        <!-- Optional: Placeholder if no images -->
        <!-- <text>No Image Available</text> -->
     </view>


    <view class="post-content-wrapper">
      <!-- Post Header Info -->
      <view class="post-header">
        <view class="post-meta">
          <view class="post-title">{{ postData.title }}</view>
          <view class="post-author">By {{ postData.author }}</view>
          <!-- Add timestamp if available: <view class="post-timestamp">Posted on {{ formattedTimestamp }}</view> -->
        </view>
        <view class="post-like-section" @click="toggleLike">
          <image :src="hasLiked ? '/static/redaixin.png' : '/static/aixin.png'" class="post-like-icon" />
          <text class="post-like-count">{{ likeCount }}</text>
        </view>
      </view>

      <!-- Post Description -->
      <view class="post-description">{{ postData.desc }}</view>

      <!-- Divider -->
      <view class="divider"></view>

      <!-- Comment Section -->
      <view class="comment-section">
        <view class="comment-section-title">评论区</view>
        <view v-if="comments.length === 0" class="no-comments">
          暂无评论，快来抢沙发吧！
        </view>
        <view v-else class="comments-list">
          <view v-for="(comment, index) in comments" :key="index" class="comment-item">
             <!-- Using comment index as key is okay if comments aren't reordered/deleted frequently without full refresh -->
            <image :src="comment.userAvatar" class="user-avatar" mode="aspectFill" />
            <view class="comment-main">
              <view class="comment-header">
                <text class="user-nickname">{{ comment.userNickname }}</text>
                <!-- Add comment timestamp if available -->
                <!-- <text class="comment-timestamp">{{ comment.timestamp }}</text> -->
                <view class="comment-like-wrapper" @click="likeComment(index)">
                  <image :src="comment.likedBy.includes(loggedInUser) ? '/static/redaixin.png' : '/static/aixin.png'" class="comment-like-icon" />
                  <text class="comment-like-count">{{ comment.likes }}</text>
                </view>
              </view>
              <p class="comment-content">{{ comment.content }}</p>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Fixed Comment Input Bar -->
    <view class="fixed-comment-input-bar">
      <input v-model="newComment" type="text" placeholder="说点什么..." class="comment-input-field" :cursor-spacing="20" confirm-type="send" @confirm="addComment"/>
      <button class="submit-button" @click="addComment" :disabled="!newComment.trim()">发送</button>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        postData: {
            // Initialize with default structure to prevent template errors before load
            id: null,
            title: 'Loading...',
            author: '',
            desc: '',
            images: [],
            initialLikes: 0
        },
        postId: null,
        loggedInUser: null, // Initialize as null, set in onLoad
        comments: [],
        newComment: '',
        hasLiked: false,
        likeCount: 0
      };
    },
    onLoad(options) {
      // Simulate getting loggedInUser (replace with your actual logic)
      if (this.$userData && this.$userData.openId) {
          this.loggedInUser = this.$userData.openId;
      } else {
          console.warn("User data not available on load!");
          this.loggedInUser = null; // Explicitly set to null or a guest ID
      }

      try {
        if (options.postData) {
           // Decode URI Component first
           const decodedData = options.postData;
           const parsedData = JSON.parse(decodedData);

           // **Robustness Check:** Ensure images is an array
           if (parsedData && !Array.isArray(parsedData.images)) {
               console.warn("Parsed postData.images is not an array, defaulting to empty. Received:", parsedData.images);
               parsedData.images = [];
           }

           this.postData = parsedData; // Assign parsed data
           this.postId = this.postData.id;

           // Log for debugging multi-image issues
           console.log('Successfully parsed postData:', JSON.stringify(this.postData, null, 2));

           this.loadComments();
           this.loadLikes(); // Load likes based on the now available postId

        } else {
            console.error("No postData received in options!");
            uni.showToast({ title: '加载帖子失败', icon: 'error' });
            // Maybe set postData to an error state or navigate back
            this.postData.title = "Error Loading Post";
            // uni.navigateBack();
        }
      } catch (e) {
         console.error("Error parsing postData:", e);
         console.error("Received options.postData:", options.postData); // Log raw data on error
         uni.showToast({ title: '加载帖子数据出错', icon: 'error' });
          this.postData.title = "Error Loading Post Data";
         // uni.navigateBack();
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
        if (!this.postId) return; // Don't load if postId isn't set
        const savedComments = uni.getStorageSync(`comments_${this.postId}`) || [];
        this.comments = savedComments;
      },
      saveComments() {
        if (!this.postId) return;
        uni.setStorageSync(`comments_${this.postId}`, this.comments);
      },
      addComment() {
        if (this.newComment.trim() === '') {
             return; // Don't add empty comments
        }
        if (!this.loggedInUser) {
             uni.showToast({ title: '请先登录后评论', icon: 'none' });
             // Optionally: Redirect to login page
             // uni.navigateTo({ url: '/pages/login/login' });
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
          // timestamp: new Date().toISOString() // Consider adding a timestamp
        });
        this.newComment = '';
        this.saveComments();
        // Consider scrolling to the new comment if the list is long
      },
      likeComment(index) {
         if (!this.loggedInUser) {
             uni.showToast({ title: '请先登录', icon: 'none' });
             return;
         }
        const comment = this.comments[index];
        if (!comment) return; // Safety check

        const userIndex = comment.likedBy.indexOf(this.loggedInUser);

        // Use Vue.$set or array spread for better reactivity if direct mutation issues arise
        // For example: const updatedComment = { ...comment };
        if (userIndex === -1) {
          comment.likes++;
          comment.likedBy.push(this.loggedInUser);
        } else {
          comment.likes--;
          comment.likedBy.splice(userIndex, 1);
        }
        // Trigger reactivity if needed (though usually direct modify works)
        // this.$set(this.comments, index, comment);
        this.saveComments();
      },
      toggleLike() {
         if (!this.loggedInUser) {
             uni.showToast({ title: '请先登录', icon: 'none' });
             return;
         }
         if (!this.postId) return; // Ensure postId is available

        this.hasLiked = !this.hasLiked;
        if (this.hasLiked) {
          this.likeCount++;
        } else {
          // Prevent count from going below zero locally
          this.likeCount = Math.max(0, this.likeCount - 1);
        }
        this.saveLikes();
      },
      loadLikes() {
         if (!this.postId) return; // Don't load if postId isn't set

         // Load total count from postData initially if available, otherwise from storage
         const initialCountSource = this.postData.initialLikes !== undefined ? this.postData.initialLikes : 0;
         const savedLikesData = uni.getStorageSync(`likes_post_${this.postId}`);

         if (savedLikesData) {
             // Prefer stored count if it exists (might be more up-to-date locally)
             this.likeCount = savedLikesData.totalCount !== undefined ? savedLikesData.totalCount : initialCountSource;
             // Load like status for the current logged-in user
             this.hasLiked = this.loggedInUser && savedLikesData.likedByUsers ? savedLikesData.likedByUsers.includes(this.loggedInUser) : false;
         } else {
            // Initialize from postData if no storage exists
            this.likeCount = initialCountSource;
            this.hasLiked = false; // Assume not liked initially if no data stored
         }
      },
      saveLikes() {
         if (!this.postId || !this.loggedInUser) { return; } // Need postId and user to save specific like state

        const currentLikesData = uni.getStorageSync(`likes_post_${this.postId}`) || { likedByUsers: [], totalCount: 0 };
        let likedByUsers = currentLikesData.likedByUsers || [];

        // Update the list of users who liked
        if (this.hasLiked) {
            if (!likedByUsers.includes(this.loggedInUser)) {
                likedByUsers.push(this.loggedInUser);
            }
        } else {
            likedByUsers = likedByUsers.filter(id => id !== this.loggedInUser);
        }

        // Save the updated list and the *current* optimistic count
        uni.setStorageSync(`likes_post_${this.postId}`, {
            likedByUsers: likedByUsers,
            totalCount: this.likeCount // Save the locally tracked count
        });
      }
    }
  };
</script>

<style scoped>
  /* Page Container */
  .post-detail-page {
    background-color: #f8f8f8;
    min-height: 100vh;
    padding-bottom: 160rpx; /* Ensure space for fixed input bar */
    box-sizing: border-box;
  }

  /* Swiper Styles */
  .post-swiper {
    width: 100%;
    /* Use viewport height for responsiveness, adjust as needed */
    height: 65vh;
    /* Add a max-height to prevent extremely tall images from dominating */
    max-height: 900rpx; /* Adjust this limit */
    background-color: #f0f0f0; /* Fallback background */
  }

   /* Placeholder style if needed */
  .post-swiper-placeholder {
      width: 100%;
      height: 65vh; /* Match swiper height */
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
    /* Background for letterboxing when using aspectFit */
    background-color: #FFFFFF;
     /* Or a neutral grey: background-color: #e0e0e0; */
    height: 100%; /* Ensure item fills swiper height */
  }

  .post-image {
    width: 100%;
    height: 100%;
    /* mode="aspectFit" is set in template - ensures whole image visible */
  }

  /* Content Area Below Swiper */
  .post-content-wrapper {
    padding: 30rpx 30rpx 40rpx 30rpx; /* Added bottom padding */
    background-color: #ffffff;
    margin-top: -20rpx; /* Overlap slightly */
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    position: relative;
    z-index: 1;
    min-height: 30vh; /* Ensure content area has some minimum height */
  }

  /* Post Header */
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
    font-size: 42rpx; /* Slightly larger title */
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

  /* Post Description */
  .post-description {
    font-size: 30rpx;
    color: #444444; /* Slightly darker text */
    line-height: 1.75; /* Increased line height */
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 40rpx;
  }

  /* Divider */
  .divider {
    height: 1px;
    background-color: #f0f0f0; /* Lighter divider */
    margin: 40rpx 0;
  }

  /* Comment Section */
  .comment-section {
    /* No changes needed here unless desired */
  }

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
    padding: 25rpx 20rpx; /* Slightly more padding */
    background-color: #f9f9f9;
    border-radius: 16rpx;
  }

  .user-avatar {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: #eee; /* Placeholder bg for avatar */
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
    font-size: 29rpx; /* Slightly larger comment text */
    color: #333333;
    line-height: 1.65;
    word-wrap: break-word;
    margin: 0;
  }

  /* Fixed Comment Input Bar */
  .fixed-comment-input-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 15rpx 20rpx;
    padding-bottom: calc(15rpx + constant(safe-area-inset-bottom)); /* iOS safe area */
	  padding-bottom: calc(15rpx + env(safe-area-inset-bottom)); /* Standard safe area */
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