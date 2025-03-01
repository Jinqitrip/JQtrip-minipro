<template>
  <page-wraper>
    <view>
        
        <wd-card title="某导游">
          <view class="content">
            <image
              src="/static/my_active.png"
              alt="joy"
              style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view>基本信息</view>
			  <view>一句话简介</view>
              <wd-rate v-model="value" readonly />

            </view>
          </view>
          <template #footer>
            <wd-button size="small" plain>查看详情</wd-button>
          </template>
        </wd-card>
		
		<wd-card title="某导游">
		  <view class="content">
		    <image
		      src="/static/my_active.png"
		      alt="joy"
		      style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px"
		    />
		    <view>
		      <view>基本信息</view>
			  <view>一句话简介</view>
		      <wd-rate v-model="value" readonly />
		
		    </view>
		  </view>
		  <template #footer>
		    <wd-button size="small" plain>查看详情</wd-button>
		  </template>
		</wd-card>
		
		<wd-card title="某导游">
		  <view class="content">
		    <image
		      src="/static/my_active.png"
		      alt="joy"
		      style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px"
		    />
		    <view>
		      <view>基本信息</view>
			  <view>一句话简介</view>
		      <wd-rate v-model="value" readonly />
		
		    </view>
		  </view>
		  <template #footer>
		    <wd-button size="small" plain>查看详情</wd-button>
		  </template>
		</wd-card>
      
      
	</view>
      
  </page-wraper>
</template>
<script lang="ts" setup>
	import { ref } from 'vue'

	const value = ref<number>(5)
	
	function changeValue({ value }) {
	  console.log(value)
	}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .title-tip {
    color: rgba(232, 230, 227, 0.8);
  }

  
}

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