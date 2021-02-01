<template>
  <div id="app">

    <span
      class="cog-icon-wrap"
      @click="toggleSettings">
      <com-icon :size="24">cog</com-icon>
    </span>

    <com-settings v-if="settingsView"></com-settings>
    
    <template v-else>
      <com-city
        v-for="city in selectedCities"
        :key="city.title"
        :city="city"
      ></com-city>
    </template>
  </div>
</template>

<script>
import ComCity from './components/com-city.vue';
import ComSettings from './components/com-settings.vue';
import ComIcon from './components/com-icon.vue';
import { fetchWeather } from './services/api.service';
import { WEATHER_CHECK_INTERVAL } from './config';

import {
    state,
    updateCity,
} from './services/state.service';

export default {
  name: 'WeatherWidget',

  props: ['city'],

  data() {
    return {
      settingsView: false,
    }
  },

  components: {
    ComCity,
    ComSettings,
    ComIcon,
  },

  computed: {
    selectedCities() {
      return state.selectedCities;
    }
  },

  methods: {
    toggleSettings() {
      this.settingsView = !this.settingsView;
    },

    async weatherCheckUp() {
      for (let i = 0; i < this.selectedCities.length; i++) {
        let city = this.selectedCities[i];

        if (city.loading && city.ts + WEATHER_CHECK_INTERVAL < Date.now()) return;

        city.ts = Date.now();
        city.loading = true;

        fetchWeather(city).then(weather => {
          city = {
            ...weather,
            ...city,
            loading: false,
          }
          updateCity(city);
        });
      }
    },
  },

  mounted() {
    setInterval(this.weatherCheckUp, WEATHER_CHECK_INTERVAL);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width: 300px;
  position: relative;
  padding-top: 26px;
  .cog-icon-wrap {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
