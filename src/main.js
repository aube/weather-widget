import Vue from 'vue';
import App from './App.vue';

let mountPoint = location.host === 'localhost:8081' ? '#app' : 'weather-widget';

new Vue({
  render: h => h(App),
}).$mount(mountPoint);
