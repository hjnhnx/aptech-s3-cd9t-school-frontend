<template>
  <Result
    status="404"
    sub-title="Sorry, the page you visited does not exist."
    title="404"
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
