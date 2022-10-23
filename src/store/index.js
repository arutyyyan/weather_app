import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    city: [
      {
        name: "Astana",
        weather: "",
        lon: "71.47",
        lat: "51.16",
        showWeather: false,
      },
      {
        name: "Paris",
        weather: "",
        lon: "2.35",
        lat: "48.85",
        showWeather: false,
      },
    ],
  },
  getters: {
    allCities: (state) => state.city,
  },
  mutations: {
    changeVisibility(state, payload) {
      state.city[payload.index]["showWeather"] = !payload.showWeather;
    },
    assignWeather(state, payload) {
      state.city[payload.index]["weather"] = payload.weather;
    },
    addCity(state, payload) {
      if (payload.index == -1) {
        state.city.push({
          lon: payload.lon,
          lat: payload.lat,
          name: payload.name,
          weather: payload.weather,
          showWeather: false,
        });
      } else {
        state.city[payload.index] = {
          lon: payload.lon,
          lat: payload.lat,
          name: payload.name,
          weather: payload.weather,
          showWeather: false,
        };
      }
    },
    deleteCity(state, index) {
      state.city.splice(index, 1);
    },
  },
  actions: {
    async findWeather(context, payload) {
      let weather = {};
      const options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
        params: { lon: payload.lon, lat: payload.lat },
        headers: {
          "X-RapidAPI-Key":
            "dfe143a338msh7f86b9382a8a96ep1cfa02jsn1049462f00a1",
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          const data = response.data.data[0];

          weather["Timezone"] = data.timezone;
          weather["Weather"] = data.weather.description;
          weather["Temperature"] = data.temp;
          weather["Wind direction"] = data.wind_cdir_full;
          weather["Wind speed"] = data.wind_spd.toFixed(0) + "m/s";
        })
        .catch(function (error) {
          console.error(error);
        });

      context.commit("assignWeather", {
        index: payload.index,
        weather,
      });
    },
    async findCity(context, payload) {
      let cityName = "";
      let weather = {};
      const options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
        params: { lon: payload.lon, lat: payload.lat },
        headers: {
          "X-RapidAPI-Key":
            "dfe143a338msh7f86b9382a8a96ep1cfa02jsn1049462f00a1",
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          const data = response.data.data[0];
          cityName = data.city_name;
          weather["Timezone"] = data.timezone;
          weather["Weather"] = data.weather.description;
          weather["Temperature"] = data.temp;
          weather["Wind direction"] = data.wind_cdir_full;
          weather["Wind speed"] = data.wind_spd.toFixed(0) + "m/s";
        })
        .catch(function (error) {
          console.error(error);
        });

      context.commit("addCity", {
        index: payload.index,
        lon: payload.lon,
        lat: payload.lat,
        name: cityName,
        weather: weather,
      });
    },
  },
});

export default store;
