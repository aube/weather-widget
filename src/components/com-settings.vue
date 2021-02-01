<template>
  <div class="com-settings">

    <SlickList
      lockAxis="y"
      v-model="cities"
      :useDragHandle="true"
      @sort-end="onSort"
      class="selected-cities-list">
      <SlickItem
        v-for="(city, index) in cities"
        :index="index"
        :key="city.title"
        class="selected-city-item">
        <span v-handle class="handle">
          <com-icon :size="28">hamburger</com-icon>
        </span>

        <span class="title">
          {{city.title}}
        </span>

        <span @click="delCity(city)">
          <com-icon :size="24">delete</com-icon>
        </span>
      </SlickItem>
    </SlickList>

    <input
      v-model="citySearchName"
      placeholder="Input city name"
      class="search-city-input">

    <div
      v-for="city in foundCities"
      :key="city.title"
      class="found-city-item">
      <span class="title">
        {{city.title}}
      </span>
      <button @click="addCity(city)">add</button>
    </div>

  </div>
</template>

<script>

import { fetchCity } from '../services/api.service';
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';

import {
    state,
    saveCities,
    addCity,
    removeCity,
} from '../services/state.service';

export default {
  name: 'ComSettings',

  components: {
    SlickList,
    SlickItem,
  },

  directives: { handle: HandleDirective },

  data() {
    return {
      citySearchName: '',
      cities: [],
      foundCities: [],
    }
  },

  computed: {
    selectedCities() {
      return state.selectedCities;
    }
  },

  methods: {
    delCity(city) {
      removeCity(city);
    },

    addCity(city) {
      this.foundCities = [];
      this.citySearchName = '';
      addCity(city);
    },

    filterFindResult(foundCities) {
      let cMap = {};
      foundCities.forEach(city => {
        let title = [city.name, city.state, city.country].filter(k => !!k).join(', ');
        if (this.cities.find(c => c.title === title)) {
          return;
        }
        city.title = title;
        cMap[title] = city;
      });
      this.foundCities = Object.values(cMap);
    },

    onSort() {
      setTimeout(() => {
        saveCities(this.cities);
      });
    }
  },

  created() {
    this.cities = [ ...state.selectedCities ];
  },

  watch: {
    citySearchName(val) {
      if (val) {
        fetchCity(val).then(this.filterFindResult);
      }
    },
    selectedCities(val) {
      if (val) {
        this.cities = [ ...this.selectedCities ];
      }
    }
  }
}
</script>

<style lang="scss">
.selected-cities-list {
  margin-bottom: 10px;
}
.selected-city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border: thin solid #eee;
  background-color: #fafafa;
  margin-bottom: 3px;

  .handle {
    display: flex;
    align-items: center;
  }
  .title {
    flex-grow: 1;
    text-align: left;
    margin-left: 5px;
    font-size: 16px;
  }
}
.search-city-input {
  box-sizing: border-box;
  width: 100%;
  font-size: 1.2em;
}

.found-city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  .handle {
    display: flex;
    align-items: center;
  }
  .title {
    flex-grow: 1;
    text-align: left;
    margin-left: 5px;
    font-size: 16px;
  }
}
</style>
