<template>
  <Select
    :loading="isLoading"
    :options="options"
    :value="value"
    placeholder="Select a teacher"
    style="width: 100%"
    @change="onChange"
  ></Select>
</template>

<script lang="ts" setup>
import { Select } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { computed } from "vue";
import { useTeacherStore } from "@/stores/teacher";
import type { Teacher } from "@/types/models";

interface ProgramSelectProps {
  value?: number;
}

defineProps<ProgramSelectProps>();
const emits = defineEmits(["update:value"]);
const teacherStore = useTeacherStore();

const teachers = computed<Teacher[]>(() => teacherStore.teachers);
const options = computed<SelectProps["options"]>(() =>
  teachers.value.map((teacher) => ({
    value: teacher.id,
    label: teacher.lastName + " " + teacher.firstName,
  }))
);
const isLoading = computed(() => !teacherStore.hasFetched);

if (!teacherStore.hasFetched) {
  teacherStore.get();
}

const onChange = (value: number) => {
  emits("update:value", value);
};
</script>
