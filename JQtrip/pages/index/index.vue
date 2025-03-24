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
        <image class="search-icon" src="/static/logo.png" mode="aspectFit"></image>
      </view>

      <view class="search-input-box">
        <input v-model="searchText" class="search-input" placeholder="搜索..." />
      </view>

      <view class="logobox">
        <image class="search-icon" src="/static/search_icon.png" mode="aspectFit"></image>
      </view>
    </view>

  <!-- 添加需求模块 -->
  <view class="demand-card" @click="handleAddDemand">
    <view class="demand-content">
      <image class="add-icon" src="/static/plus-circle-filled.svg"></image>
      <text class="demand-title">创建个性游览需求</text>
      <text class="demand-subtitle">点击定制专属旅程体验</text>
    </view>
    <image class="decorative-pattern" src="/static/wave-pattern.png"></image>
  </view>

  <!-- 登录提示模态框 -->
  <view v-if="showLoginModal" class="login-modal-mask">
    <view class="login-modal">
      <image class="modal-icon" src="/static/login-required.png"></image>
      <text class="modal-title">需要登录</text>
      <text class="modal-desc">登录后可以创建和查看个性化需求</text>
      <view class="button-group">
        <view class="modal-btn cancel-btn" @click="showLoginModal = false">稍后再说</view>
        <view class="modal-btn confirm-btn" @click="gotoLogin">立即登录</view>
      </view>
    </view>
  </view>

    <!-- 帖子列表区域 -->
    <scroll-view class="post-list" scroll-y="true">
      <postitem v-for="(post, index) in filteredPostList" :key="index" :postData="post" />
    </scroll-view>
  </view>
</template>

<script>
  import postitem from './postitem.vue';
  export default {
    components: {
      postitem
    },
    data() {
      return {
        searchText: '',
        postList: [{
            "authoravatar": "/static/my.png",
            "author": "邹某",
            "guideavatar": "/static/my.png",
            "guide": "哈哈哈哈哈哈哈",
            "title": "游园武大",
            "briefdesc": "本科生 校园地陪 图书馆宿舍无法进入",
            "desc": "11111111111111111111111111111111",
            "locationName": "武汉大学",
            "address": "湖北省武汉市武昌区八一路299号",
            "time": "2小时"
          },
          {
            "authoravatar": "/static/my.png",
            "author": "邹某",
            "guideavatar": "/static/my.png",
            "guide": "嘻嘻嘻嘻",
            "title": "游园HUST",
            "briefdesc": "本科生 校园地陪 图书馆宿舍无法进入",
            "desc": "11111111111111111111111111111111",
            "locationName": "华中科技大学",
            "address": "湖北省武汉市武昌区八一路299号",
            "time": "2小时"
          },
          {
            "authoravatar": "/static/my.png",
            "author": "邹某",
            "guideavatar": "/static/my.png",
            "guide": "徐云杰",
            "title": "地大",
            "briefdesc": "本科生 校园地陪酒",
            "desc": "11111111111111111111111111111111",
            "locationName": "中国地质大学",
            "address": "湖北省武汉市武昌区八一路299号",
            "time": "2小时"
          },
          {
            "authoravatar": "/static/my.png",
            "author": "邹某",
            "guideavatar": "/static/my.png",
            "guide": "徐云杰",
            "title": "地大",
            "briefdesc": "本科生 校园地陪酒",
            "desc": "11111111111111111111111111111111",
            "locationName": "中国地质大学",
            "address": "湖北省武汉市武昌区八一路299号",
            "time": "2小时"
          },
          {
            "authoravatar": "/static/my.png",
            "author": "邹某",
            "guideavatar": "/static/my.png",
            "guide": "徐云杰",
            "title": "地大",
            "briefdesc": "本科生 校园地陪酒",
            "desc": "11111111111111111111111111111111",
            "locationName": "中国地质大学",
            "address": "湖北省武汉市武昌区八一路299号",
            "time": "2小时"
          }
        ],
        areaIndex: '0',
        areaList: ['全部', '武汉大学', '华中科技大学', '中国地质大学'],
        currentPost: null,
        showDetail: false,
		showLoginModal: false
      };
    },
    methods: {
      onAreaChange(e) {
        this.areaIndex = e.detail.value;
      },
      gotodemand() {
        uni.navigateTo({
          url: '/pages/index/demandfill'
        });
      },
    handleAddDemand() {
      if (this.$userData.openId=="") {
        this.showLoginModal = true;
        return;
      }
      uni.navigateTo({
        url: '/pages/index/demandfill'
      });
    },
    gotoLogin() {
      uni.navigateTo({ url: '/pages/my/login_wx' });
      this.showLoginModal = false;
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

  .needframe {
    height: 240px;
    margin-top: 70px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
    background: #3A92AF;
    background: linear-gradient(to top right, #00ffff 0%, #ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#3A92AF', endColorstr='#5CA05A', GradientType=1);
    color: #fff;
    font-family: 'Open Sans', Helvetica, sans-serif;
  }

  .center {
    height: 200px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    background: #fff;
    box-shadow: 8px 10px 15px 0 rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .title {
    font-size: 16px;
    color: #676767;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #D8D8D8;
    text-align: center;
  }

  .addzone {
    /* z-index: 1; */
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    border: 1px dashed #A4A4A4;
    border-radius: 3px;
    text-align: center;
  }


  .plusicon {
    width: 98px;
    height: 98px;
    /* margin: 15px; */
  }

  .needbtn {
    margin-top: 5px;
    width: 140px;
    height: 40px;
    background: #ffff7f;
    border-radius: 3px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    margin: auto;
  }

  .needbtn:hover {
    box-shadow: 0 2px 0 0 #498C25, 0 2px 10px 0 #6ECE3B;
  }

  .post-list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  
/* 添加需求卡片样式 */
.demand-card {
  position: relative;
  height: 180rpx;
  margin: 30rpx;
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
  filter: drop-shadow(0 4rpx 8rpx rgba(0,0,0,0.1));
}

.demand-title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.demand-subtitle {
  font-size: 26rpx;
  color: rgba(255,255,255,0.9);
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
  background: rgba(0,0,0,0.5);
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
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
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
</style>