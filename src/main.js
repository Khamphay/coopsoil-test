import { createApp } from "vue";
import App from "./App.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import PrimeVue from "primevue/config";
import VueApexCharts from "vue3-apexcharts";
import Loading from "vue-loading-overlay";

import "vue3-easy-data-table/dist/style.css";
//theme
import "primevue/resources/themes/bootstrap4-light-purple/theme.css";
//core
import "primevue/resources/primevue.min.css";
//Icon
import "primeicons/primeicons.css";
//Loading css
import "vue-loading-overlay/dist/css/index.css";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable).component("loading", Loading);
app.use(PrimeVue).use(VueApexCharts).use(Loading, {
  color: "#0AC5A0",
  width: 128,
  height: 128,
  backgroundColor: "#494F67"
});

app.mount("#app");
