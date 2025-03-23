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

    <!-- 需求跳转 -->
    <view class="needframe">
      <view class="center">
        <view class="title">添加你的游览需求</view>
        <view class="addzone">
          <img @click="gotodemand" src="/static/plusicon.png" class="plusicon">
        </view>
      </view>
    </view>

    <!-- 帖子列表区域 -->
    <view class="post-list-container">
      <view class="post-item-small" v-for="(post, index) in filteredPostList" :key="index"
        @click="goToPostDetail(post)">
        <!-- 确保图片完整显示 -->
        <image :src="post.images && post.images[0] || '/static/order.png'" class="post-small-img" mode="aspectFit">
        </image>
        <view class="post-abb-desc">
          <text class="post-small-title">{{ post.title }}</text>
          <text class="post-small-author">{{ post.author }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchText: '',
        postList: [{
            id: 4,
            authoravatar: "/static/my.png",
            author: "Harry",
            guideavatar: "/static/my.png",
            guide: "Andy",
            title: "游园武大",
            briefdesc: "本科生 校园地陪 图书馆宿舍无法进入",
            desc: "111111111111111111111111113zhehshdifhsfjdjkdjksjksjfisadjsaifjsafjsdfjfhsdfhfoiaw",
            locationName: "武汉大学",
            address: "湖北省武汉市武昌区八一路299号",
            time: "2小时",
            images: ["/static/my.png", "/static/order.png", "/static/order.png"]
          },
          {
            id: 3,
            authoravatar: "/static/my.png",
            author: "Harry",
            guideavatar: "/static/my.png",
            guide: "Andy",
            title: "游园武大",
            briefdesc: "本科生 校园地陪 图书馆宿舍无法进入",
            desc: "111111111111111111111111113zhehshdifhsfjdjkdjksjksjfisadjsaifjsafjsdfjfhsdfhfoiaw",
            locationName: "武汉大学",
            address: "湖北省武汉市武昌区八一路299号",
            time: "2小时",
            images: ["/static/my.png", "/static/order.png", "/static/order.png"]
          }, {
            id: 1,
            authoravatar: "/static/my.png",
            author: "Harry",
            guideavatar: "/static/my.png",
            guide: "Andy",
            title: "游园武大",
            briefdesc: "本科生 校园地陪 图书馆宿舍无法进入",
            desc: "111111111111111111111111113zhehshdifhsfjdjkdjksjksjfisadjsaifjsafjsdfjfhsdfhfoiaw",
            locationName: "武汉大学",
            address: "湖北省武汉市武昌区八一路299号",
            time: "2小时",
            images: ["/static/my.png", "/static/order.png", "/static/order.png"]
          },
          {
            id: 2,
            authoravatar: "/static/my.png",
            author: "Harry",
            guideavatar: "/static/my.png",
            guide: "Cindy",
            title: "游园武大",
            briefdesc: "本科生 校园地陪 图书馆宿舍无法进入",
            desc: "11111111111111111111111111111111",
            locationName: "武汉大学",
            address: "湖北省武汉市武昌区八一路299号",
            time: "2小时",
            images: ["/static/home.png"]
          },
        ],
        areaIndex: '0',
        areaList: ['全部', '武汉大学', '华中科技大学', '中国地质大学'],
        currentPost: null,
        showDetail: false
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
      goToPostDetail(post) {
        uni.navigateTo({
          url: `/pages/index/postdetail?postData=${JSON.stringify(post)}`
        });
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
  }

  .post-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
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