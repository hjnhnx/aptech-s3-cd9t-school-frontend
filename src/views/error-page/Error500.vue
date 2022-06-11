<template>
  <Result status="500" sub-title="Sorry, the server is wrong." title="500">
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
