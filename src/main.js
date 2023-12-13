import { createApp } from "vue";
import App from "./App.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import PrimeVue from "primevue/config";
import VueApexCharts from "vue3-apexcharts";
import Loading from "vue-loading-overlay";

import "vue3-easy-data-table/dist/style.css";
import "primevue/resources/themes/bootstrap4-light-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "vue-loading-overlay/dist/css/index.css";

import router from "./routers/routes";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable).component("loading", Loading);
app.use(router);
app.use(PrimeVue).use(VueApexCharts).use(Loading, {
  color: "#0AC5A0",
  width: 128,
  height: 128,
  backgroundColor: "#494F67"
});

app.mount("#app");
