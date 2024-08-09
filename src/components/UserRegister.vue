<!-- src/components/UserRegister.vue -->
<template>
  <div>
    <h1>Register</h1>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required>
      </div>
      <button type="submit">Register</button>
    </form>
    
    <!-- 顯示錯誤訊息的區域 -->
    <div v-if="errors.length" style="color: red;">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '../services/api';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: []
    };
  },
  methods: {
    register() {
      this.errors = [];  // 清空之前的错误信息
      API.post('auth/register/', {
        username: this.username,
        email: this.email,
        password1: this.password,
        password2: this.confirmPassword
      })
      .then(response => {
        // 注册成功后的处理
        console.log('Registration successful', response.data);
        this.$router.push('/login');
      })
      .catch(error => {
        // 捕捉并处理错误信息
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          Object.keys(errorData).forEach(key => {
            // 如果 errorData[key] 是数组，使用 join，否则直接转换为字符串
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
