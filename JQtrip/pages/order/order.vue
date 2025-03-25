<template>
    <page-wraper>
        <view>
            <demo-block title="基本使用" transparent>
                <wd-card v-for="order in order_list" @click="jump_to_order(order)">
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

            </demo-block>

        </view>
    </page-wraper>
</template>

<script>
import { baseUrl } from '@/config';

export default {
    data() {
        return {
            order_list: []
        };
    },
    onLoad() {
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
        }

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
</style>