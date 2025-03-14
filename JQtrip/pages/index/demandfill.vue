<template>
  <view class="container">
    <!-- 智能日期卡片 -->
    <scroll-view scroll-x class="date-scroll">
      <view 
        v-for="(date, index) in dateList"
        :key="index"
        class="date-card"
        :class="{ active: activeDate === date.value }"
        @click="handleDateSelect(date.value)"
      >
        <text class="date-day">{{ date.day }}</text>
        <text class="date-week">{{ date.week }}</text>
        <wnt-icon 
          :name="getWeatherIcon(date.weather)" 
          size="sm"
          class="weather-icon"
        />
      </view>
    </scroll-view>

    <!-- 时段快捷入口 -->
    <view class="time-section">
      <t-button
        v-for="time in timeSlots"
        :key="time.value"
        :type="activeTime === time.value ? 'primary' : 'default'"
        size="small"
        @click="handleTimeSelect(time.value)"
      >
        {{ time.label }}
        <text v-if="time.recommend" class="recommend-star">⭐</text>
      </t-button>
    </view>

    <!-- 人数选择器 -->
    <view class="people-picker">
      <text class="title">参观人数</text>
      <view class="counter">
        <t-button 
          type="text" 
          icon="minus" 
          @click="handlePeopleChange(-1)"
          :disabled="peopleCount <= 1"
        />
        <text class="count">{{ peopleCount }}</text>
        <t-button 
          type="text" 
          icon="plus" 
          @click="handlePeopleChange(1)"
          :disabled="peopleCount >= maxPeople"
        />
      </view>
      <text class="remaining">剩余 {{ remaining }} 个名额</text>
      <text v-if="showGroupTip" class="group-tip">🎉 满10人可享团体优惠</text>
    </view>

    <!-- 智能备注系统 -->
    <view class="remark-section">
      <view class="quick-tags">
        <t-tag
          v-for="tag in remarkTags"
          :key="tag.value"
          :type="selectedTags.includes(tag.value) ? 'primary' : 'plain'"
          @click="toggleTag(tag.value)"
        >
          {{ tag.label }}
        </t-tag>
      </view>
      <view class="voice-input">
        <t-button type="text" @click="startVoiceInput">
          <wnt-icon name="voice" size="lg" />
          <text>语音备注</text>
        </t-button>
      </view>
    </view>
	
	  <TnNumberBox v-model="numberValue" width="300" height="80" font-size="40" />

	<wd-input-number v-model="value" @change="handleChange" />

  </view>
  
  
  <wd-datetime-picker type="time" v-model="time" label="时间选择" @confirm="handleConfirm" />
  
<DemoContainer title="配合popup使用">
      <view class="calendar-container">
        <view class="calendar-item">
          当前选中的日期:
          <text class="tn-gray_text">{{ popupCalendarValue }}</text>
        </view>
        <view class="calendar-item">
          <TnButton
            size="lg"
            bg-color="gradient-bg__cool-6"
            text-color="tn-white"
            @click="openCalendarPopup"
          >
            选择日期
          </TnButton>
        </view>
      </view>
    </DemoContainer>
	
	
  <TnPopup v-model="showCalendarPopup" open-direction="bottom">
    <view class="tn-pt">
      <TnCalendar v-model="popupCalendarValue" />
    </view>
    <view class="tn-mt tn-w-full tn-pb">
      <TnButton
        font-size="36"
        custom-class="popup-calendar-button"
        @click="closeCalendarPopup"
      >
        选择所选日期
      </TnButton>
    </view>
  </TnPopup>
</template>

<script setup>
import { ref, computed } from 'vue';
import TnDateTimePicker from '@/uni_modules/tuniaoui-vue3/components/date-time-picker/src/date-time-picker.vue'
import TnCalendar from '@/uni_modules/tuniaoui-vue3/components/calendar/src/calendar.vue'
import TnPopup from '@/uni_modules/tuniaoui-vue3/components/popup/src/popup.vue'
import TnButton from '@/uni_modules/tuniaoui-vue3/components/button/src/button.vue'

const showPopup = ref(false)
const selectDate = ref('')

// 在弹出框中选择日期
const popupCalendarValue = ref('')
const showCalendarPopup = ref(false)
const openCalendarPopup = () => {
  showCalendarPopup.value = true
}
const closeCalendarPopup = () => {
  showCalendarPopup.value = false
}


// 日期数据
const activeDate = ref('');
const dateList = ref([
  { value: '2023-10-01', day: '10/1', week: '周一', weather: 'sunny' },
  { value: '2023-10-02', day: '10/2', week: '周二', weather: 'cloudy' },
  { value: '2023-10-03', day: '10/3', week: '周三', weather: 'rain' }
]);

// 时段选择
const activeTime = ref('');
const timeSlots = ref([
  { value: '09:00', label: '09:00-11:00', recommend: true },
  { value: '14:00', label: '14:00-16:00', recommend: false }
]);

// 人数选择
const peopleCount = ref(1);
const maxPeople = 20;
const remaining = computed(() => maxPeople - peopleCount.value);
const showGroupTip = computed(() => peopleCount.value >= 10);

// 智能备注
const remarkTags = ref([
  { value: 'pickup', label: '🚗 需要接送' },
  { value: 'accessibility', label: '♿ 无障碍需求' },
  { value: 'photo', label: '📷 摄影服务' }
]);
const selectedTags = ref([]);

// 方法
const handleDateSelect = (date) => {
  activeDate.value = date;
};

const handleTimeSelect = (time) => {
  activeTime.value = time;
};

const handlePeopleChange = (delta) => {
  peopleCount.value = Math.max(1, Math.min(maxPeople, peopleCount.value + delta))
};

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  index === -1 ? selectedTags.value.push(tag) 
              : selectedTags.value.splice(index, 1);
};

const getWeatherIcon = (weather) => {
  const icons = { sunny: 'sun', cloudy: 'cloud', rain: 'rain' };
  return icons[weather] || 'sun';
};

const startVoiceInput = async () => {
  // 实现语音输入逻辑
};
</script>

<style lang="scss" scoped>
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

.remark-section {
  .quick-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 30rpx;
  }
  
  .voice-input {
    text-align: center;
    
    .t-button {
      color: #2196f3;
    }
  }
}

.popup-calendar-button {
  margin: 0rpx 30rpx;
  width: calc(100% - 60rpx) !important;
  padding: 20rpx 30rpx !important;
}
</style>