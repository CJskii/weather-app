export const App = {
  init: () => {
    // init creating containers and listeners
    const units = weather.getUnits();
    const main = document.querySelector("body");
    App.wrapper(main);
    weather.getData(units);
    weather.getForecast(units);
    listeners.init();
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
    const dot1 = document.createElement("div");
    const dot2 = document.createElement("div");
    const dot3 = document.createElement("div");
    dot1.style.background = "white";
    dot1.style.border = "2px solid white";
    dot2.style.background = "transparent";
    dot2.style.border = "2px solid white";
    dot3.style.background = "transparent";
    dot3.style.border = "2px solid white";
    dot1.classList.add("dot");
    dot1.classList.add("dot1");
    dot2.classList.add("dot");
    dot2.classList.add("dot2");
    dot3.classList.add("dot");
    dot3.classList.add("dot3");
    const right = document.createElement("i");
    right.classList.add("slide-right");
    slider.appendChild(left);
    slider.appendChild(dot1);
    slider.appendChild(dot2);
    slider.appendChild(dot3);
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

// weather data functions
const weather = {
  // get data from the API
  getData: async (units) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&units=${units}&APPID=3e551ddc1e7a94f0f602ed66e45dc2ba`,
        { mode: "cors" }
      );
      const data = await response.json();
      weather.dataHandler(data);
      weather.dataStorageHandler(data);
    } catch (err) {
      console.log(err);
    }
  },
  getForecast: async (units) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=London&units=${units}&appid=3e551ddc1e7a94f0f602ed66e45dc2ba`,
        { mode: "cors" }
      );
      const data = await response.json();
      weather.forecastStorageHandler(data);
      weather.populateCheck();
    } catch (err) {
      console.log(err);
    }
  },
  // handle API response and initiate populating containers
  dataHandler: (obj) => {
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
    weatherInfo.populate({
      city,
      country,
      temp,
      dataTime,
      icon,
      description,
      weatherCondition,
    });
    weatherDetails.populate({
      tempFeels,
      humidity,
      pressure,
      wind,
    });
  },
  // data storage functions
  dataStorageHandler: (obj) => {
    const check = weather.getDataStorage();
    if (check.length == 0) {
      weather.dataStorage.push(obj);
    } else if (check.length > 0) {
      weather.dataStorage = [];
      weather.dataStorage.push(obj);
    }
  },
  forecastStorageHandler: (obj) => {
    const check = weather.getDataStorage();
    if (check.length == 0) {
      weather.forecastStorage.push(obj);
    } else if (check.length > 0) {
      weather.forecastStorage = [];
      weather.forecastStorage.push(obj);
    }
  },
  dataStorage: [],
  forecastStorage: [],
  getDataStorage: () => {
    const data = weather.dataStorage;
    return data;
  },
  getForecastStorage: () => {
    const data = weather.forecastStorage;
    return data;
  },
  units: "metric",
  getUnits: () => {
    const units = weather.units;
    return units;
  },
  populateCheck: () => {
    const btn = document.querySelector(".btn-active");
    if (btn == null) {
      daily.populate();
    } else if (btn != null) {
      const text = btn.textContent;
      if (text == "Hourly") {
        hourly.populate();
      } else if (text == "Daily") {
        daily.populate();
      }
    }
  },
};

// populate weather info-container
const weatherInfo = {
  populate: (obj) => {
    // populateWeather weather info
    const container = document.querySelector(".info-container");
    weatherInfo.city(container, obj);
    weatherInfo.description(container, obj);
    weatherInfo.time(container, obj);
    weatherInfo.weatherIcon(container, obj);
    weatherInfo.temperature(container, obj);
    weatherInfo.searchBox(container);
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
    tempBtn.classList.add("btn-toggle");
    weatherInfo.btnText(tempBtn);
    tempBtn.addEventListener("click", (e) => toggle.display(e, tempBtn));
    const temperature = document.createElement("span");
    temperature.classList.add("temperature");
    temperature.textContent = transform.temp(obj.temp);
    tempcontainer.appendChild(temperature);
    tempcontainer.appendChild(tempBtn);
    container.appendChild(tempcontainer);
  },
  weatherIcon: (container, obj) => {
    const icon = document.createElement("img");
    icon.classList.add("weather-icon");
    transform.icon(obj.icon, icon);
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
  btnText: (btn) => {
    const units = weather.getUnits();
    if (units == "metric") {
      btn.textContent = "Display in °F";
    } else if (units == "imperial") {
      btn.textContent = "Display in °C";
    }
  },
};

// populate weather details-container
const weatherDetails = {
  populate: (obj) => {
    const container = document.querySelector(".details-container");
    weatherDetails.feelsLike(container, obj);
    weatherDetails.humidity(container, obj);
    weatherDetails.wind(container, obj);
    weatherDetails.pressure(container, obj);
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
    span.textContent = transform.wind(obj.wind);
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

// hourly forecast logic
const hourly = {
  populate: () => {
    // populateWeather forcast info
    const obj = weather.getForecastStorage();
    const container = document.querySelector(".forecast");
    for (let i = 0; i < obj[0].list.length; i++) {
      let temp = obj[0].list[i].main.temp;
      const time = obj[0].list[i].dt_txt;
      let tempMin = obj[0].list[i].main.temp_min;
      const icon = obj[0].list[i].weather[0].icon;
      temp = transform.temp(temp);
      tempMin = transform.temp(tempMin);
      const object = { temp, time, icon };
      hourly.forecastDetails(container, object, i);
    }
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
    hourly.time(obj, detailsContainer);
    hourly.temp(obj, detailsContainer);
    hourly.icon(obj, detailsContainer);
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
    const icon = document.createElement("img");
    icon.classList.add("forecast-icon");
    transform.icon(obj.icon, icon);
    container.appendChild(icon);
  },
};

// daily forecast logic
const daily = {
  populate: () => {
    const obj = weather.getForecastStorage();
    daily.storageNight = [];
    daily.storageNoon = [];
    for (let i = 0; i < obj[0].list.length; i++) {
      let key = obj[0].list[i].dt_txt;
      let temp = obj[0].list[i].main.temp;
      const icon = obj[0].list[i].weather[0].icon;
      const weekDay = transform.weekDay(key);
      const temperature = transform.temp(temp);
      key = transform.forecastTime(key);
      if (key == "15:00") {
        daily.storageNoon.push({
          weekDay,
          temperature,
          icon,
          value: "Noon",
        });
      } else if (key == "03:00") {
        daily.storageNight.push({
          weekDay,
          temperature,
          icon,
          value: "Night",
        });
      }
    }
    daily.dailyContainer();
  },
  dailyContainer: () => {
    const noon = daily.storageNoon;
    const night = daily.storageNight;
    const container = document.querySelector(".forecast");
    noon.forEach((key) => {
      const element = document.createElement("div");
      element.classList.add(`forecast${key.weekDay}`);
      element.classList.add("daily");
      container.appendChild(element);
      daily.noonPopulate(element, key);
    });
    night.forEach((key) => {
      daily.nightPopulate(key);
    });
  },
  noonPopulate: (container, key) => {
    const time = document.createElement("div");
    time.classList.add("forecast-time");
    time.textContent = key.weekDay;
    const temp = document.createElement("div");
    temp.classList.add("forecast-temp");
    temp.classList.add("forecast-temp-noon");
    temp.textContent = key.temperature;
    container.appendChild(time);
    container.appendChild(temp);
  },
  nightPopulate: (key) => {
    const container = document.querySelector(`.forecast${key.weekDay}`);
    const temp = document.createElement("div");
    temp.classList.add("forecast-temp");
    temp.classList.add("forecast-temp-night");
    temp.textContent = key.temperature;
    container.appendChild(temp);
    daily.dailyIcons(container, key);
  },
  dailyIcons: (container, key) => {
    const value = key.icon;
    const icon = document.createElement("img");
    icon.classList.add("forecast-icon");
    container.appendChild(icon);
    transform.icon(value, icon);
  },
  storageNoon: [],
  storageNight: [],
};

// transform data
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
  temp: (temp) => {
    const units = weather.getUnits();
    temp = Math.round(temp * 10) / 10;
    if (units == "metric") {
      temp = temp + " °C";
    } else if (units == "imperial") {
      temp = temp + " °F";
    }
    return temp;
  },
  forecastTime: (value) => {
    value = value.slice(11, 16);
    return value;
  },
  icon: async (value, icon) => {
    try {
      const response = await fetch(
        `https://openweathermap.org/img/wn/${value}@2x.png`,
        {
          mode: "cors",
        }
      );
      icon.src = response.url;
    } catch (err) {
      console.log(err);
    }
  },
  weekDay: (date) => {
    const d = new Date(date);
    let value = d.getDay();
    let day;
    if (value == "0") {
      day = "Sunday";
    } else if (value == "1") {
      day = "Monday";
    } else if (value == "2") {
      day = "Tuesday";
    } else if (value == "3") {
      day = "Wednesday";
    } else if (value == "4") {
      day = "Thursday";
    } else if (value == "5") {
      day = "Friday";
    } else if (value == "6") {
      day = "Saturday";
    }
    return day;
  },
  wind: (speed) => {
    const units = weather.getUnits();
    if (units == "metric") {
      let value = speed + " m/s";
      return value;
    } else if (units == "imperial") {
      let value = speed + "  mph";
      return value;
    }
  },
};

// event listeners
const listeners = {
  init: () => {
    const left = document.querySelector(".slide-left");
    const right = document.querySelector(".slide-right");
    const dot1 = document.querySelector(".dot1");
    const dot2 = document.querySelector(".dot2");
    const dot3 = document.querySelector(".dot3");
    const btnDaily = document.querySelector(".btn-daily");
    const btnHourly = document.querySelector(".btn-hourly");
    const slider = document.querySelector(".slider");
    left.addEventListener("click", (e) => listeners.left(e, dot1, dot2, dot3));
    right.addEventListener("click", (e) =>
      listeners.right(e, dot1, dot2, dot3)
    );
    btnDaily.addEventListener("click", (e) =>
      listeners.daily(e, btnDaily, btnHourly, slider)
    );
    btnHourly.addEventListener("click", (e) =>
      listeners.hourly(e, btnDaily, btnHourly, slider)
    );
  },
  left: (e, dot1, dot2, dot3) => {
    const color1 = dot1.style.background;
    const color2 = dot2.style.background;
    const color3 = dot3.style.background;
    if (color1 == "white") {
      return;
    } else if (color2 == "white") {
      dot1.style.background = "white";
      dot2.style.background = "transparent";
      items.renderLeft("1");
    } else if (color3 == "white") {
      dot2.style.background = "white";
      dot3.style.background = "transparent";
      items.renderLeft("2");
    }
  },
  right: (e, dot1, dot2, dot3) => {
    const color1 = dot1.style.background;
    const color2 = dot2.style.background;
    const color3 = dot3.style.background;
    if (color1 == "white") {
      dot1.style.background = "transparent";
      dot2.style.background = "white";
      items.renderRight("2");
    } else if (color2 == "white") {
      dot3.style.background = "white";
      dot2.style.background = "transparent";
      items.renderRight("3");
    } else if (color3 == "white") {
      return;
    }
  },
  daily: (e, btn1, btn2, slider) => {
    btn1.classList.add("btn-active");
    btn2.classList.remove("btn-active");
    slider.style.display = "none";
    items.dailyForecast();
  },
  hourly: (e, btn1, btn2, slider) => {
    btn2.classList.add("btn-active");
    btn1.classList.remove("btn-active");
    slider.style.display = "flex";
    items.hourlyForecast();
  },
};

// forecast items logic
const items = {
  renderRight: (value) => {
    if (value == "2") {
      for (let i = 0; i < 6; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 6; i < 12; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    } else if (value == "3") {
      for (let i = 6; i < 12; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 12; i < 18; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    }
  },
  renderLeft: (value) => {
    if (value == "2") {
      for (let i = 12; i < 18; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 6; i < 12; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    } else if (value == "1") {
      for (let i = 6; i < 12; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 0; i < 6; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    }
  },
  dailyForecast: () => {
    const container = document.querySelector(".forecast");
    const length = container.children.length;
    for (let i = 0; i < length; i++) {
      container.lastChild.remove();
    }
    daily.populate();
  },
  hourlyForecast: () => {
    const container = document.querySelector(".forecast");
    const length = container.children.length;
    for (let i = 0; i < length; i++) {
      container.lastChild.remove();
    }
    hourly.populate();
  },
};

// toggle temperature

const toggle = {
  display: (e, btn) => {
    const units = weather.getUnits();
    console.log(units);
    console.log(btn);
    toggle.removeContent();
    if (units == "imperial") {
      console.log("change to metric");
      weather.units = "metric";
      toggle.dataCall();
    } else if (units == "metric") {
      console.log("change to imperial");
      weather.units = "imperial";
      toggle.dataCall();
    }
  },
  removeContent: () => {
    const container1 = document.querySelector(".info-container");
    const container2 = document.querySelector(".details-container");
    const container3 = document.querySelector(".forecast");
    const child1 = container1.children.length;
    const child2 = container2.children.length;
    const child3 = container3.children.length;
    for (let i = 0; i < child1; i++) {
      container1.firstChild.remove();
    }
    for (let i = 0; i < child2; i++) {
      container2.firstChild.remove();
    }
    for (let i = 0; i < child3; i++) {
      container3.firstChild.remove();
    }
  },
  dataCall: async () => {
    const units = weather.getUnits();
    await weather.getData(units);
    await weather.getForecast(units);
  },
};
