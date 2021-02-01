<template>
  <div class="com-city">
    <div class="title">
        {{city.title}}
    </div>
    <div
        v-if="city.loading && !city.weather"
        class="loading">
        loading...
    </div>
    <div
        v-else-if="city.main"
        class="weather">
        <div class="icon">
            <img v-if="weatherIcon" :src="weatherIcon">
        </div>
        <div class="temp">
            <span class="celsius">{{city.main.temp}}</span>
        </div>
        <div class="description">
            Feels like: <span class="celsius">{{city.main.feels_like}}</span>
        </div>
    </div>
  </div>
</template>

<script>

import { iconSrc } from '../services/api.service';

export default {
  name: 'ComCity',
  props: ['city'],
  computed: {
    weatherIcon() {
        let icon = this.city.weather && this.city.weather[0].icon;
        if (!icon) return '';
        return iconSrc(icon);
    }
  }
}
</script>

<style lang="scss">
.com-city {
    min-width: 200px;
    width: 100%;
    border: thin solid #eee;
    margin-bottom: 5px;
    padding: 5px;
    box-sizing: border-box;

    .weather {
        display: flex;
        flex-wrap: wrap;
    }
    .weather > div {
        width: 50%;
        white-space: nowrap;
    }
    .title {
        width: 100%;
        font-weight: 800;
    }
    .temp {
        font-weight: 800;
        font-size: 32px;
        text-align: right;
    }
    .celsius:after {
        content: '°C';
    }
}
</style>
