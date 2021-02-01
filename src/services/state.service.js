import { DEFAULT_CITY, LS_KEY } from '../config';
import { fetchWeather } from './api.service';

import Vue from 'vue';

const addWeather = function(city) {
    fetchWeather(city, true).then(weather => {
        updateCity({
            ...weather,
            ...city,
            loading: false,
        });
    });
}

const getSavedCities = function() {
    let cities = localStorage.getItem(LS_KEY);
    if (!cities) {
        addWeather(DEFAULT_CITY);
        return [ DEFAULT_CITY ];
    }
    try {
        cities = JSON.parse(cities);
        return cities;
    } catch(err) {
        return [ DEFAULT_CITY ];
    }
}

export const state = Vue.observable({
    selectedCities: getSavedCities()
});

export const updateCity = function(city) {
    let idx = state.selectedCities.findIndex(c => c.title === city.title);
    if (idx !== false) {
        state.selectedCities.splice(idx, 1, city);
    }
    saveCities();
}

export const addCity = function(city) {
    city = {
        title: city.title,
        lat: city.lat,
        lon: city.lon,
        loading: true,
    }
    state.selectedCities.push(city);
    addWeather(city);
    saveCities();
}

export const removeCity = function(city) {
    state.selectedCities = state.selectedCities.filter(c => c.title !== city.title);
    saveCities();
}

export const saveCities = function(cities) {
    if (cities) {
        state.selectedCities = cities;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(state.selectedCities));
}
