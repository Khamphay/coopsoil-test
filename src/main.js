import { createApp } from "vue";
import App from "./App.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import PrimeVue from "primevue/config";
import VueApexCharts from "vue3-apexcharts";

import "vue3-easy-data-table/dist/style.css";
//theme
import "primevue/resources/themes/bootstrap4-light-purple/theme.css";
//core
import "primevue/resources/primevue.min.css";
//Icon
import "primeicons/primeicons.css";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable);
app.use(PrimeVue).use(VueApexCharts);

app.mount("#app");
