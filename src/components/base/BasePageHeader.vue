<template>
  <div
    class="mx-auto border-b border-gray-200 bg-white py-6 px-4 sm:px-6 md:px-8"
  >
    <div>
      <nav aria-label="Back" class="sm:hidden">
        <a
          class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          href="#"
          @click="router.back()"
        >
          <ChevronLeftIcon
            aria-hidden="true"
            class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
          />
          Back
        </a>
      </nav>
      <nav aria-label="Breadcrumb" class="hidden sm:flex">
        <ol class="flex items-center space-x-4" role="list">
          <li>
            <div class="flex">
              <router-link
                :to="{ name: 'home' }"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                <HomeIcon
                  aria-hidden="true"
                  class="h-5 w-5 flex-shrink-0 text-gray-400"
                />
              </router-link>
            </div>
          </li>
          <li v-if="parentRoute">
            <div class="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                class="h-5 w-5 flex-shrink-0 text-gray-400"
              />
              <router-link
                :to="{ name: parentRoute.name }"
                class="ml-4 text-sm text-gray-500 hover:text-gray-700"
                >{{ parentRoute.meta?.title }}
              </router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                class="h-5 w-5 flex-shrink-0 text-gray-400"
              />
              <span aria-current="page" class="ml-4 text-sm text-gray-500">{{
                pageTitle
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mt-3 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2
          class="mb-0 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
        >
          <slot name="title">
            {{ title || pageTitle }}
          </slot>
        </h2>
      </div>
      <div class="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
        <slot name="actions" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import {
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
import { computed } from "vue";

interface BasePageHeaderProps {
  title?: string;
}

defineProps<BasePageHeaderProps>();

const router = useRouter();
const pageTitle = computed(() => router.currentRoute.value.meta?.title);
const currentRoute = computed(() => router.currentRoute.value);
const parentRoute = computed(() => {
  const parent = router.currentRoute.value.matched[0];
  if (
    parent.name === currentRoute.value?.name ||
    parent.path === currentRoute.value?.path
  ) {
    return null;
  }
  return parent;
});
</script>
