<template>
  <Select
    :disabled="isDisabled"
    :options="options"
    :value="value"
    placeholder="Select a term"
    style="width: 100%"
    @change="onChange"
  ></Select>
</template>

<script lang="ts" setup>
import { Select } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { computed, watchEffect } from "vue";
import { useProgramStore } from "@/stores/program";
import type { Program } from "@/types/models";

interface ProgramSelectProps {
  value?: number;
  programId?: number;
}

const props = defineProps<ProgramSelectProps>();
const emits = defineEmits(["update:value"]);
const programStore = useProgramStore();

const programs = computed<Program[]>(() => programStore.programs);
const options = computed<SelectProps["options"]>(() => {
  const program = programs.value.find(
    (program) => program.id === props.programId
  );
  if (program) {
    return program.terms.map((term) => ({
      value: term.id,
      label: "Term " + term.termNumber,
    }));
  }
  return [];
});

const isDisabled = computed(() => !programStore.hasFetched || !props.programId);
if (!programStore.hasFetched && !programStore.isFetching) {
  programStore.get();
}

const onChange = (value?: number) => {
  emits("update:value", value);
};

watchEffect(() => {
  if (
    props.value &&
    !options.value?.find((option) => option.value === props.value)
  ) {
    onChange(undefined);
  }
});
</script>
