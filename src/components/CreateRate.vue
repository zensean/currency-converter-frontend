<template>
  <div>
    <h1>Create New Currency Rate</h1>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <form @submit.prevent="createRate">
      <div>
        <label for="sourceCurrency">Source Currency:</label>
        <input type="text" v-model="sourceCurrency" required>
      </div>
      <div>
        <label for="targetCurrency">Target Currency:</label>
        <input type="text" v-model="targetCurrency" required>
      </div>
      <div>
        <label for="rate">Rate:</label>
        <input type="number" v-model="rate" step="0.01" required>
      </div>
      <button type="submit">Create</button>
    </form>

    <!-- 顯示錯誤訊息的區域 -->
    <div v-if="errors.length" style="color: red;">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <!-- 成功訊息 -->
    <div v-if="successMessage" style="color: green;">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import API from '../services/api';

export default {
  name: 'CreateRate',
  data() {
    return {
      sourceCurrency: '',
      targetCurrency: '',
      rate: null,
      errors: [],
      successMessage: ''
    };
  },
  methods: {
    createRate() {
      this.errors = [];  // 清空之前的錯誤訊息
      this.successMessage = ''; // 清空之前的成功訊息

      API.post('rates/', {
        source_currency: this.sourceCurrency,
        target_currency: this.targetCurrency,
        rate: this.rate
      })
      .then(response => {
        this.successMessage = 'Currency rate created successfully!';
        console.log('Rate created:', response.data);
      })
      .catch(error => {
        console.error('Error creating rate', error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          Object.keys(errorData).forEach(key => {
            // 检查 errorData[key] 是否为数组并处理
            const message = Array.isArray(errorData[key]) ? errorData[key].join(' ') : String(errorData[key]);
            this.errors.push(`${key}: ${message}`);
          });
        } else {
          this.errors.push('An unknown error occurred');
        }
      });
    }
  }
};
</script>
