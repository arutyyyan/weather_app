<template>
  <div id="app">
    <div class="container">
      <AddCity />
      <CityInfo />
    </div>
  </div>
</template>

<script>
import AddCity from "./components/AddCity.vue";
import CityInfo from "./components/CityInfo.vue";

export default {
  name: "App",
  components: {
    AddCity,
    CityInfo,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");
#app {
  text-align: center;
  line-height: 1.5;
  font-family: "Poppins";
  font-style: normal;
  font-size: 18px;
}

.container {
  max-width: 900px;
  overflow: auto;
  margin: auto;
}
</style>
