import { createApp, watchEffect } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style/index.less";
import { useAuthStore } from "@/stores/auth";
import { ConfigProvider } from "ant-design-vue";
import { getThemeColor } from "@/utils/utils";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

const authStore = useAuthStore();

watchEffect(() => {
  ConfigProvider.config({
    theme: {
      primaryColor: getThemeColor(authStore.role),
    },
  });
});
