import * as Vue from "vue";
import App from "./App.vue";
import store from "./store/index.js";

const app = Vue.createApp(App);
app.use(store);
app.mount("#app");
