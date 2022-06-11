<template>
  <BaseTable
    :api="SlotService.list()"
    :columns="columns"
    :on-data-loaded="(slots) => slotStore.setUser(slots)"
  />
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import { SlotService } from "@/services/slot";
import { useSlotStore } from "@/stores/slot";

const slotStore = useSlotStore();
const columns: BaseTableColumn[] = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "font-medium text-gray-900",
  },
  {
    title: "Suffix",
    dataIndex: "groupNameSuffix",
  },
  {
    title: "Start time",
    dataIndex: "startTime",
    displayType: "time",
  },
  {
    title: "End time",
    dataIndex: "endTime",
    displayType: "time",
  },
];
</script>

<style scoped></style>
