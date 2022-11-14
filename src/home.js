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
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=API_HERE",
        { mode: "cors" }
      );
      const data = await response.json();
      weather.dataHandler(data);
    } catch (err) {
      console.log(err);
    }
  },
  dataHandler: (obj) => {
    console.log(obj);
    const city = obj.name;
    const country = obj.sys.country;
    const temp = obj.main.temp;
    const tempFeels = obj.main.feels_like;
    const tempMax = obj.main.temp_max;
    const tempMin = obj.main.temp_min;
    const humidity = obj.main.humidity;
    const pressure = obj.main.pressure;
    const wind = obj.wind.speed;
    const clouds = obj.clouds.all;
    const dataTime = obj.dt;
    populate.weatherItems({
      city,
      country,
      temp,
      tempFeels,
      tempMax,
      tempMin,
      humidity,
      pressure,
      wind,
      clouds,
      dataTime,
    });
  },
};

const populate = {
  weatherItems: (obj) => {
    // populate weather info
    console.log(obj);
  },
  forecastItems: () => {
    // populate forcast info
  },
};
