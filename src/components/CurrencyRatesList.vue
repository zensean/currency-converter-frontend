<template>
  <div>
    <h1>Currency Rates</h1>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <button v-if="isLoggedIn" @click="createRate">Create New Rate</button>
    <table>
      <thead>
        <tr>
          <th>Source Currency</th>
          <th>Target Currency</th>
          <th>Rate</th>
          <th v-if="isLoggedIn">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in rates" :key="rate.id">
          <td>{{ rate.source_currency }}</td>
          <td>{{ rate.target_currency }}</td>
          <td>{{ rate.rate }}</td>
          <td v-if="isLoggedIn">
            <button @click="editRate(rate.id)">Edit</button>
            <button @click="deleteRate(rate.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import API from '../services/api';

export default {
  name: 'CurrencyRatesList',
  data() {
    return {
      rates: [],
      isLoggedIn: false
    };
  },
  created() {
    this.fetchRates();
    this.checkLoginStatus();
  },
  methods: {
    fetchRates() {
      API.get('rates/')
        .then(response => {
          this.rates = response.data;
        })
        .catch(error => {
          console.error('Error fetching rates:', error);
        });
    },
    createRate() {
      // 假設你有一個頁面用於創建新匯率
      this.$router.push('/create-rate');
    },
    editRate(id) {
      console.log(`Editing rate with ID: ${id}`);
      // 這裡可以跳轉到編輯頁面，或者彈出編輯表單
    },
    deleteRate(id) {
      console.log(`Deleting rate with ID: ${id}`);
      // 可以添加刪除匯率的邏輯
    },
    checkLoginStatus() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
  }
};
</script>
