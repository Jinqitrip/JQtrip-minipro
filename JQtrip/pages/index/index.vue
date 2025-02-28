<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-container">
      <view class="logobox">
        <image class="search-icon" src="/static/logo.png" mode="aspectFit"></image>
      </view>
      <view class="search-input-box">
        <input v-model="searchText" class="search-input" placeholder="搜索..." />
      </view>
      <view class="logobox">
        <image class="search-icon" src="/static/search_icon.png" mode="aspectFit"></image>
      </view>
    </view>
    <!-- 帖子列表区域 -->
    <scroll-view class="post-list" scroll-y="true">
      <PostItem v-for="(post, index) in postList" :key="index" :postData="post" :isHovering="isHovering[index]"
        @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)" />
    </scroll-view>
  </view>
</template>

<script>
  import postitem from './postitem.vue';
  export default {
    data() {
      return {
        searchText: '',
        postList: [],
        isHovering: []
      };
    },
    onLoad() {
      this.getPostList();
    },
    methods: {
      getPostList() {
        uni.request({
          url: '',
          method: '',
          success: (res) => {
            if (res.statusCode === 200) {
              this.postList = res.data;
              this.isHovering = new Array(this.postList.length).fill(false);
            } else {
              uni.showToast({
                title: '获取数据失败',
                icon: 'none'
              });
            }
          },
          fail: (err) => {
            uni.showToast({
              title: '网络请求失败，请检查网络',
              icon: 'none'
            });
          }
        });
      },
      handleMouseEnter(index) {
        this.isHovering[index] = true;
      },
      handleMouseLeave(index) {
        this.isHovering[index] = false;
      }
    }
  };
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
    flex-direction: row;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .logobox {
    display: flex;
    width: 10%;
  }

  .search-input-box {
    /* flex: 1; */
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
    height: 35px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  .search-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }

  .extra-icons {
    margin-left: 10px;
  }

  .camera-icon {
    width: 20px;
    height: 20px;
  }

  .post-list {
    flex: 1;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 0 15px;
  }

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