<template>
  <Select
    :loading="isLoading"
    :options="options"
    :value="value"
    placeholder="Select a program"
    style="width: 100%"
    @change="onChange"
  ></Select>
</template>

<script lang="ts" setup>
import { Select } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { computed } from "vue";
import { useProgramStore } from "@/stores/program";
import type { Program } from "@/types/models";

interface ProgramSelectProps {
  value?: number;
}

defineProps<ProgramSelectProps>();
const emits = defineEmits(["update:value"]);
const programStore = useProgramStore();

const programs = computed<Program[]>(() => programStore.programs);
const options = computed<SelectProps["options"]>(() =>
  programs.value.map((program) => ({
    value: program.id,
    label: `[${program.programCode}] ${program.programName}`,
  }))
);
const isLoading = computed(() => !programStore.hasFetched);

if (!programStore.hasFetched) {
  programStore.get();
}

const onChange = (value: number) => {
  emits("update:value", value);
};
</script>
