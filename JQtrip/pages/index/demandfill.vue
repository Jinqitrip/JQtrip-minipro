<template>
	<view class="demand-container">
		<!-- 页面标题 -->
		<view class="page-header">
			<image class="header-bg" src="http://image.jinqitrip.com.cn/demand-header.jpg" mode="aspectFill"></image>
			<view class="header-content">
				<text class="title">创建个性化游览需求</text>
				<text class="subtitle">定制您的专属校园体验</text>
			</view>
		</view>

		<!-- 信息总览卡片 -->
		<view class="summary-card">
			<view class="summary-left">
				<view class="summary-item">
					<text class="label">日期：</text>
					<text class="value">{{ popupCalendarValue }}</text>
				</view>
				<view class="summary-item">
					<text class="label">时间：</text>
					<text class="value">{{ time }}</text>
				</view>
				<view class="summary-item">
					<text class="label">人数：</text>
					<text class="value">{{ peopleCount }}人</text>
				</view>
			</view>
			<view class="summary-right" v-if="selectedTags.length > 0">
				<text class="tag" v-for="tag in selectedTagsLabels" :key="tag">{{ tag }}</text>
			</view>
			<view v-else class="placeholder">未选择特殊需求</view>
		</view>

		<!-- 选择区域 -->
		<view class="selection-container">
			<!-- 日期和时间选择 -->
			<view class="selection-card">
				<view class="selection-header">
					<text class="selection-title">选择日期和时间</text>
				</view>
				<view class="selection-content">
					<view class="input-item" @click="openCalendarPopup">
						<view class="input-icon">
							<text class="iconfont icon-calendar"></text>
						</view>
						<view class="input-field">
							<text class="input-label">日期</text>
							<text class="input-value">{{ popupCalendarValue }}</text>
						</view>
						<view class="input-arrow">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					
					<view class="input-item">
						<view class="input-icon">
							<text class="iconfont icon-time"></text>
						</view>
						<view class="input-field">
							<text class="input-label">时间</text>
							<wd-datetime-picker type="time" v-model="time" @confirm="handleConfirm" />
						</view>
					</view>
				</view>
			</view>
			
			<!-- 参观人数 -->
			<view class="selection-card">
				<view class="selection-header">
					<text class="selection-title">参观人数</text>
				</view>
				<view class="selection-content people-counter">
					<text class="people-label">共有多少人参加？</text>
					<wd-input-number class="custom-input-number" v-model="peopleCount" min="1" max="20" />
				</view>
			</view>
			
			<!-- 特殊需求 -->
			<view class="selection-card">
				<view class="selection-header">
					<text class="selection-title">特殊需求</text>
				</view>
				<view class="selection-content">
					<view class="tags-grid">
						<view v-for="tag in remarkTags" :key="tag.value" 
							:class="['tag-item', selectedTags.includes(tag.value) ? 'selected' : '']"
							@click="toggleTag(tag.value)">
							{{ tag.label }}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 备注信息 -->
			<view class="selection-card">
				<view class="selection-header">
					<text class="selection-title">备注信息</text>
				</view>
				<view class="selection-content">
					<wd-textarea v-model="note" placeholder="请填写其他需要说明的事项..." class="custom-textarea" />
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="submit-container">
			<button class="submit-button" @click="submit">提交需求</button>
		</view>
	</view>

	<!-- 日历弹窗 -->
	<TnPopup v-model="showCalendarPopup" open-direction="bottom">
		<view class="calendar-popup">
			<view class="calendar-header">
				<text class="calendar-title">选择日期</text>
				<text class="calendar-close" @click="closeCalendarPopup">×</text>
			</view>
			<TnCalendar v-model="popupCalendarValue" />
			<view class="calendar-footer">
				<button class="calendar-confirm" @click="closeCalendarPopup">确认</button>
			</view>
		</view>
	</TnPopup>
</template>

<script>
import TnDateTimePicker from '@/uni_modules/tuniaoui-vue3/components/date-time-picker/src/date-time-picker.vue'
import TnCalendar from '@/uni_modules/tuniaoui-vue3/components/calendar/src/calendar.vue'
import TnPopup from '@/uni_modules/tuniaoui-vue3/components/popup/src/popup.vue'
import TnButton from '@/uni_modules/tuniaoui-vue3/components/button/src/button.vue'

import { baseUrl } from '@/config';

export default {
	components: {
		TnDateTimePicker,
		TnCalendar,
		TnPopup,
		TnButton
	},
	data() {
		const now = new Date()
		const year = now.getFullYear()
		const month = ('0' + (now.getMonth() + 1)).slice(-2)
		const day = ('0' + now.getDate()).slice(-2)

		return {
			showPopup: false,
			selectDate: '',
			popupCalendarValue: year + "/" + month + "/" + day,
			showCalendarPopup: false,
			time: "09:00",
			peopleCount: 1,
			maxPeople: 20,
			remarkTags: [
				{ value: 'pickup', label: '🚗 需要接送' },
				{ value: 'accessibility', label: '♿ 无障碍需求' },
				{ value: 'photo', label: '📷 摄影服务' },
				{ value: 'foreign', label: '🌏 外语服务' },
				{ value: 'family', label: '👪 亲子友好' },
				{ value: 'academic', label: '🎓 学术交流' }
			],
			selectedTags: [],
			note: ""
		}
	},
	computed: {
		selectedTagsLabels() {
			return this.remarkTags
				.filter(tag => this.selectedTags.includes(tag.value))
				.map(tag => tag.label)
		}
	},
	methods: {
		openCalendarPopup() {
			this.showCalendarPopup = true
		},
		closeCalendarPopup() {
			this.showCalendarPopup = false
		},
		toggleTag(tag) {
			const index = this.selectedTags.indexOf(tag)
			index === -1
				? this.selectedTags.push(tag)
				: this.selectedTags.splice(index, 1)
		},
		handleConfirm() {
			console.log('时间确认: ' + this.time);
		},
		submit() {
			// 表单验证
			if (!this.popupCalendarValue) {
				uni.showToast({
					title: '请选择日期',
					icon: 'none'
				});
				return;
			}
			
			// 验证用户登录状态
			if (!this.$userData.openId) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			
			const data = {
				date: this.popupCalendarValue,
				time: this.time,
				people: this.peopleCount,
				special_tags: this.selectedTagsLabels,
				note: this.note
			}

			console.log({
				openID: this.$userData.openId,
				data
			})

			uni.showLoading({
				title: '提交中...'
			});

			uni.request({
				url: baseUrl + "/v1/orders",
				method: 'POST',
				data: {
					"openID": this.$userData.openId,
					data
				},
				success: (res) => {
					uni.hideLoading();
					console.log(res.data);
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
					
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				},
				fail: () => {
					uni.hideLoading();
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				}
			});
		}
	}
}
</script>

<style lang="scss">
.demand-container {
	min-height: 100vh;
	background-color: #f5f7fa;
	padding-bottom: 120rpx;
}

.page-header {
	position: relative;
	height: 260rpx;
	overflow: hidden;
	border-bottom-left-radius: 40rpx;
	border-bottom-right-radius: 40rpx;
	margin-bottom: 30rpx;
	
	.header-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	
	.header-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		padding: 0 40rpx;
		background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3));
		
		.title {
			font-size: 40rpx;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 10rpx;
		}
		
		.subtitle {
			font-size: 28rpx;
			color: rgba(255,255,255,0.9);
		}
	}
}

.summary-card {
	background: #fff;
	border-radius: 24rpx;
	padding: 30rpx;
	margin: 0 30rpx 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
	display: flex;
	gap: 30rpx;
	min-height: 160rpx;

	.summary-left {
		flex: 1;

		.summary-item {
			margin-bottom: 16rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.label {
				color: #666;
				font-size: 28rpx;
			}

			.value {
				color: #333;
				font-size: 32rpx;
				font-weight: 500;
			}
		}
	}

	.summary-right {
		width: 240rpx;
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
		align-content: flex-start;

		.tag {
			background: #e8f4ff;
			color: #2196f3;
			padding: 8rpx 16rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
		}
	}

	.placeholder {
		flex: 1;
		text-align: center;
		color: #999;
		font-size: 28rpx;
		line-height: 160rpx;
	}
}

.selection-container {
	padding: 0 30rpx;
}

.selection-card {
	background: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	margin-bottom: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
	
	.selection-header {
		padding: 25rpx 30rpx;
		border-bottom: 1px solid #f0f0f0;
		
		.selection-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}
	}
	
	.selection-content {
		padding: 30rpx;
	}
}

.input-item {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1px solid #f5f5f5;
	
	&:last-child {
		border-bottom: none;
	}
	
	.input-icon {
		width: 60rpx;
		color: #2196f3;
		font-size: 36rpx;
		text-align: center;
	}
	
	.input-field {
		flex: 1;
		
		.input-label {
			font-size: 28rpx;
			color: #666;
			margin-bottom: 10rpx;
			display: block;
		}
		
		.input-value {
			font-size: 32rpx;
			color: #333;
		}
	}
	
	.input-arrow {
		width: 60rpx;
		color: #ccc;
		font-size: 24rpx;
		text-align: center;
	}
}

.people-counter {
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.people-label {
		font-size: 30rpx;
		color: #333;
	}
	
	.custom-input-number {
		width: 240rpx;
	}
}

.tags-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	
	.tag-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		border-radius: 12rpx;
		font-size: 28rpx;
		background-color: #f5f7fa;
		color: #666;
		transition: all 0.3s;
		
		&.selected {
			background-color: #e8f4ff;
			color: #2196f3;
			font-weight: 500;
		}
	}
}

.custom-textarea {
	border: 1px solid #f0f0f0;
	border-radius: 12rpx;
	background-color: #f9f9f9;
	padding: 20rpx;
	min-height: 180rpx;
}

.submit-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 30rpx;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	background-color: #fff;
	box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
	z-index: 100;
	
	.submit-button {
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-weight: 500;
		background-color: #2196f3;
		color: #fff;
	}
}

.calendar-popup {
	background-color: #fff;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	overflow: hidden;
	
	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 30rpx;
		border-bottom: 1px solid #f0f0f0;
		
		.calendar-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}
		
		.calendar-close {
			font-size: 40rpx;
			color: #999;
			padding: 0 20rpx;
		}
	}
	
	.calendar-footer {
		padding: 20rpx 30rpx;
		
		.calendar-confirm {
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: 500;
			background-color: #2196f3;
			color: #fff;
		}
	}
}
</style>