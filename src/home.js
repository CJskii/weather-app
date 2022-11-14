export const App = {
  init: () => {
    const main = document.querySelector("body");
    App.wrapper(main);
    weather.getData();
  },
  wrapper: (main) => {
    // create main container
    const wrapper = document.createElement("div");
    wrapper.classList.add("content");
    main.appendChild(wrapper);
    App.weather(wrapper);
    App.forecast(wrapper);
  },
  weather: (wrapper) => {
    // create weather info container
    const weather = document.createElement("div");
    weather.classList.add("weather-container");
    wrapper.appendChild(weather);
    App.weatherInfo(weather);
    App.forecastInfo(weather);
  },
  forecast: (wrapper) => {
    // create forecast container
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
  },
  forecastContainer: (forecast) => {
    const container = document.createElement("div");
    container.classList.add("forecast-container-daily");
    forecast.appendChild(container);
  },
};

const weather = {
  getData: async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=3e551ddc1e7a94f0f602ed66e45dc2ba",
        { mode: "cors" }
      );
      const data = await response.json();
      weather.dataHandler(data);
    } catch (err) {
      console.log(err);
    }
  },
};

const populate = {
  weatherItems: () => {
    // populate weather info
  },
  forecastItems: () => {
    // populate forcast info
  },
};
