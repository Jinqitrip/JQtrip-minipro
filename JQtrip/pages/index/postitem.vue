<template>
  <view class="post-item">
    <view class="post-header">
      <view class="post-bar">
        <image :src="postData.authoravatar" class="post-avatar" />
        <text class="post-author">{{ postData.author }}</text>
      </view>
      <view class="post-bar">
        <image :src="postData.guideavatar" class="post-avatar" />
        <text class="post-author">{{ postData.guide }}</text>
      </view>
    </view>
    <!-- <image :src="postData.image" class="post-img" /> -->
    <view class="post-content">
      <text class="post-title">{{ postData.title }}</text>
      <view class="post-desc">{{ postData.briefdesc }}</view>
      <view v-if="isExpanded" class="post-info">
        <text>描述：{{ postData.desc }}</text>
        <text>位置名称: {{ postData.locationName }}</text>
        <text>详细地址: {{ postData.address }}</text>
        <text>时间: {{ postData.time }}</text>
      </view>
      <view class="expand-button" @click="toggleExpand">
        <text>{{ isExpanded ? '收起' : '展开' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ['postData'],
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
.post-item {
  background-color: #ffffff;
  border-radius: 12px;
  margin: 18px auto;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
}

.post-header {
  display: flex;
  align-items: center;
  padding: 12px 12px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eeeeee;
}

.post-bar {
  display: flex;
  margin: 10px;
}

.post-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.post-author {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.post-img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.post-content {
  padding: 16px;
  position: relative;
}

.post-title {
  font-size: 18px;
  color: #222222;
  font-weight: 600;
  margin-bottom: 8px;
}

.post-desc {
  color: #666666;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.post-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #999999;
  margin-bottom: 12px;
}

.post-info text {
  margin-bottom: 4px;
}

.expand-button {
  color: lightblue;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 16px;
}
</style>