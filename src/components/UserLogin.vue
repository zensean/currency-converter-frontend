<!-- src/components/UserLogin.vue -->
<template>
  <div>
    <h1>Login</h1>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import API from '../services/api';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      API.post('auth/login/', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        // 登录成功后保存 token
        localStorage.setItem('authToken', response.data.key);

        // 设置 axios 实例的默认请求头
        API.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('authToken')}`;

        // 跳转到首页
        this.$router.push('/');
      })
      .catch(error => {
        console.error('Login failed', error);
        alert('Login failed: ' + error.response.data.detail);
      });
    }
  }
};
</script>


