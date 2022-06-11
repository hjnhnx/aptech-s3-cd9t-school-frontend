<template>
  <div class="sm:px-6 md:px-8">
    <LayoutFooter class="border-t border-gray-200 text-center text-gray-500">
      <span>Copyright ©{{ year }} Coder 9 Tuoi.</span>
      <span class="hidden sm:ml-2 sm:inline-block">All rights reserved.</span>
    </LayoutFooter>
  </div>
</template>

<script lang="ts" setup>
import { LayoutFooter } from "ant-design-vue";

const year = new Date().getFullYear();
</script>

<style lang="less" scoped>
.ant-layout-footer {
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
}
</style>
