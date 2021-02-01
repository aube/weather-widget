
import { API_KEY } from '../config';

export const fetchWeather = async function({lat, lon}) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY;
    let response = await fetch(url);
    if (response.status < 400) {
        let json = await response.json();
        return json;
    }
    return false;
}

// http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid={API key}
// export const getCityByCoords = function() {
// }

export const iconSrc = function(icon) {
    return 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
}

export const fetchCity = function(name) {
    return throttle(_fetchCity, 1000, this, name);
}

function throttle(fn, to = 200, context = null) {
    let args = Array.prototype.slice.call(arguments, 3);

    if (fn.throttle) {
        clearTimeout(fn.throttle);
    }

    return new Promise(resolve => {
        fn.throttle = setTimeout(() => {
            let result = fn.call(context, ...args);
            fn.throttle = null;
            resolve(result);
        }, to);
    });
}

async function _fetchCity(name) {
    let url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + name + '&limit=5&appid=' + API_KEY;
    let response = await fetch(url);
    if (response.status < 400) {
        let json = await response.json();
        return json;
    }
    return false;
}
