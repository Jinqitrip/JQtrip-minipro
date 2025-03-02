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

    <view class="needpub">
      <button class="needbutton" onclick="needbtnact">
        start your trip!
      </button>
    </view>

    <!-- 帖子列表区域 -->
    <scroll-view class="post-list" scroll-y="true">
      <postitem v-for="(post, index) in filteredPostList" :key="index" :postData="post" :isHovering="isHovering[index]"
        @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)" />
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
            "desc": "本科生 校园地陪 图书馆宿舍无法进入",
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
            "desc": "本科生 校园地陪 图书馆宿舍无法进入",
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
            "desc": "本科生 校园地陪酒",
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
            "desc": "本科生 校园地陪酒",
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
            "desc": "本科生 校园地陪酒",
            "locationName": "中国地质大学",
            "address": "湖北省武汉市武昌区八一路299号",
            "time": "2小时"
          },
        ],
        isHovering: [],
        areaIndex: '0',
        areaList: ['全部', '武汉大学', '华中科技大学', '中国地质大学'],
      };
    },
    onLoad() {
      this.isHovering = new Array(this.postList.length).fill(false);
    },
    methods: {
      // getPostList() {
      //   uni.request({
      //     url: '',
      //     method: '',
      //     success: (res) => {
      //       if (res.statusCode === 200) {
      //         this.postList = res.data;
      //         this.isHovering = new Array(this.postList.length).fill(false);
      //       } else {
      //         uni.showToast({
      //           title: '获取数据失败',
      //           icon: 'none'
      //         });
      //       }
      //     },
      //     fail: (err) => {
      //       uni.showToast({
      //         title: '网络请求失败，请检查网络',
      //         icon: 'none'
      //       });
      //     }
      //   });
      // },
      handleMouseEnter(index) {
        this.isHovering[index] = true;
      },
      handleMouseLeave(index) {
        this.isHovering[index] = false;
      },
      onAreaChange(e) {
        this.areaIndex = e.detail.value;
      },
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
    display: flex;
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

  .needpub {
    margin-top: 65px;
  }

  .needbutton {
    background-color: #acaf00;
    border: none;
    color: white;
    width: 100%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px 9px #999;
  }

  .needbutton:hover {
    background-color: #af5700;
  }

  .needbutton:active {
    background-color: #af5700;
    box-shadow: 0px 5px #666;
    transform: translateY(4px);
  }
</style>