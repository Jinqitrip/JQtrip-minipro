<template>
    <page-wraper>
        <view>
            <wd-card v-for="order in order_list" @click="jump_to_order(order)">
                <view style="height:20px"></view>
                <view class="content" @click="jump_to_order(order)">
                    <image :src="order.order_image" alt="joy"
                        style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
                    <view>
                        <view>{{ order.title }}</view>
                        <view>地址：{{ order.location }}</view>
                        <view>金额：{{ order.price }}</view>
                        <view>时间：{{ order.time }}</view>
                    </view>
                </view>
                <template #footer>
                    <wd-tag @click="jump_to_order(order)" v-if="order.step == 0" type="primary" round>已下单</wd-tag>
                    <wd-tag @click="jump_to_order(order)" v-if="order.step == 1" type="warning" round>待选择</wd-tag>
                    <wd-tag @click="jump_to_order(order)" v-if="order.step == 2" type="success" round>待开始</wd-tag>
                    <wd-tag @click="jump_to_order(order)" v-if="order.step == 4" round>已完成</wd-tag>
                    <wd-tag @click="jump_to_order(order)" v-if="order.step == 3" type="danger" round>待评价</wd-tag>
                </template>
            </wd-card>

        </view>
    </page-wraper>

    <wd-status-tip v-if="is_empty" image="comment" tip="暂无订单" />

    <!-- 登录提示模态框 -->
    <view v-if="showLoginModal" class="login-modal-mask">
        <view class="login-modal">
            <image class="modal-icon" src="/static/login-required.png"></image>
            <text class="modal-title">需要登录</text>
            <text class="modal-desc">登录后可以创建和查看个性化需求</text>
            <view class="button-group">
                <view class="modal-btn cancel-btn" @click="showLoginModal = false">稍后再说</view>
                <view class="modal-btn confirm-btn" @click="gotoLogin">立即登录</view>
            </view>
        </view>
    </view>

</template>

<script>
import { baseUrl } from '@/config';

export default {
    data() {
        return {
            order_list: [],
            showLoginModal: false,
            is_empty: true
        };
    },
    onLoad() {
        if (this.$userData.openId == "") {
            this.showLoginModal = true;
            return;
        } else {
            uni.request({
                url: baseUrl + "/v1/orders/user/" + this.$userData.openId, // 你的登录API地址
                method: 'GET',
                success: (res) => {
                    console.log(res.data);
                    var item;
                    for (item in res.data) {
                        this.is_empty = false;
                        console.log(res.data[item]);
                        var data = res.data[item];
                        var order = {
                            "title": "",
                            "order_image": "/static/logo.png",
                            "location": "",
                            "price": "",
                            "time": data.data.date + " " + data.data.time,
                            "step": 0,
                            "id": data._id
                        }

                        order.title = (function () {
                            if (data.title) {
                                return data.title;
                            }
                            return "未匹配的服务"
                        })()

                        order.location = (function () {
                            if (data.location) {
                                return data.location;
                            }
                            return "未确定"
                        })()

                        order.price = (function () {
                            if (data.price) {
                                return data.price;
                            }
                            return "待议"
                        })()

                        order.step = (function () {
                            if (data.status == 'pending') {
                                return 0;
                            } else if (data.status == 'selecting') {
                                return 1;
                            }
                            else if (data.status == 'upcoming') {
                                return 2;
                            }
                            else if (data.status == 'reviewing') {
                                return 3;
                            }
                            return 4;
                        })()

                        this.order_list.push(order);
                    }
                },
                fail: () => {
                    console.log("fuck")
                }
            })
        }
    },
    methods: {
        jump_to_order(order) {
            var mynavData = JSON.stringify(order);
            uni.navigateTo({
                url: "/pages/order/order_detail?index=" + mynavData
            });
        },
        request_orders() {
            uni.request({
                url: baseUrl + "/v1/orders/user/" + this.$userData.openId, // 你的登录API地址
                method: 'GET',
                success: (res) => {
                    console.log(res.data);
                    var item;
                    for (item in res.data) {
                        console.log(res.data[item]);
                        var data = res.data[item];
                        var order = {
                            "title": "",
                            "order_image": "/static/logo.png",
                            "location": "",
                            "price": "",
                            "time": data.data.date + " " + data.data.time,
                            "step": 0,
                            "id": data._id
                        }

                        order.title = (function () {
                            if (data.title) {
                                return data.title;
                            }
                            return "未匹配的服务"
                        })()

                        order.location = (function () {
                            if (data.location) {
                                return data.location;
                            }
                            return "未确定"
                        })()

                        order.price = (function () {
                            if (data.price) {
                                return data.price;
                            }
                            return "待议"
                        })()

                        order.step = (function () {
                            if (data.status == 'pending') {
                                return 0;
                            } else if (data.status == 'selecting') {
                                return 1;
                            }
                            else if (data.status == 'upcoming') {
                                return 2;
                            }
                            else if (data.status == 'reviewing') {
                                return 3;
                            }
                            return 4;
                        })()

                        this.order_list.push(order);
                    }
                },
                fail: () => {
                    console.log("fuck")
                }
            })
        },
        gotoLogin() {
            uni.navigateTo({ url: '/pages/my/login_wx' });
            this.showLoginModal = false;
        },

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

/* 登录提示模态框样式 */
.login-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.login-modal {
    width: 600rpx;

    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 50rpx;
    text-align: center;
    animation: modalShow 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

@keyframes modalShow {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.modal-icon {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 32rpx;
}

.modal-title {
    display: block;
    font-size: 36rpx;
    color: #333;
    font-weight: 600;
    margin-bottom: 16rpx;
}

.modal-desc {
    display: block;
    font-size: 28rpx;
    color: #666;
    margin-bottom: 48rpx;
}

.button-group {
    display: flex;
    gap: 30rpx;
    justify-content: center;
}

.modal-btn {
    flex: 1;
    height: 80rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    font-weight: 500;
    transition: all 0.2s ease;
}

.cancel-btn {
    background: #F5F5F5;
    color: #666;
}

.cancel-btn:active {
    background: #E0E0E0;
}

.confirm-btn {
    background: #5AA7EB;
    color: #FFFFFF;
}

.confirm-btn:active {
    background: #4A97DB;
}
</style>