import { createRouter, createWebHistory } from "vue-router"

import SettingsView from "../views/settings-view.vue"
import StartpageView from "../views/startpage-view.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "startpage",
      component: StartpageView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
  ],
})

export default router
