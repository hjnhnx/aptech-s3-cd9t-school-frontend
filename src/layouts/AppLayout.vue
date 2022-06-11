<template>
  <Spin v-if="!user">
    <div class="h-screen w-screen"></div>
  </Spin>
  <div v-else class="h-screen overflow-hidden bg-gray-100">
    <AppHeader class="z-20" />
    <div class="mt-16">
      <div class="h-content flex overflow-hidden bg-gray-100">
        <div class="hidden md:flex md:flex-shrink-0">
          <div class="flex w-64 flex-col">
            <AppSidebar class="z-10" />
          </div>
        </div>
        <div class="flex w-0 flex-1 flex-col overflow-hidden">
          <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none">
            <router-view />
            <AppFooter />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "@/layouts/partials/AppHeader.vue";
import AppSidebar from "@/layouts/partials/Navigation.vue";
import AppFooter from "@/layouts/partials/AppFooter.vue";
import { computed } from "vue";
import type { User } from "@/types/models";
import { useAuthStore } from "@/stores/auth";
import { Spin } from "ant-design-vue";

const authStore = useAuthStore();
const user = computed<User | undefined>(() => authStore.user);

if (!user.value) {
  authStore.getProfile();
}
</script>
