<template>
  <div>
    <h3>City Weather</h3>
    <!-- <button @click="increment">increment</button> -->
    <form action="">
      <input type="text" id="lon" v-model="lon" placeholder="Longitide" />
      <input type="text" id="lat" v-model="lat" placeholder="Latitude" />
      <button @click.prevent="addCity">Add a city</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddCity",
  data() {
    return {
      lat: "",
      lon: "",
      index: -1,
    };
  },
  computed: mapGetters(["allCities"]),
  methods: {
    ...mapActions(["findCity"]),
    addCity() {
      const payload = {
        lon: this.lon,
        lat: this.lat,
        index: this.index,
      };
      this.index = -1;
      this.findCity(payload);
    },
  },
  mounted() {
    this.emitter.on("edit-city", (index) => {
      this.lon = this.allCities[index].lon;
      this.lat = this.allCities[index].lat;
      this.index = index;
    });
  },
};
</script>

<style scoped>
form {
  display: flex;
  margin: 20px 0px;
  height: 40px;
}
input[type="text"] {
  flex: 2;
  background: #f7f8f8;
  border: 2px solid lightblue;
  border-radius: 5px;
  text-align: center;
  line-height: 3;
  font-family: "Poppins";
  font-style: normal;
  font-size: 16px;
}
button {
  flex: 1;
  background: linear-gradient(274.42deg, #92a3fd 0%, #9dceff 124.45%);
  border: 2px solid lightblue;
  border-radius: 5px;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-size: 16px;
  cursor: pointer;
}
</style>