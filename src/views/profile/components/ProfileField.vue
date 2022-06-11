<template>
  <div>
    <dt class="text-sm font-medium text-gray-500">
      <slot name="label">
        {{ label }}
      </slot>
    </dt>
    <dd class="mt-1 text-sm text-gray-900">
      <slot>
        {{ content }}
      </slot>
    </dd>
  </div>
</template>

<script lang="ts" setup>
interface ProfileFieldProps {
  label?: string;
  content?: unknown;
}

defineProps<ProfileFieldProps>();
</script>
