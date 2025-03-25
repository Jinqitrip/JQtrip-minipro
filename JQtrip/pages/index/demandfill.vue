<template>
  <view class="container">
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


    <wd-datetime-picker type="time" v-model="time" label="时间选择" @confirm="handleConfirm" />
    <wd-datetime-picker type="date" v-model="popupCalendarValue" label="日期选择" disabled
      @click.native="openCalendarPopup" />


    <view class="people-section">
      <!-- 人数选择器 -->
      <view class="people-picker">
        <text class="title">参观人数</text>
        <view class="counter">
          <wd-input-number class="custom-input-number" v-model="peopleCount" />
        </view>
      </view>

      <!-- 智能备注系统 -->
      <view class="remark-section">
        <text class="remark-title">特殊需求：</text>
        <view class="quick-tags">
          <t-tag v-for="tag in remarkTags" :key="tag.value"
            :type="selectedTags.includes(tag.value) ? 'primary' : 'plain'" @click="toggleTag(tag.value)"
            class="remark-tag">
            {{ tag.label }}
          </t-tag>
        </view>
      </view>
    </view>

    <TnNumberBox v-model="numberValue" width="300" height="80" font-size="40" />

    <wd-textarea v-model="note" placeholder="请填写备注" />

    <TnButton font-size="36" custom-class="popup-calendar-button" @click="submit">
      提交
    </TnButton>
  </view>

  <TnPopup v-model="showCalendarPopup" open-direction="bottom">
    <view class="tn-pt">
      <TnCalendar v-model="popupCalendarValue" />
    </view>
    <view class="tn-mt tn-w-full tn-pb">
      <TnButton font-size="36" custom-class="popup-calendar-button" @click="closeCalendarPopup">
        选择所选日期
      </TnButton>
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
        { value: 'photo', label: '📷 摄影服务' }
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
    submit() {
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

      uni.request({
        url: baseUrl + "/v1/orders", 
        method: 'POST',
        data: {
          "openID": this.$userData.openId,
          data
        },
        success: (res) => {
          console.log(res.data);
          uni.showToast({
            title: '提交成功',
            icon: 'none'
          });
          uni.navigateBack();

        },
        fail: () => {
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


<style lang="scss" scoped>
.summary-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
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

.container {
  padding: 20rpx;
}

.date-scroll {
  white-space: nowrap;
  margin-bottom: 30rpx;

  .date-card {
    display: inline-block;
    width: 200rpx;
    padding: 20rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
    background: #f5f5f5;
    text-align: center;

    &.active {
      background: #e3f2fd;
      border: 1px solid #2196f3;
    }

    .date-day {
      display: block;
      font-size: 36rpx;
      font-weight: bold;
    }

    .weather-icon {
      margin-top: 10rpx;
    }
  }
}

.time-section {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;

  .recommend-star {
    margin-left: 10rpx;
  }
}

.people-picker {
  background: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 30rpx;

  .title {
    display: block;
    margin-bottom: 20rpx;
    font-size: 32rpx;
  }

  .counter {
    display: flex;
    align-items: center;
    gap: 40rpx;
    margin-bottom: 20rpx;

    .count {
      font-size: 48rpx;
      font-weight: bold;
    }
  }

  .group-tip {
    color: #ff9800;
    margin-top: 15rpx;
    display: block;
  }
}

.people-section {
  display: flex;
  gap: 40rpx;
  align-items: flex-start;
  margin-bottom: 30rpx;

  .people-picker {
    flex: 1;
    background: #fff;
    padding: 30rpx;
    border-radius: 16rpx;
  }

  .remark-section {
    flex: 1;
    background: #fff;
    padding: 30rpx;
    border-radius: 16rpx;

    .remark-title {
      display: block;
      color: #666;
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }

    .quick-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
    }

    .remark-tag {
      padding: 10rpx 14rpx;
      font-size: 32rpx;
      border-radius: 24rpx !important;
      line-height: 1.5;
      transition: all 0.3s ease;
      min-width: 160rpx;
      text-align: center;
      border: 1px solid currentColor !important;

      // 选中状态
      &[type="primary"] {
        border-color: var(--tuniaoui-primary-color, #2196f3) !important;
      }

      // 未选中状态
      &[type="plain"] {
        border-color: #ddd !important;
      }
    }
  }
}

.popup-calendar-button {
  margin: 0rpx 30rpx;
  width: calc(100% - 60rpx) !important;
  padding: 20rpx 30rpx !important;
}

.people-picker {
  /* 原有样式保持不变 */

  /* 调整数字输入框容器 */
  :deep(.wd-input-number) {
    border-radius: 16rpx;
    background: #f8f9fa;
  }

  /* 增大按钮尺寸 */
  :deep(.wd-input-number__button) {
    width: 80rpx !important;
    height: 80rpx !important;
    font-size: 50rpx !important;

    &::after {
      border-radius: 12rpx;
    }
  }

  /* 输入区域样式 */
  :deep(.wd-input-number__input) {
    font-size: 44rpx !important;
    color: #2c3e50;
    min-width: 120rpx;
  }

  /* 悬停效果 */
  :deep(.wd-input-number__button--plus):active,
  :deep(.wd-input-number__button--minus):active {
    background: #e0e0e0;
  }

  /* 禁用状态样式 */
  :deep(.is-disabled) {
    opacity: 0.5;
    background: #f5f5f5 !important;
  }

}
</style>