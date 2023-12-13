import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes: routes
  });

  return router;
}

export default Router();
