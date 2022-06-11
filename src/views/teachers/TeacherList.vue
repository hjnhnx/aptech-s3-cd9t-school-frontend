<template>
  <BaseTable
    :api="TeacherService.list()"
    :columns="columns"
    :on-data-loaded="(teachers) => teacherStore.setUser(teachers)"
  />
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import { TeacherService } from "@/services/teacher";
import { useTeacherStore } from "@/stores/teacher";
import type { Teacher } from "@/types/models";
import { h } from "vue";

const teacherStore = useTeacherStore();
const columns: BaseTableColumn[] = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Full name",
    dataIndex: "firstName",
    customRender: ({ record }) => {
      const teacher = record as Teacher;
      return h("div", {
        innerHTML: `${teacher.lastName} ${teacher.firstName}`,
      });
    },
  },
];
</script>

<style scoped></style>
