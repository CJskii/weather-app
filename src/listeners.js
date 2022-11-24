import { storage } from "./data";
import { hourly, daily, search, transform } from "./weather";

// event listeners
export const listeners = {
  init: (value) => {
    const left = document.querySelector(".slide-left");
    const right = document.querySelector(".slide-right");
    const dot1 = document.querySelector(".dot1");
    const dot2 = document.querySelector(".dot2");
    const dot3 = document.querySelector(".dot3");
    const btnDaily = document.querySelector(".btn-daily");
    const btnHourly = document.querySelector(".btn-hourly");
    const slider = document.querySelector(".slider");
    const input = document.querySelector("input");
    const searchIcon = document.querySelector(".search-icon");
    const toggleBtn = document.querySelector(".toggle");
    if (!value) {
      left.addEventListener("click", (e) =>
        listeners.left(e, dot1, dot2, dot3)
      );
      right.addEventListener("click", (e) =>
        listeners.right(e, dot1, dot2, dot3)
      );
    }
    btnDaily.addEventListener("click", (e) =>
      listeners.daily(e, btnDaily, btnHourly, slider)
    );
    btnHourly.addEventListener("click", (e) =>
      listeners.hourly(e, btnDaily, btnHourly, slider)
    );
    toggleBtn.addEventListener("click", (e) => toggle.init(e));
    searchIcon.addEventListener("click", (e) => search.init(e, input));
    input.addEventListener("keypress", (e) => search.input(e, input));
  },
  left: (e, dot1, dot2, dot3) => {
    const color1 = dot1.style.background;
    const color2 = dot2.style.background;
    const color3 = dot3.style.background;
    const color = storage.dotColor;
    if (storage.slider == "extend") {
      if (color1 == color) {
        storage.slider = "";
        dot1.style.background = "transparent";
        dot3.style.background = "#a4a87898";
        items.renderLeft("3");
      } else if (color2 == color) {
        dot2.style.background = "transparent";
        dot1.style.background = "#a4a87898";
        items.renderLeft("4");
      } else if (color3 == color) {
        dot3.style.background = "transparent";
        dot2.style.background = "#a4a87898";
        items.renderLeft("5");
      }
    } else if (color1 == color) {
      return;
    } else if (color2 == color) {
      dot1.style.background = "#a4a87898";
      dot2.style.background = "transparent";
      items.renderLeft("1");
    } else if (color3 == color) {
      dot2.style.background = "#a4a87898";
      dot3.style.background = "transparent";
      items.renderLeft("2");
    }
  },
  right: (e, dot1, dot2, dot3) => {
    const color1 = dot1.style.background;
    const color2 = dot2.style.background;
    const color3 = dot3.style.background;
    const color = storage.dotColor;
    if (storage.slider == "extend") {
      if (color3 == color) {
        return;
      } else if (color1 == color) {
        dot1.style.background = "transparent";
        dot2.style.background = "#a4a87898";
        items.renderRight("5");
      } else if (color2 == color) {
        dot2.style.background = "transparent";
        dot3.style.background = "#a4a87898";
        items.renderRight("6");
      }
    } else if (color1 == color && storage.slider == "") {
      dot1.style.background = "transparent";
      dot2.style.background = "#a4a87898";
      items.renderRight("2");
    } else if (color2 == color) {
      dot3.style.background = "#a4a87898";
      dot2.style.background = "transparent";
      items.renderRight("3");
    } else if (color3 == color) {
      dot1.style.background = "#a4a87898";
      dot3.style.background = "transparent";
      storage.slider = "extend";
      items.renderRight("4");
    }
  },
  daily: (e, btn1, btn2, slider) => {
    const dot1 = document.querySelector(".dot1");
    const dot2 = document.querySelector(".dot2");
    const dot3 = document.querySelector(".dot3");
    dot1.style.background = "#a4a87898";
    dot2.style.background = "transparent";
    dot3.style.background = "transparent";
    storage.slider = "";
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

// toggle temperature
const toggle = {
  init: () => {
    const units = storage.units;
    const btn = document.querySelector(".toggle");
    if (units == "imperial") {
      storage.units = "metric";
      btn.textContent = "Display in °F";
      toggle.dataCall("C");
    } else if (units == "metric") {
      storage.units = "imperial";
      btn.textContent = "Display in °C";
      toggle.dataCall("F");
    }
  },
  dataCall: async (display) => {
    let weatherData;
    let forecastData;
    if (display == "C") {
      weatherData = storage.cWeather;
      forecastData = storage.cForecast;
    } else if (display == "F") {
      weatherData = storage.fWeather;
      forecastData = storage.fForecast;
    }
    toggle.temp(weatherData);
    toggle.forecast(forecastData);
  },
  temp: (obj) => {
    const main = document.querySelector(".temperature");
    const temp = obj[0].main.temp;
    main.textContent = transform.temp(temp);
    const feels = document.querySelector(".feels-like");
    const feelsLike = obj[0].main.feels_like;
    feels.textContent = transform.temp(feelsLike);
  },
  forecast: (obj) => {
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
    toggle.checker(obj);
  },
  checker: () => {
    const btnActive = document.querySelector(".btn-active");
    const btnDaily = document.querySelector(".btn-daily");
    const btnHourly = document.querySelector(".btn-hourly");
    if (!btnActive) {
      // change daily format
      toggle.dailyHandler();
    } else if (btnActive) {
      const btnDailyActive = btnDaily.classList.contains("btn-active");
      const btnHourlyActive = btnHourly.classList.contains("btn-active");
      if (btnDailyActive == true) {
        // change daily format
        toggle.dailyHandler();
      } else if (btnHourlyActive == true) {
        // change hourly format
        toggle.hourlyHandler();
      }
    }
  },
  dailyHandler: () => {
    const noon = daily.storageNoon;
    for (let i = 0; i < noon.length; i++) {
      const weekDay = noon[i].weekDay;
      const container = document.querySelector(`.forecast${weekDay}`);
      if (container) {
        container.children[1].textContent = noon[i].temperature;
      }
    }
    const night = daily.storageNight;
    for (let i = 0; i < night.length; i++) {
      const weekDay = night[i].weekDay;
      const container = document.querySelector(`.forecast${weekDay}`);
      if (container) {
        container.children[2].textContent = night[i].temperature;
      }
    }
  },
  hourlyHandler: () => {
    let obj;
    const units = storage.units;
    if (units == "metric") {
      obj = storage.cForecast;
    } else if (units == "imperial") {
      obj = storage.fForecast;
    }
    const length = obj[0].list.length;
    for (let i = 0; i < length; i++) {
      const container = document.querySelector(`.forecast${i}`);
      container.children[2].textContent = transform.temp(
        obj[0].list[i].main.temp
      );
    }
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
    } else if (value == "4") {
      for (let i = 12; i < 18; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 18; i < 24; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    } else if (value == "5") {
      for (let i = 18; i < 24; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 24; i < 30; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    } else if (value == "6") {
      for (let i = 24; i < 30; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 30; i < 36; i++) {
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
    } else if (value == "3") {
      for (let i = 18; i < 24; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 12; i < 18; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    } else if (value == "4") {
      for (let i = 24; i < 30; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 18; i < 24; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "flex";
      }
    } else if (value == "5") {
      for (let i = 30; i < 36; i++) {
        const item = document.querySelector(`.forecast${i}`);
        item.style.display = "none";
      }
      for (let i = 24; i < 30; i++) {
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
    daily.init();
  },
  hourlyForecast: () => {
    const container = document.querySelector(".forecast");
    const length = container.children.length;
    for (let i = 0; i < length; i++) {
      container.lastChild.remove();
    }
    hourly.init();
  },
};
