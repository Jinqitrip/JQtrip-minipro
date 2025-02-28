<template>
  <wd-button>主要按钮</wd-button>
  <wd-button type="success">成功按钮</wd-button>
  <wd-button type="info">信息按钮</wd-button>
  <wd-button type="warning">警告按钮</wd-button>
  <wd-button type="error">危险按钮</wd-button>
  <wd-icon name="add-circle" />
</template>

<script>
export default {
  data() {
    return {
      orderItems: [
        { icon: "payment", text: "待付款", type: 1, count: 2 },
        { icon: "deliver", text: "待发货", type: 2, count: 1 },
        { icon: "receive", text: "待收货", type: 3 },
        { icon: "comment", text: "待评价", type: 4 }
      ]
    }
  },
  methods: {
    login() {
      // 登录逻辑
    },
    toOrder(type) {
      uni.navigateTo({
        url: `/pages/order/order?type=${type}`
      })
    },
    navTo(page) {
      uni.navigateTo({
        url: `/pages/${page}/${page}`
      })
    }
  }
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