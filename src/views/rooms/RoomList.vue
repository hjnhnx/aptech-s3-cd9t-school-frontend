<template>
  <BaseTable
    :api="RoomService.list()"
    :columns="columns"
    :on-data-loaded="(rooms) => roomStore.setUser(rooms)"
    row-key="groupName"
  >
    <template #custom="{ column, text }">
      <template v-if="column.dataIndex === 'roomType'">
        {{ toCapitalize(RoomType[text]) }}
      </template>
      <template v-else-if="column.dataIndex === 'isDisabled'">
        <Switch :checked="!text" :disabled="true" />
      </template>
    </template>
  </BaseTable>
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import { Switch } from "ant-design-vue";
import { RoomType } from "@/types/enums";
import { toCapitalize } from "@/utils/utils";
import { RoomService } from "@/services/room";
import { useRoomStore } from "@/stores/room";

const columns: BaseTableColumn[] = [
  {
    title: "Room number",
    dataIndex: "roomNumber",
    className: "font-medium text-gray-900",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
  },
  {
    title: "Room type",
    dataIndex: "roomType",
    displayType: "custom",
  },
  {
    title: "Available",
    dataIndex: "isDisabled",
    displayType: "custom",
  },
];

const roomStore = useRoomStore();
</script>

<style scoped></style>
