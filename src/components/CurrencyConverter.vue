<!-- src/components/CurrencyConverter.vue -->
<template>
  <div>
    <h1>Currency Converter</h1>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <form @submit.prevent="convertCurrency">
      <div>
        <label for="source">Source Currency:</label>
        <select v-model="sourceCurrency">
          <option v-for="rate in rates" :key="rate.source_currency" :value="rate.source_currency">
            {{ rate.source_currency }}
          </option>
        </select>
      </div>
      <div>
        <label for="target">Target Currency:</label>
        <select v-model="targetCurrency">
          <option v-for="rate in rates" :key="rate.target_currency" :value="rate.target_currency">
            {{ rate.target_currency }}
          </option>
        </select>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input type="number" v-model="amount" required>
      </div>
      <button type="submit">Convert</button>
    </form>
    <p v-if="convertedAmount">Converted Amount: {{ convertedAmount }}</p>
  </div>
</template>

<script>
import API from '../services/api';

export default {
  name: 'CurrencyConverter',
  data() {
    return {
      rates: [],
      sourceCurrency: '',
      targetCurrency: '',
      amount: null,
      convertedAmount: null
    };
  },
  created() {
    this.fetchRates();
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
    convertCurrency() {
      const rate = this.rates.find(r => r.source_currency === this.sourceCurrency && r.target_currency === this.targetCurrency);
      if (rate) {
        this.convertedAmount = this.amount * rate.rate;
      } else {
        this.convertedAmount = 'Currency not supported';
      }
    }
  }
};
</script>

