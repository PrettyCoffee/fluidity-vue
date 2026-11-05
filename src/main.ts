import { createPinia } from "pinia"
import { createApp, type Component } from "vue"

import App from "./app.vue"
import router from "./router"
// oxlint-disable-next-line import/no-unassigned-import
import "./assets/main.css"

const app = createApp(App as Component)

app.use(createPinia())
app.use(router)

app.mount("#app")
