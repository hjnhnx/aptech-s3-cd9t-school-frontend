<template>
  <div
    class="flex min-h-screen items-center justify-center px-4 pt-12 pb-20 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <Logo
          class="mx-auto h-12 w-auto text-primary-600"
          fill="currentcolor"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          CD9T School
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <template v-if="isLoading">
            <Spin />
            <span class="mt-4 ml-2 inline-block">Please wait</span>
          </template>
          <span v-else>Login to your account</span>
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <div class="flex items-center justify-center">
          <GoogleLogin
            v-if="!isLoading"
            :callback="callback"
            :client-id="clientId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AuthService } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { notification, Spin } from "ant-design-vue";
import { Logo } from "@/components";
import { onMounted, ref } from "vue";
import { googleOneTap, GoogleLogin } from "vue3-google-login";
import router from "@/router";
import { AUTHORIZATION_KEY } from "@/utils/constants";
import type { CallbackTypes } from "vue3-google-login";

const userStore = useAuthStore();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const isLoading = ref(false);

const onSuccess = (token: string) => {
  isLoading.value = true;
  AuthService.login({
    token,
  })
    .then(({ data }) => {
      window.localStorage.setItem(AUTHORIZATION_KEY, token);
      userStore.setUser(data);
      router.push({ name: "home" });
      isLoading.value = false;
    })
    .catch((e) => {
      console.log(e);
      notification.error({
        message: "Authentication failed.",
      });
      isLoading.value = false;
    });
};

const showGoogleOneTap = () => {
  googleOneTap({ clientId })
    .then((response) => {
      onSuccess(response.credential);
    })
    .catch((e) => {
      console.log(e);
    });
};

const callback: CallbackTypes.CredentialCallback = (response) => {
  onSuccess(response.credential);
};

onMounted(() => {
  showGoogleOneTap();
});
</script>
