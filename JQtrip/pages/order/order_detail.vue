<template>
	<wd-card>
	  <view class="content" @click.native="jump_to_order">
	    <image :src="order.order_image" alt="joy"
	      style="width: 100px; height: 100px; border-radius: 4px; margin-right: 12px" />

	      <a style="color: black">AA专业导游</a>

	  </view>
	</wd-card>
  <TnSteps v-model="currentStep" mode="dotIcon" style="width: 85%;margin: auto">
    <TnStepsItem
      v-for="(item, index) in stepsData"
      :key="index"
      :title="item.title"
      :icon="item.icon"
      :active-icon="item.activeIcon"
    />
  </TnSteps>
</template>


<script lang="ts" setup>
import TnSteps from '@/uni_modules/tuniaoui-vue3/components/steps/src/steps.vue'
import TnStepsItem from '@/uni_modules/tuniaoui-vue3/components/steps/src/steps-item.vue'
import { ref } from 'vue'


const order = {
        "order_image": "/static/logo.png",
        "location": "南二门",
        "price": "200",
        "time": "2025/3/1 14:00",
        "step": 1
      }
	  
const currentStep = order.step

// 步进条数据
const stepsData = [
  {
    title: '已下单',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
  {
    title: '待选择',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
  {
    title: '待开始',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
  {
    title: '已完成',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
]
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
	
	.custom-main {
	  color: rgba(0, 0, 0, 0.85);
	  font-size: 16px;
	}
	
	.custom-sub {
	  color: rgba(0, 0, 0, 0.25);
	  font-size: 12px;
	}
  
</style>