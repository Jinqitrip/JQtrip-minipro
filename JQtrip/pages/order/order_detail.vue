<template>
  <TnSteps v-model="currentStep" mode="dotIcon">
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

const currentStep = ref(2)

// 步进条数据
const stepsData = [
  {
    title: '第一步',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
  {
    title: '第二步',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
  {
    title: '第三步',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
  {
    title: '第四步',
    icon: 'success-circle',
    activeIcon: 'success-circle-fill',
  },
]
</script>

<style>
  
</style>