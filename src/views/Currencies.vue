<template>
    <div class="currencies__page container">
       <div class="currencies__menu">
        <h3 class="currencies__base_currency">Base currency: 1 {{ baseCurrency }}</h3>
        <button
          class="currencies__button"
          @click="isSelectVisible = !isSelectVisible"
        >
          Change
        </button>
        <div
          class="currencies__wrap"
          v-if="isSelectVisible"
        >
          <div class="w">
            <h4 class="currencies__wrap_title">Favorite Currencies:</h4>
            <button type="button" class="item__btn btn_remove" @click="clearFav">Clear FavList</button>
          </div>
          <div class="currencies__list fav_list">
            <div class="currencies__item item" 
              v-for="(value, ind) in fav_list" 
              :key="ind"
              @click="changeBaseCurrency(value[0])"
              >
            <span class="item__name">{{ value[0] }}</span>
            <button class="item__btn" @click.stop="favorite(value[0])">
              <span>Favorite</span>
            </button>
            </div>
          </div>
          <h4 class="currencies__wrap_title">All Currencies:</h4>
          <div class="currencies__list">
            <div
              class="currencies__item item"
              v-for="(value, name, ind) of currencies"
              :key="ind"
              @click="changeBaseCurrency(name)"
            >
              <span class="item__name">{{ name }}</span>
              <button class="item__btn" @click.stop="favorite(name)">
                <span>Favorite</span>
            </button>
            </div>
          </div>
        </div>
      </div>
      <div class="currencies__rates_list rates_list">
          <div class="rates_list__item" v-for="(value, name, ind) in currencies" :key="ind">
            <div class="rates_list__text">{{ name }}: {{ value }}</div>
          </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "home",
  data() {
    return {
      baseCurrency: "USD",
      currencies: {},
      fav_list: [],
      isSelectVisible: false,
      access_key: "a08020c238-b5e6ffcdad-r4bntb"
    };
  },
  mounted(){
		this.getCurrenciesRate();
    this.fav_list = localStorage.getItem('fav_cur')!=null?JSON.parse(localStorage.getItem('fav_cur')):[];
	},
  watch: {
    baseCurrency(){
      this.getCurrenciesRate()
    }
  },
  methods: {
     favorite(val){
      if(this.fav_list.length!=0){
        let ind = this.fav_list.findIndex((el)=> el[0] === val);
        console.log(ind);
        if(ind!=-1){
              this.fav_list.splice(ind, 1);
        }else{
            let result = Object.keys(this.currencies).map((key) => [(key), this.currencies[key]]);
            let favItem = result.find((el)=> el[0] === val);
            this.fav_list.push(favItem);
        }
      }else{
          let result = Object.keys(this.currencies).map((key) => [(key), this.currencies[key]]);
          let favItem = result.find((el)=> el[0] === val);
          this.fav_list.push(favItem);
      }
      localStorage.setItem('fav_cur', JSON.stringify(this.fav_list));
    },
    clearFav(){
      if(this.fav_list.length > 0){
        this.fav_list = [];
        localStorage.setItem('fav_cur', JSON.stringify(this.fav_list));
      }else{
        return
      }
    },
    changeBaseCurrency(val){
      this.baseCurrency = val
      this.isSelectVisible = false
    },
    getCurrenciesRate(){
			axios.get(`https://api.fastforex.io/fetch-all?from=${this.baseCurrency}&api_key=${this.access_key}`)
      .then((resp) => {
        if (resp.data) {
          this.currencies = Object.assign(resp.data.results)
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
.currencies__page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.currencies__base_currency {
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.5rem;
}
.currencies__menu {
  display: flex;
  align-items: center;
  position: relative;
}
.currencies__wrap{
  background-color: rgb(51, 105, 185);
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 0px -33px 32px 15px rgba(25, 50, 69, 0.33) inset;
  max-height: 400px;
  overflow-y: auto;
   padding: 1rem .8rem;
}
.currencies__wrap_title{
  font-size: 26px;
  color: #fff;
}
.currencies__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2rem;
  color: white;
  padding: 1rem;
  position: relative;
}
.fav_list{
  margin-bottom: 1rem;
}
.w{
  display: flex;
  justify-content: space-between;
}
.btn_remove{
  background-color: rgb(226, 50, 59) !important;
}
.currencies__item {
  position: relative;
  border: 2px solid #000;
}
.item__name{
  cursor: pointer;
  display: inline-block;
  padding: .5rem;
  margin-bottom: .3rem;
  width: 100%;
  &:hover{
    color: rgb(204, 204, 203);
  }
}
.item__btn{
  font-size: .8rem;
  padding: .3rem;
  background-color: rgb(44, 197, 108);
  border: none;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover{
    background-color: rgb(29, 170, 88);
  }
}
.currencies__button {
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

/* Rate List */
.currencies__rates_list {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 10rem;
}
.rates_list__item {
  width: 9rem;
  display: flex;
  justify-content: space-between;
}
.rates_list__text {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>