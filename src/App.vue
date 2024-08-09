<template>
  <div id="app">
    <router-view @updateUserStatus="updateUserStatus"></router-view> <!-- 监听登录状态的变化 -->
  </div>
</template>

<script>
export default {
  methods: {
    updateUserStatus() {
      // 可以在此处重新拉取用户信息或更新全局状态
      console.log("User status updated, possibly logged in or logged out.");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
