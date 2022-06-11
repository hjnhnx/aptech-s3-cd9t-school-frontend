<template>
  <Menu
    v-model:selectedKeys="selectedKeys"
    :openKeys="openKeys"
    class="h-full border-r border-gray-200"
    mode="inline"
    @openChange="onOpenChange"
  >
    <template v-for="item in navigation" :key="item.name">
      <router-link v-if="!item.children" :to="{ name: item.name }">
        <MenuItem :key="item.name">
          <component :is="item.meta?.icon" v-if="item.meta?.icon" />
          <span>{{ item.meta?.title }}</span>
        </MenuItem>
      </router-link>
      <SubMenu v-else-if="item.children" :key="item.name">
        <template #title>
          <span>
            <component :is="item.meta?.icon" v-if="item.meta?.icon" />
            <span>{{ item.meta?.title }}</span>
          </span>
        </template>
        <template
          v-for="{ name: childName, meta: childMeta } in item.children"
          :key="childName"
        >
          <router-link v-if="!childMeta?.hidden" :to="{ name: childName }">
            <MenuItem :key="childName">{{ childMeta?.title }}</MenuItem>
          </router-link>
        </template>
      </SubMenu>
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Menu, MenuItem } from "ant-design-vue";
import type { CustomRoute } from "@/types/route";
import { useAuthStore } from "@/stores/auth";

const SubMenu = Menu.SubMenu;
const router = useRouter();
const routes: CustomRoute[] = router.options.routes;
const authStore = useAuthStore();

const currentRoute = computed<string>(
  () => router.currentRoute.value.name as string
);
const parentRoute = computed<string>(
  () => router.currentRoute.value.matched[0].name as string
);
const selectedKeys = ref<string[]>([currentRoute.value]);
const openKeys = ref<string[]>([parentRoute.value]);

const navigation = computed(() =>
  routes
    .filter(
      (route) =>
        !route.meta ||
        (!route.meta.hidden &&
          (!route.meta.roles || route.meta.roles.includes(authStore.role)))
    )
    .map((route) =>
      route.children && !route.meta?.singleChild
        ? {
            ...route,
            children: route.children.filter(
              (child) => !child.meta || !child.meta.hidden
            ),
          }
        : route.children && route.children.length
        ? {
            ...route,
            ...route.children[0],
            meta: { ...route.meta, ...route.children[0].meta },
            children: undefined,
          }
        : route
    )
);

const onOpenChange = (newOpenKeys: string[]) => {
  const latestOpenKey = newOpenKeys.find(
    (key) => openKeys.value.indexOf(key) === -1
  );
  if (latestOpenKey && openKeys.value.includes(latestOpenKey)) {
    openKeys.value = [];
  } else if (latestOpenKey) {
    openKeys.value = [latestOpenKey];
  }
};
</script>
