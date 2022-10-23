import * as Vue from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import mitt from "mitt";

const emitter = mitt();

const app = Vue.createApp(App);
app.use(store);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
