<template>
  <view class="post-item"
    :style="{ boxShadow: isHovering? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.08)' }"
    @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <view class="post-header">
      <image :src="postData.avatar" class="post-avatar" />
      <text class="post-author">{{ postData.author }}</text>
    </view>
    <image :src="postData.image" class="post-img" />
    <view class="post-content">
      <text class="post-title">{{ postData.title }}</text>
      <view class="post-desc">{{ postData.desc }}</view>
      <view class="post-info">
        <text>位置名称: {{ postData.locationName }}</text>
        <text>详细地址: {{ postData.address }}</text>
        <text>时间: {{ postData.time }}</text>
      </view>
      <text class="price">￥{{ postData.price }}</text>
      <button onclick="navTobuy()">Buying</button>
    </view>
  </view>
</template>

<script>
  export default {
    props: ['postData', 'isHovering']
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
    transition: all 0.3s ease;
  }

  .post-item:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }

  .post-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eeeeee;
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

  .price {
    color: #ff6600;
    font-size: 16px;
    font-weight: 600;
    text-align: right;
  }
</style>