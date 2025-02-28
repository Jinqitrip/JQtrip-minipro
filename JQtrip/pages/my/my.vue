<template>
	<wd-toast />
	<wd-button @click="showToast">toast</wd-button>
	<wd-cell title="标题文字" value="内容" />

	<wd-cell-group>
	  <wd-cell title="标题文字" value="内容" />
	  <wd-cell title="标题文字" label="描述信息" value="内容" />
	</wd-cell-group>
	<wd-cell-group>
	  <wd-cell title="标题文字" value="内容" icon="setting" />
	  <wd-cell title="标题文字" value="内容">
	    <template #icon>
	      <view class="cell-icon"></view>
	    </template>
	  </wd-cell>
	</wd-cell-group>
	
	<wd-cell-group title="交易管理" value="内容">
	  <wd-cell title="标题文字" value="内容" />
	  <wd-cell title="标题文字" label="描述信息" value="内容" />
	</wd-cell-group>
	
	<wd-cell-group title="交易管理" border>
	  <wd-cell title="标题文字" value="内容" />
	  <wd-cell :border="false" title="标题文字" label="这一个cell不想要边框" value="内容" />
	  <wd-cell title="标题文字" label="描述信息" value="内容"></wd-cell>
	</wd-cell-group>
	
	<wd-toast />
	<wd-cell title="标题文字" value="内容" clickable @click="showToast" />
	
	<wd-cell title="帮助与反馈" is-link to="/pages/index/index" />
	<wd-cell title="设置" value="内容" is-link @click="jump"></wd-cell>
	
	<wd-cell title="帮助与反馈" is-link></wd-cell>
</template>

<script lang="ts" setup>
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	
	function showToast() {
	  toast.show('点击')
	}
	
		
	function jump(){
		
		uni.navigateTo({
			url:'/pages/index/index'
			});
	}
</script>



<style scoped>
	page {
		font-weight: normal;
		/* 非nvue端使用此变量改变list线条颜色，nvue端请查看文档 */
		/* --fui-color-border:#B2B2B2; */
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fui-text__explain {
		font-size: 28rpx;
		color: #7F7F7F;
		flex-shrink: 0;
	}

	.fui-list__icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 24rpx;
	}
</style>