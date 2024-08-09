import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import UserLogin from '@/components/UserLogin.vue';
import CurrencyRatesList from '@/components/CurrencyRatesList.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';
import UserRegister from '@/components/UserRegister.vue'; // 新增註冊頁面
import CreateRate from '@/components/CreateRate.vue';  // 新增的匯率創建頁面

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'UserLogin', component: UserLogin },
  { path: '/rates', name: 'CurrencyRatesList', component: CurrencyRatesList },
  { path: '/converter', name: 'CurrencyConverter', component: CurrencyConverter },
  { path: '/register', name: 'UserRegister', component: UserRegister }, // 新增註冊頁面路徑
  { path: '/create-rate',name:'CreateRate',component: CreateRate, meta: { requiresAuth: true } // 這個路由需要驗證
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
