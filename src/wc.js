import Vue from 'vue';
import App from './App.vue';
import wrap from '@vue/web-component-wrapper';

const wrappedElement = wrap(Vue, App);

window.customElements.define('weather-widget', wrappedElement);

