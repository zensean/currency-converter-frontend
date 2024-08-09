import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import API from './services/api';

// 创建 Vue 应用实例
const app = createApp(App);

// 路由守卫来检查是否需要验证
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

// 设置 axios 实例的默认请求头
API.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('authToken')}`;

// 使用路由
app.use(router);

// 挂载应用
app.mount('#app');
