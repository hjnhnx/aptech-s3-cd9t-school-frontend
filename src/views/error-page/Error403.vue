<template>
  <Result
    status="403"
    sub-title="Sorry, you are not authorized to access this page."
    title="403"
  >
    <template #extra>
      <router-link :to="{ name: 'home' }">
        <Button type="primary">Back Home</Button>
      </router-link>
    </template>
  </Result>
</template>

<script lang="ts" setup>
import { Result, Button } from "ant-design-vue";
</script>

<style scoped></style>
