import Vue from 'vue';
import App from './App.vue';

import ComIcon from './components/com-icon.vue';
 
Vue.component('com-icon', ComIcon)

let mountPoint = location.host === 'localhost:8081' ? '#app' : 'weather-widget';

new Vue({
  render: h => h(App),
}).$mount(mountPoint);
