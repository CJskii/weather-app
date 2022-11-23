// API data
export const APIcall = {
  // get data from the API
  cWeather: async () => {
    try {
      const city = storage.search;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=3e551ddc1e7a94f0f602ed66e45dc2ba`,
        { mode: "cors" }
      );
      const data = await response.json();
      storage.init(data, "CW");
    } catch (err) {
      console.log(err);
    }
  },
  cForecast: async () => {
    try {
      const city = storage.search;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=3e551ddc1e7a94f0f602ed66e45dc2ba`,
        { mode: "cors" }
      );
      const data = await response.json();
      storage.init(data, "CF");
    } catch (err) {
      console.log(err);
    }
  },
  fWeather: async () => {
    try {
      const city = storage.search;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=3e551ddc1e7a94f0f602ed66e45dc2ba`,
        { mode: "cors" }
      );
      const data = await response.json();
      storage.init(data, "FW");
    } catch (err) {
      console.log(err);
    }
  },
  fForecast: async () => {
    try {
      const city = storage.search;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=3e551ddc1e7a94f0f602ed66e45dc2ba`,
        { mode: "cors" }
      );
      const data = await response.json();
      storage.init(data, "FF");
    } catch (err) {
      console.log(err);
    }
  },
};

// storage functions
export const storage = {
  init: (obj, type) => {
    if (type == "CW") {
      const length = storage.cWeather.length;
      if (length > 0) {
        storage.cWeather = [];
        storage.cWeather.push(obj);
      } else {
        storage.cWeather.push(obj);
      }
    } else if (type == "FW") {
      const length = storage.fWeather.length;
      if (length > 0) {
        storage.fWeather = [];
        storage.fWeather.push(obj);
      } else {
        storage.fWeather.push(obj);
      }
    } else if (type == "CF") {
      const length = storage.cForecast.length;
      if (length > 0) {
        storage.cForecast = [];
        storage.cForecast.push(obj);
      } else {
        storage.cForecast.push(obj);
      }
    } else if (type == "FF") {
      const length = storage.fForecast.length;
      if (length > 0) {
        storage.fForecast = [];
        storage.fForecast.push(obj);
      } else {
        storage.fForecast.push(obj);
      }
    }
  },
  cWeather: [],
  fWeather: [],
  cForecast: [],
  fForecast: [],
  units: "metric",
  search: "London",
  slider: "",
  dotColor: "rgba(164, 168, 120, 0.596)",
  noon: [],
  night: [],
};
