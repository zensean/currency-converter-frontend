<!-- src/components/HomePage.vue -->
<template>
  <div>
    <h1>Welcome to the Currency Converter App</h1>
    <nav>
      <router-link to="/login" v-if="!isAuthenticated">Login</router-link>
      <router-link to="/" v-if="isAuthenticated" @click="logout">Logout</router-link>
      <router-link to="/rates">Currency Rates</router-link>
      <router-link to="/converter">Currency Converter</router-link>
    </nav>
    <div v-if="isAuthenticated">
      <p>Logged in as: {{ username }}</p>
    </div>
  </div>
</template>

<script>
import API from '../services/api';

export default {
  name: 'HomePage',
  data() {
    return {
      isAuthenticated: false,
      username: ''
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      API.get('auth/user/')
        .then(response => {
          this.isAuthenticated = true;
          this.username = response.data.username;
        })
        .catch(() => {
          this.isAuthenticated = false;
        });
    },
    logout() {
      API.post('auth/logout/')
        .then(() => {
          this.isAuthenticated = false;
          this.username = '';
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Logout failed', error);
        });
    }
  }
};
</script>

<style>
nav a {
  margin-right: 10px; /* 为每个导航链接添加右边距 */
}

nav a:last-child {
  margin-right: 0; /* 确保最后一个链接没有右边距 */
}
</style>
