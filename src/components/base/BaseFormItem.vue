<template>
  <FormItem :class="['col-span-12', getColumnClass]" v-bind="$attrs">
    <slot></slot>
  </FormItem>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from "vue";
import { FormItem } from "ant-design-vue";
import type { FormItemProps } from "ant-design-vue/es";

interface BaseFormItemProps extends FormItemProps {
  colSpan?: number;
}

const props = withDefaults(defineProps<BaseFormItemProps>(), {
  colSpan: 12,
});

const getColumnClass = computed(() => {
  switch (props.colSpan) {
    case 1:
      return "lg:col-span-1";
    case 2:
      return "lg:col-span-2";
    case 3:
      return "lg:col-span-3";
    case 4:
      return "lg:col-span-4";
    case 5:
      return "lg:col-span-5";
    case 6:
      return "lg:col-span-6";
    case 7:
      return "lg:col-span-7";
    case 8:
      return "lg:col-span-8";
    case 9:
      return "lg:col-span-9";
    case 10:
      return "lg:col-span-10";
    case 11:
      return "lg:col-span-11";
    default:
      return "lg:col-span-12";
  }
});
</script>

<style lang="less">
@media (max-width: 575px) {
  .ant-form .ant-form-item .ant-form-item-label,
  .ant-form .ant-form-item .ant-form-item-control {
    flex: initial;
  }
}
</style>
