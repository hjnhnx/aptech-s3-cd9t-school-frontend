<template>
  <Select
    :loading="isLoading"
    :options="options"
    :value="value"
    placeholder="Select a slot"
    style="width: 100%"
    @change="onChange"
  ></Select>
</template>

<script lang="ts" setup>
import { Select } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { computed } from "vue";
import { useSlotStore } from "@/stores/slot";
import type { Slot } from "@/types/models";

interface ProgramSelectProps {
  value?: number;
}

defineProps<ProgramSelectProps>();
const emits = defineEmits(["update:value"]);
const slotStore = useSlotStore();

const slots = computed<Slot[]>(() => slotStore.slots);
const options = computed<SelectProps["options"]>(() =>
  slots.value.map((slot) => ({
    value: slot.id,
    label: slot.name,
  }))
);
const isLoading = computed(() => !slotStore.hasFetched);

if (!slotStore.hasFetched) {
  slotStore.get();
}

const onChange = (value: number) => {
  emits("update:value", value);
};
</script>
