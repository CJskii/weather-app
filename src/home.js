export const App = {
  init: () => {
    const main = document.querySelector("body");
    App.wrapper(main);
    weather.getData();
    weather.getForecast();
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
    container.classList.add("forecast");
    forecast.appendChild(container);
  },
};

const weather = {
  getData: async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3e551ddc1e7a94f0f602ed66e45dc2ba",
        { mode: "cors" }
      );
      const data = await response.json();
      weather.dataHandler(data);
    } catch (err) {
      console.log(err);
    }
  },
  getForecast: async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=3e551ddc1e7a94f0f602ed66e45dc2ba",
        { mode: "cors" }
      );
      const data = await response.json();
      weather.forecastHandler(data);
    } catch (err) {
      console.log(err);
    }
  },
  dataHandler: (obj) => {
    //console.log(obj);
    const city = obj.name;
    const country = obj.sys.country;
    const temp = obj.main.temp;
    const tempFeels = obj.main.feels_like;
    const humidity = obj.main.humidity;
    const pressure = obj.main.pressure;
    const wind = obj.wind.speed;
    const dataTime = obj.dt;
    const icon = obj.weather[0].icon;
    const description = obj.weather[0].description;
    const weatherCondition = obj.weather[0].main;
    populateWeather.weatherItems({
      city,
      country,
      temp,
      dataTime,
      icon,
      description,
      weatherCondition,
    });
    populateWeather.weatherDetails({
      tempFeels,
      humidity,
      pressure,
      wind,
    });
  },
  forecastHandler: (obj) => {
    const name = obj.city.name;
    for (let i = 0; i < obj.list.length; i++) {
      let temp = obj.list[i].main.temp;
      const time = obj.list[i].dt_txt;
      let tempMin = obj.list[i].main.temp_min;
      const icon = obj.list[i].weather[0].icon;
      temp = transform.temp(temp);
      tempMin = transform.temp(tempMin);
      populateForecast.forecastItems({ name, temp, time, icon }, i);
    }

    console.log(obj);
  },
};

const populateWeather = {
  weatherItems: (obj) => {
    // populateWeather weather info
    const container = document.querySelector(".info-container");
    populateWeather.city(container, obj);
    populateWeather.description(container, obj);
    populateWeather.time(container, obj);
    populateWeather.weatherIcon(container, obj);
    populateWeather.temperature(container, obj);
    populateWeather.searchBox(container);
  },
  city: (container, obj) => {
    const city = document.createElement("div");
    city.classList.add("city");
    city.textContent = `${obj.city}, ${obj.country}`;
    container.appendChild(city);
  },
  description: (container, obj) => {
    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = obj.weatherCondition;
    container.appendChild(description);
  },
  time: (container, obj) => {
    const time = document.createElement("div");
    time.classList.add("time");
    time.textContent = transform.time(obj.dataTime);
    container.appendChild(time);
  },
  temperature: (container, obj) => {
    const tempcontainer = document.createElement("div");
    tempcontainer.classList.add("temp-container");
    const tempBtn = document.createElement("button");
    tempBtn.classList.add("btn");
    tempBtn.textContent = "Display in °C";
    const temperature = document.createElement("span");
    temperature.classList.add("temperature");
    temperature.textContent = transform.temp(obj.temp);
    tempcontainer.appendChild(temperature);
    tempcontainer.appendChild(tempBtn);
    container.appendChild(tempcontainer);
  },
  weatherIcon: (container, obj) => {
    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.textContent = obj.icon;
    container.appendChild(icon);
  },
  searchBox: (container) => {
    const searchbox = document.createElement("div");
    searchbox.classList.add("search-container");
    const inp = document.createElement("input");
    const searchicon = document.createElement("i");
    searchicon.classList.add("search-icon");
    searchbox.appendChild(inp);
    searchbox.appendChild(searchicon);
    container.appendChild(searchbox);
  },
  weatherDetails: (obj) => {
    const container = document.querySelector(".details-container");
    populateWeather.feelsLike(container, obj);
    //populateWeather.tempMin(container, obj);
    //populateWeather.tempMax(container, obj);
    populateWeather.humidity(container, obj);
    populateWeather.wind(container, obj);
    populateWeather.pressure(container, obj);
  },
  humidity: (container, obj) => {
    const details = document.createElement("div");
    const detailsInfo = document.createElement("div");
    details.classList.add("weather-details");
    detailsInfo.classList.add("details-info");
    const label = document.createElement("span");
    label.textContent = "Humidity";
    const span = document.createElement("span");
    span.textContent = obj.humidity + " %";
    detailsInfo.appendChild(label);
    detailsInfo.appendChild(span);
    const icon = document.createElement("i");
    icon.classList.add("humidity-icon");
    details.appendChild(icon);
    details.appendChild(detailsInfo);
    container.appendChild(details);
  },
  feelsLike: (container, obj) => {
    const details = document.createElement("div");
    const detailsInfo = document.createElement("div");
    details.classList.add("weather-details");
    detailsInfo.classList.add("details-info");
    const label = document.createElement("span");
    label.textContent = "Feels like";
    const span = document.createElement("span");
    span.textContent = transform.temp(obj.tempFeels);
    detailsInfo.appendChild(label);
    detailsInfo.appendChild(span);
    const icon = document.createElement("i");
    icon.classList.add("feelslike-icon");
    details.appendChild(icon);
    details.appendChild(detailsInfo);
    container.appendChild(details);
  },
  wind: (container, obj) => {
    const details = document.createElement("div");
    const detailsInfo = document.createElement("div");
    details.classList.add("weather-details");
    detailsInfo.classList.add("details-info");
    const label = document.createElement("span");
    label.textContent = "Wind";
    const span = document.createElement("span");
    span.textContent = obj.wind + " km/h";
    detailsInfo.appendChild(label);
    detailsInfo.appendChild(span);
    const icon = document.createElement("i");
    icon.classList.add("wind-icon");
    details.appendChild(icon);
    details.appendChild(detailsInfo);
    container.appendChild(details);
  },
  pressure: (container, obj) => {
    const details = document.createElement("div");
    const detailsInfo = document.createElement("div");
    details.classList.add("weather-details");
    detailsInfo.classList.add("details-info");
    const label = document.createElement("span");
    label.textContent = "Pressure";
    const span = document.createElement("span");
    span.textContent = obj.pressure + " hPa";
    detailsInfo.appendChild(label);
    detailsInfo.appendChild(span);
    const icon = document.createElement("i");
    icon.classList.add("pressure-icon");
    details.appendChild(icon);
    details.appendChild(detailsInfo);
    container.appendChild(details);
  },
};

const populateForecast = {
  forecastItems: (obj, i) => {
    // populateWeather forcast info
    const container = document.querySelector(".forecast");
    populateForecast.forecastDetails(container, obj, i);
    console.log(obj);
  },
  forecastDetails: (container, obj, i) => {
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("forecast-details");
    detailsContainer.classList.add(`forecast${i}`);
    container.appendChild(detailsContainer);
    if (i >= 6) {
      // how many forecast details is displayed
      detailsContainer.style.display = "none";
    }
    // populate forecast containers
    populateForecast.time(obj, detailsContainer);
    populateForecast.temp(obj, detailsContainer);
    populateForecast.icon(obj, detailsContainer);
  },
  time: (obj, container) => {
    const time = document.createElement("div");
    time.classList.add("forecast-time");
    let value = transform.forecastTime(obj.time);
    time.textContent = value;
    container.appendChild(time);
  },
  temp: (obj, container) => {
    const temp = document.createElement("div");
    temp.classList.add("forecast-temp");
    temp.textContent = obj.temp;
    container.appendChild(temp);
  },
  icon: (obj, container) => {
    const icon = document.createElement("div");
    icon.classList.add("forecast-icon");
    icon.textContent = obj.icon;
    container.appendChild(icon);
  },
};

const transform = {
  time: (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  },
  temp: (kelvin) => {
    let temp = kelvin - 273.15;
    temp = Math.round(temp * 10) / 10;
    temp = temp + " °C";
    return temp;
  },
  forecastTime: (value) => {
    value = value.slice(10, 16);
    return value;
  },
};
