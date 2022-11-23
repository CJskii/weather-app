import { APIcall, storage } from "./data";
import { listeners } from "./listeners";

export const weather = {
  init: async () => {
    await APIcall.cWeather();
    await APIcall.fWeather();
    await APIcall.cForecast();
    await APIcall.fForecast();
    weatherInfo.init();
    weatherDetails.init();
    daily.init();
    listeners.init();
  },
};

// populate weather info-container
export const weatherInfo = {
  init: () => {
    let obj;
    const units = storage.units;
    if (units == "metric") {
      obj = storage.cWeather;
    } else if (units == "imperial") {
      obj = storage.fWeather;
    }
    const city = obj[0].name;
    const country = obj[0].sys.country;
    const temp = obj[0].main.temp;
    const dataTime = obj[0].dt;
    const icon = obj[0].weather[0].icon;
    const description = obj[0].weather[0].description;
    const weatherCondition = obj[0].weather[0].main;
    weatherInfo.populate({
      city,
      country,
      temp,
      dataTime,
      icon,
      description,
      weatherCondition,
    });
  },
  populate: (obj) => {
    // populateWeather weather info
    const container = document.querySelector(".info-container");
    weatherInfo.description(container, obj);
    weatherInfo.city(container, obj);
    weatherInfo.day(container);
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
    description.textContent = transform.firstLetter(obj.description);
    container.appendChild(description);
  },
  day: (container) => {
    const day = document.createElement("span");
    day.classList.add("day");
    day.textContent = transform.getDay();
    container.appendChild(day);
  },
  time: (container, obj) => {
    const time = document.createElement("span");
    time.classList.add("time");
    time.textContent = transform.time(obj.dataTime);
    container.appendChild(time);
  },
  temperature: (container, obj) => {
    const tempcontainer = document.createElement("div");
    tempcontainer.classList.add("temp-container");
    const tempBtn = document.createElement("button");
    tempBtn.classList.add("btn");
    tempBtn.classList.add("toggle");
    weatherInfo.btnText(tempBtn);
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
    inp.placeholder = "Enter city";
    const searchicon = document.createElement("i");
    searchicon.classList.add("search-icon");
    searchbox.appendChild(inp);
    searchbox.appendChild(searchicon);
    container.appendChild(searchbox);
  },
  btnText: (btn) => {
    const units = storage.units;
    if (units == "metric") {
      btn.textContent = "Display in °F";
    } else if (units == "imperial") {
      btn.textContent = "Display in °C";
    }
  },
};

// populate weather details-container
export const weatherDetails = {
  init: () => {
    let obj;
    const units = storage.units;
    if (units == "metric") {
      obj = storage.cWeather;
    } else if (units == "imperial") {
      obj = storage.fWeather;
    }
    const tempFeels = obj[0].main.feels_like;
    const humidity = obj[0].main.humidity;
    const pressure = obj[0].main.pressure;
    const wind = obj[0].wind.speed;
    weatherDetails.populate({ tempFeels, humidity, pressure, wind });
  },
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
    span.classList.add("feels-like");
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
    span.textContent = obj.wind + " m/s";
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
export const hourly = {
  init: () => {
    let obj;
    const units = storage.units;
    if (units == "metric") {
      obj = storage.cForecast;
    } else if (units == "imperial") {
      obj = storage.fForecast;
    }
    hourly.populate(obj);
  },
  populate: (obj) => {
    // populateWeather forcast info
    const container = document.querySelector(".forecast");
    for (let i = 0; i < obj[0].list.length; i++) {
      let temp = obj[0].list[i].main.temp;
      const time = obj[0].list[i].dt_txt;
      let tempMin = obj[0].list[i].main.temp_min;
      const icon = obj[0].list[i].weather[0].icon;
      const dt = obj[0].list[i].dt;
      temp = transform.temp(temp);
      tempMin = transform.temp(tempMin);
      let day = transform.time(dt);
      day = transform.weekDay(day);
      const object = { temp, time, icon, day };
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
    } else if (i < 6) {
      detailsContainer.style.display = "flex";
    }
    // populate forecast containers
    hourly.time(obj, detailsContainer);
    hourly.day(obj, detailsContainer);
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
  day: (obj, container) => {
    const day = document.createElement("span");
    day.classList.add("forecast-day");
    day.textContent = obj.day;
    container.appendChild(day);
  },
};

// daily forecast logic
export const daily = {
  init: () => {
    let obj;
    const units = storage.units;
    if (units == "metric") {
      obj = storage.cForecast;
    } else if (units == "imperial") {
      obj = storage.fForecast;
    }
    daily.populate(obj);
  },
  populate: (obj) => {
    storage.night = [];
    storage.noon = [];
    for (let i = 0; i < obj[0].list.length; i++) {
      let key = obj[0].list[i].dt_txt;
      let temp = obj[0].list[i].main.temp;
      const icon = obj[0].list[i].weather[0].icon;
      const weekDay = transform.weekDay(key);
      const temperature = transform.temp(temp);
      key = transform.forecastTime(key);
      if (key == "15:00") {
        storage.noon.push({
          weekDay,
          temperature,
          icon,
          value: "Noon",
        });
      } else if (key == "03:00") {
        storage.night.push({
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
    const noon = storage.noon;
    const night = storage.night;
    const container = document.querySelector(".forecast");
    const firstNoon = noon[0].weekDay;
    const firstNight = night[0].weekDay;
    noon.forEach((key) => {
      const element = document.createElement("div");
      element.classList.add(`forecast${key.weekDay}`);
      element.classList.add("daily");
      container.appendChild(element);
      daily.noonPopulate(element, key);
    });
    // check if first day in the storages match
    if (firstNoon == firstNight) {
      night.forEach((key) => {
        daily.nightPopulate(key);
      });
    } else if (firstNoon != firstNight) {
      // do this if first days don't match
      for (let i = 0; i < night.length - 1; i++) {
        const key = night[i];
        daily.nightPopulate(key);
      }
      const key = noon[0];
      const container = document.querySelector(`.forecast${key.weekDay}`);
      daily.dailyIcons(container, key);
    }
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
    if (container) {
      container.appendChild(temp);
      daily.dailyIcons(container, key);
    } else if (!container) {
      daily.dailyIcons(container, key);
    }
    temp.classList.add("forecast-temp");
    temp.classList.add("forecast-temp-night");
    temp.textContent = key.temperature;
  },
  dailyIcons: (container, key) => {
    const value = key.icon;
    const icon = document.createElement("img");
    icon.classList.add("forecast-icon");
    container.appendChild(icon);
    transform.icon(value, icon);
  },
};

// search logic
export const search = {
  init: (e, input) => {
    const value = input.value;
    if (value == "") {
      e.preventDefault();
    } else {
      input.value = "";
      storage.search = value;
      search.data();
    }
  },
  input: (e, input) => {
    const key = e.keyCode;
    const value = input.value;
    if (key === 13) {
      if (value == "") {
        e.preventDefault();
      } else {
        input.value = "";
        storage.search = value;
        search.data();
      }
    } else if (key >= 33 && key <= 64) {
      e.preventDefault();
    } else if (key >= 123 && key <= 126) {
      e.preventDefault();
    } else if (key >= 91 && key <= 96) {
      e.preventDefault();
    }
  },
  data: async () => {
    await APIcall.cWeather();
    await APIcall.fWeather();
    await APIcall.cForecast();
    await APIcall.fForecast();
    search.removeContent();
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
    search.newData();
  },
  newData: () => {
    weatherInfo.init();
    weatherDetails.init();
    search.checkAppState();
  },
  checkAppState: () => {
    const btnActive = document.querySelector(".btn-active");
    const btnDaily = document.querySelector(".btn-daily");
    const btnHourly = document.querySelector(".btn-hourly");
    if (!btnActive) {
      // change daily format
      daily.init();
    } else if (btnActive) {
      const btnDailyActive = btnDaily.classList.contains("btn-active");
      const btnHourlyActive = btnHourly.classList.contains("btn-active");
      if (btnDailyActive == true) {
        // change daily format
        daily.init();
      } else if (btnHourlyActive == true) {
        // change hourly format
        hourly.init();
        search.sliderReset();
      }
    }
    listeners.init("value");
  },
  sliderReset: () => {
    const dot1 = document.querySelector(".dot1");
    const dot2 = document.querySelector(".dot2");
    const dot3 = document.querySelector(".dot3");
    const color2 = dot2.style.background;
    const color3 = dot3.style.background;
    const color = storage.dotColor;
    storage.slider = "";
    if (color2 == color || color3 == color) {
      dot2.style.background = "transparent";
      dot3.style.background = "transparent";
      dot1.style.background = "#a4a87898";
    }
  },
};

// transform data
const transform = {
  time: (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
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
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = date + " " + month + " " + year + " " + hour + ":" + min;
    return time;
  },
  temp: (temp) => {
    const units = storage.units;
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
  firstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  getDay: () => {
    const start = Date.now();
    const now = transform.weekDay(start);
    return now;
  },
};
