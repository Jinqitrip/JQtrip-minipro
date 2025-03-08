<template>

    <wd-card>
        <view class="content" @click.native="jump_to_order">
            <image :src="order.order_image" alt="joy"
                style="width: 100px; height: 100px; border-radius: 4px; margin-right: 12px" />

            <view class="info-container">
                <text class="title">{{ order.title }}</text>

                <view class="detail-row">
                    <view class="detail-item">
                        <tn-icon name="location" size="16" color="#666"></tn-icon>
                        <text class="detail-text">{{ order.location }}</text>
                    </view>
                    <view class="detail-item">
                        <tn-icon name="money" size="16" color="#666"></tn-icon>
                        <text class="detail-text">¥{{ order.price }}</text>
                    </view>
                </view>

                <view class="detail-row">
                    <view class="detail-item">
                        <tn-icon name="time" size="16" color="#666"></tn-icon>
                        <text class="detail-text">{{ order.time }}</text>
                    </view>
                </view>
            </view>
        </view>
    </wd-card>

    <TnSteps v-model="currentStep" mode="dotIcon" style="width: 85%;margin: auto" disabled>
        <TnStepsItem v-for="(item, index) in stepsData" :key="index" :title="item.title" :icon="item.icon"
            :active-icon="item.activeIcon" />
    </TnSteps>

    <view class="content-box">


        <view class="info-grid">
            <view class="info-item">
                <text class="info-label">服务时长</text>
                <text class="info-value">3小时</text>
            </view>
            <view class="info-item">
                <text class="info-label">服务人数</text>
                <text class="info-value">1-5人</text>
            </view>
            <view class="info-item">
                <text class="info-label">联系方式</text>
                <text class="info-value">138****5678</text>
            </view>
        </view>

        <text class="detail-content">
            {{ order.detail || '暂无详细信息' }}
        </text>

    </view>

    <wd-button block plain v-if="order.step == 1" @click="jump_to_select">选择导游</wd-button>

</template>


<script lang="ts">
import { defineComponent } from 'vue'
import TnSteps from '@/uni_modules/tuniaoui-vue3/components/steps/src/steps.vue'
import TnStepsItem from '@/uni_modules/tuniaoui-vue3/components/steps/src/steps-item.vue'

export default defineComponent({
    components: {
        TnSteps,
        TnStepsItem
    },
    data() {
        return {
            order: {
                title: "AA专业导游",
                order_image: "/static/logo.png",
                location: "南二门",
                price: "200",
                time: "2025/3/1 14:00",
                step: 1,
                detail: "专业导游服务包含：\n· 景点深度讲解\n· 游览路线规划\n· 文化历史介绍\n· 全程陪同服务\n· 基础摄影指导"
            },
            stepsData: [
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
        }
    },
    computed: {
        currentStep(): number {
            return this.order.step
        }
    },
    onLoad(option: any) {
        try {
            const data = JSON.parse(option.index)
            this.order = Object.assign({}, this.order, data)
        } catch (e) {
            console.error('数据解析失败:', e)
        }
    },
    methods: {
        jump_to_select(order) {
            var mynavData = JSON.stringify(order);
            uni.navigateTo({
                url: "/pages/order/order-select?index=" + mynavData
            });
            console.log(321);
        }

    }
})
</script>

<style>
.detail-section {
    padding: 16px;
}

.section-title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.title-text {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-left: 8px;
}

.content-box {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 12px;
}

.detail-content {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    white-space: pre-wrap;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
}

.info-item {
    background: white;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.info-label {
    font-size: 12px;
    color: #999;
    display: block;
    margin-bottom: 4px;
}

.info-value {
    font-size: 14px;
    color: #333;
    font-weight: 500;
}

.content {
    display: flex;
    padding: 16px;
    align-items: flex-start;
}

.info-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    line-height: 1.4;
}

.detail-row {
    display: flex;
    gap: 20px;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.detail-text {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
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