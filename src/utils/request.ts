import axios from "axios";
import { notification } from "ant-design-vue";
import { appLocalStorage } from "@/utils/storage";
import { AUTHORIZATION_KEY } from "@/utils/constants";
import router from "@/router";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 20000,
});

$axios.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(AUTHORIZATION_KEY)}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }),
  (error) => Promise.reject(error)
);

$axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    const res = error.response;
    const status = res.status;
    if (status == 401) {
      appLocalStorage.removeItem(AUTHORIZATION_KEY);
      notification.error({
        message: "Error",
        description: "Please login to continue.",
      });
      router.push({ name: "login" }).then();
    } else if (status == 403) {
      router.push({ name: "403" }).then();
    } else if (status === 404) {
      router.push({ name: "404" }).then();
    } else {
      const message = error.response?.data?.Message;
      if (message) {
        notification.error({ message });
      }
      return Promise.reject(error);
    }
  }
);

export { $axios };
