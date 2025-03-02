<template>
  <page-wraper>
    <view>
      <demo-block title="基本使用" transparent>
        <wd-card v-for="order in order_list" @click.native="jump_to_order(order)">
          <view class="content">
            <image :src="order.order_image" alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>AA专业导游</view>
              <view>地址：{{order.location}}</view>
              <view>金额：{{order.price}}</view>
              <view>时间：{{order.time}}</view>
            </view>
          </view>
          <template #footer>
            <wd-tag v-if="order.step==0" type="primary" round>已下单</wd-tag>
			<wd-tag v-if="order.step==1" type="warning" round>待选择</wd-tag>
			<wd-tag v-if="order.step==2" type="success" round>待开始</wd-tag>
			<wd-tag v-if="order.step==3" round>已完成</wd-tag>
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
      order_list: [{
        "order_image": "/static/logo.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 0
      },
      {
        "order_image": "/static/logo.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 1
      },
      {
        "order_image": "/static/logo.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 2
      },
      {
        "order_image": "/static/logo.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 3
      },
      ]
    };
  },
  methods: {
        jump_to_order(order){
		var mynavData = JSON.stringify(order);
  		  uni.navigateTo({
  		  	url:"/pages/order/order_detail?index=" + mynavData
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