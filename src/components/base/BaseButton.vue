<template>
  <button
    class="rounded-full bg-primary-600 p-1 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
    type="button"
  >
    <slot name="icon">
      <component :is="icon" v-if="icon" aria-hidden="true" class="h-6 w-6" />
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { withDefaults, type Component } from "vue";

type BaseButtonShape = "default" | "circle" | "round";
type BaseButtonSize = "large" | "middle" | "small";
type BaseButtonType =
  | "primary"
  | "ghost"
  | "dashed"
  | "link"
  | "text"
  | "default";

interface BaseButtonProps {
  block?: boolean;
  danger?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  href?: string;
  htmlType?: string;
  loading?: boolean;
  shape?: BaseButtonShape;
  size?: BaseButtonSize;
  isExternal?: boolean;
  type?: BaseButtonType;
  icon?: Component;
}

withDefaults(defineProps<BaseButtonProps>(), {
  block: false,
  danger: false,
  disabled: false,
  ghost: false,
  htmlType: "button",
  loading: false,
  shape: "default",
  size: "middle",
  isExternal: false,
  type: "default",
});
</script>
