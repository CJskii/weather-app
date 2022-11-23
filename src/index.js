import "./style.css";
import { weather } from "./weather";

const App = {
  init: async () => {
    // init creating containers and listeners
    const main = document.querySelector("body");
    App.wrapper(main);
    weather.init();
  },
  wrapper: (main) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content");
    main.appendChild(wrapper);
    App.weather(wrapper);
    App.forecast(wrapper);
  },
  weather: (wrapper) => {
    const weather = document.createElement("div");
    weather.classList.add("weather-container");
    wrapper.appendChild(weather);
    App.weatherInfo(weather);
    App.forecastInfo(weather);
  },
  forecast: (wrapper) => {
    const forecast = document.createElement("div");
    forecast.classList.add("forecast-container");
    wrapper.appendChild(forecast);
    App.forecastChange(forecast);
    App.forecastContainer(forecast);
  },
  weatherInfo: (weather) => {
    const container = document.createElement("div");
    container.classList.add("info-container");
    weather.appendChild(container);
  },
  forecastInfo: (forecast) => {
    const container = document.createElement("div");
    container.classList.add("details-container");
    forecast.appendChild(container);
  },
  forecastChange: (forecast) => {
    const container = document.createElement("div");
    container.classList.add("forecast-change");
    forecast.appendChild(container);
    const btns = document.createElement("div");
    btns.classList.add("forecast-btns");
    const btnDaily = document.createElement("button");
    btnDaily.classList.add("btn-daily");
    btnDaily.textContent = "Daily";
    btnDaily.classList.add("btn");
    const btnHourly = document.createElement("button");
    btnHourly.textContent = "Hourly";
    btnHourly.classList.add("btn-hourly");
    btnHourly.classList.add("btn");
    btns.appendChild(btnDaily);
    btns.appendChild(btnHourly);
    container.appendChild(btns);
    const slider = document.createElement("div");
    slider.classList.add("slider");
    slider.style.display = "none";
    const left = document.createElement("i");
    left.classList.add("slide-left");
    const dots = [];
    const dot1 = document.createElement("div");
    const dot2 = document.createElement("div");
    const dot3 = document.createElement("div");
    dots.push(dot1, dot2, dot3);
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.add("dot");
      dots[i].classList.add(`dot${i + 1}`);
      dots[i].style.border = "2px solid #f0b479be";
      if (i == 0) {
        dots[i].style.background = "#a4a87898";
      } else if (i > 0) {
        dots[i].style.background = "transparent";
      }
      slider.appendChild(dots[i]);
    }
    const right = document.createElement("i");
    right.classList.add("slide-right");
    slider.appendChild(left);
    slider.appendChild(right);
    container.appendChild(slider);
  },
  forecastContainer: (forecast) => {
    const container = document.createElement("div");
    container.classList.add("forecast-container-daily");
    container.classList.add("forecast");
    forecast.appendChild(container);
  },
};

(function () {
  // invoke app
  App.init();
  console.log("App invoked");
})();
