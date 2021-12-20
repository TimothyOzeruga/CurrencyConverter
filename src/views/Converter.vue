<template>
    <div class="container">
      <div class="convert">
         <div class="convert__item">
          <div class="convert__text">From Currency:</div>
          <select v-model="fromCurrency" class="select" @change="convert">
            <option v-for="cur of currencies" :key="cur">{{ cur }}</option>
          </select>
        </div>
        <div class="convert__item">
          <div class="convert__text">To Currency:</div>
          <select v-model="toCurrency" class="select" @change="convert">
            <option v-for="(cur, ind) of currencies" :key="ind">{{ cur }}</option>
          </select>
        </div>
        <div class="convert__item">
          <div class="convert__text">Value:</div>
          <input type="number" class="input" v-model.number="amount"/>
        </div>
         <div class="convert__item result__item">
          <div class="convert__text">Result:</div>
           <div class="convert__result"><span  v-if="rez">{{ `${amount} ${fromCurrency} = ${countingResult} ${toCurrency}` }}</span></div>
        </div>
        <button type="button" class="btn" @click="convert">convert</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "home",
  data() {
    return {
      amount: 1,
      fromCurrency: "USD",
      toCurrency: "EUR",
      rate: null,
      currencies: ["USD", "UAH", "EUR"],
      rez: false,
      access_key: "a08020c238-b5e6ffcdad-r4bntb"
    };
  },
  mounted(){
		this.getCurrencies();
	},
  computed: {
      countingResult(){
        return (this.amount * this.rate).toFixed(2);
      }
  },
  methods: {
    async convert() {
      await axios
      .get(`https://api.fastforex.io/fetch-one?from=${this.fromCurrency}&to=${this.toCurrency}&api_key=${this.access_key}`)
      .then((resp) => {
        if (resp.data) {
          this.rate = +resp.data.result[Object.keys(resp.data.result)[0]];
          this.rez = true;
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        alert(err);
      })
    },
    getCurrencies(){
      const currencies = localStorage.getItem('currenciesInLocalStorage');

			if (currencies) {
				this.currencies=JSON.parse(currencies);
				return;
      }

			axios.get(`https://api.fastforex.io/currencies?api_key=${this.access_key}`)
      .then((resp) => {
        if (resp.data) {
          for (let currency in resp.data.currencies) {
            console.log(this.currencies);
            this.currencies.push(currency);
          }
         localStorage.setItem('currenciesInLocalStorage', JSON.stringify(this.currencies));
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        alert(err);
      })
    }
  },
};
</script>

<style lang="scss">
.convert{
  padding-top: 1rem;
}
.select{
  display: block; 
  font-size: 16px; 
  font-family: sans-serif; 
  font-weight: 700; 
  color: #444; 
  line-height: 1.3; 
  padding: .6em 1.4em .5em .8em; width: 100%; 
  max-width: 100%; 
  box-sizing: border-box; 
  margin: 0; 
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04); 
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff; 
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%); 
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%; 
  outline: none;
  cursor: pointer;
  } 
  .select::-ms-expand { display: none; } 
  .select:hover { border-color: #888; } 
  .select:focus { border-color: rgb(51, 165, 211); 
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring; 
  color: #222;
  outline: none; 
}
.input{
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;

  &:focus{
    border: 1px solid rgb(51, 165, 211);
  }
}
.btn{
  font-size: 1.2rem;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: rgb(44, 105, 197);
  border: none;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover{
    background-color: rgb(31, 80, 153);
  }
}
.convert__text{
  font-size: 24px;
  font-weight: 700;
  margin-bottom: .5rem;
}
.convert__item{
  margin-bottom: 1.5rem;
}
.convert__result{
  height: 30px;
  font-size: 18px;

}
</style>