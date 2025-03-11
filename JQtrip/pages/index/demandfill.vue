<template>
  <view class="container">
    <form @submit="submitForm">
      <view class="form-item">
        <label>人数：</label>
        <input v-model="formData.personCount" type="number" placeholder="请输入人数" />
      </view>
      <view class="form-item">
        <label>想去哪儿：</label>
        <input v-model="formData.destination" type="text" placeholder="请输入想去的地方" />
      </view>
      <view class="form-item">
        <label>游览目的：</label>
        <input v-model="formData.purpose" type="text" placeholder="请输入游览目的" />
      </view>
      <view class="form-item">
        <label>游览特殊需求：</label>
        <textarea v-model="formData.specialRequirements" placeholder="请输入游览特殊需求"></textarea>
      </view>
      <view class="form-item">
        <label>预计游览时间：</label>
        <input v-model="formData.expectedTime" type="text" placeholder="请输入预计游览时间" />
      </view>
      <view class="form-item">
        <label>预计付费：</label>
        <input v-model="formData.expectedPayment" type="number" placeholder="请输入预计付费金额" />
      </view>
      <button type="submit">提交</button>
    </form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          personCount: '',
          destination: '',
          purpose: '',
          specialRequirements: '',
          expectedTime: '',
          expectedPayment: ''
        }
      };
    },
    onLoad() {
      // 从本地缓存中获取之前保存的表单数据
      const savedFormData = uni.getStorageSync('formData');
      if (savedFormData) {
        this.formData = savedFormData;
      }
    },
    watch: {
      formData: {
        deep: true,
        handler(newValue) {
          // 监听表单数据的变化，将数据保存到本地缓存中
          uni.setStorageSync('formData', newValue);
        }
      }
    },
    methods: {
      submitForm() {
        console.log('表单数据：', this.formData); //test
        // 提交表单后清除本地缓存
        uni.removeStorageSync('formData');
        uni.navigateBack();
      }
    }
  };
</script>

<style scoped>
  .container {
    padding: 20px;
  }

  .form-item {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007aff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>