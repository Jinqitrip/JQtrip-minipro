<template>
  <view class="post-item"
    :style="{ boxShadow: isHovering? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.08)' }">
    <view class="post-header">
      <image :src="postData.avatar" class="post-avatar"></image>
      <text class="post-author">{{ postData.author }}</text>
    </view>
    <image :src="postData.image" class="post-img"></image>
    <view class="post-content">
      <text class="post-title">{{ postData.title }}</text>
      <text class="post-desc">{{ postData.desc }}</text>
      <view class="post-info">
        <text>位置名称:{{ postData.locationName }}</text>
        <text>详细地址:{{ postData.address }}</text>
        <text>时间:{{ postData.time }}</text>
      </view>
      <text class="price">￥{{ postData.price }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: ['postData', 'isHovering']
  };
</script>

<style>
  .post-item {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .post-header {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .post-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .post-author {
    font-size: 14px;
    color: #333;
  }

  .post-img {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
  }

  .post-content {
    padding: 10px;
  }

  .post-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .post-desc {
    color: #666;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .post-info {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
  }

  .price {
    color: #007aff;
    font-size: 14px;
    font-weight: bold;
    text-align: right;
  }
</style>