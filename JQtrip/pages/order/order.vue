<template>
  <page-wraper>
    <view>
      <demo-block title="基本使用" transparent>
        <wd-card>
          <view class="content">
            <image src="/static/logo.png" alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>AA专业导游</view>
              <view>地址：南二门</view>
              <view>金额：200</view>
              <view>时间：2025/3/1 14:00</view>
            </view>
          </view>
          <template #footer>
            <wd-tag type="primary" round>已下单</wd-tag>
          </template>
        </wd-card>

        <wd-card @click.native="jump_to_order">
          <view class="content" @click.native="jump_to_order">
            <image src="/static/logo.png" alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>AA专业导游</view>
              <view>地址：南二门</view>
              <view>金额：200</view>
              <view>时间：2025/3/1 14:00</view>
            </view>
          </view>
          <template #footer>
            <wd-tag type="warning" round>待选择</wd-tag>
          </template>
        </wd-card>

        <wd-card>
          <view class="content">
            <image src="/static/logo.png" alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>AA专业导游</view>
              <view>地址：南二门</view>
              <view>金额：200</view>
              <view>时间：2025/3/1 14:00</view>
            </view>
          </view>
          <template #footer>
            <wd-tag type="success" round>待开始</wd-tag>
          </template>
        </wd-card>

        <wd-card>
          <view class="content">
            <image src="/static/logo.png" alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>AA专业导游</view>
              <view>地址：南二门</view>
              <view>金额：200</view>
              <view>时间：2025/3/1 14:00</view>
            </view>
          </view>
          <template #footer>
            <wd-tag round>已完成</wd-tag>
          </template>
        </wd-card>
      </demo-block>

    </view>
  </page-wraper>
</template>

<script>
export default {
  data() {
    return {
      postList: [{
        "order_image": "/static/my.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 0
      },
      {
        "order_image": "/static/my.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 0
      },
      {
        "order_image": "/static/my.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 0
      },
      {
        "order_image": "/static/my.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 0
      },
      ]
    };
  },
  methods: {
    jump_to_order() {
      uni.navigateTo({
        url: "/pages/order/order-select"
      });
      console.log(321);
    }

  }
}
</script>

<style>
.content,
.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.content {
  justify-content: flex-start;
}

.title {
  justify-content: space-between;
}

.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
</style>