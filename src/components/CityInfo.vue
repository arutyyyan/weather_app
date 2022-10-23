<template>
  <div>
    <div class="cities">
      <div
        class="city"
        v-for="(city, index) in allCities"
        :key="index"
        @click="
          checkWeather(index, city.lon, city.lat, city.weather),
            change(index, city.showWeather)
        "
      >
        {{ city.name }} {{ city.lon }} {{ city.lat }}
        <div v-if="city.showWeather" class="weather">
          <div v-for="(key, value, ind) in city.weather" :key="ind">
            {{ value }}: {{ key }}
          </div>
        </div>
        <i
          @click="editCity(index)"
          id="edit"
          class="fa-regular fa-pen-to-square"
        ></i>
        <i
          @click="deleteCity(index)"
          id="delete"
          class="fa-solid fa-xmark fa-lg"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "CityInfo",
  computed: mapGetters(["allCities"]),
  methods: {
    ...mapActions(["findWeather"]),
    ...mapMutations(["changeVisibility", "deleteCity"]),
    checkWeather(index, lon, lat, weather) {
      if (!weather) {
        const payload = {
          index,
          lon,
          lat,
        };
        console.log("find weather");
        this.findWeather(payload);
      }
    },
    change(index, showWeather) {
      const payload = {
        index,
        showWeather,
      };
      this.changeVisibility(payload);
    },
    editCity(index) {
      this.emitter.emit("edit-city", index);
    },
  },
};
</script>

<style scoped>
.cities {
  display: grid;
  grid-gap: 30px;
}
.city {
  background: linear-gradient(274.42deg, #92a3fd 0%, #9dceff 124.45%);
  box-shadow: 0px 10px 22px rgba(149, 173, 254, 0.3);
  border: 1px solid lightblue;
  border-radius: 5px;
  padding: 10px;
  color: black;
  cursor: pointer;
  position: relative;
}
#delete {
  position: absolute;
  top: 17px;
  right: 10px;
  cursor: pointer;
  color: rgb(92, 92, 92);
}
#edit {
  position: absolute;
  top: 8.5px;
  right: 32px;
  cursor: pointer;
  color: rgb(92, 92, 92);
}
.weather {
  color: rgb(92, 92, 92);
}
</style>