<template>
  <BaseTable :api="SessionService.getTodaySessions()" :columns="columns">
    <template #custom="{ column, record }">
      <template v-if="column.key === 'time'">
        {{ formatTime(record.startTime) }} - {{ formatTime(record.endTime) }}
      </template>
      <template v-if="column.key === 'status'">
        <SessionBadge :session="record" />
      </template>
    </template>
    <template #actions="{ record }">
      <a
        v-if="canTakeAttendance(record)"
        href="javascript:"
        @click="onClickTakeAttendance(record)"
        >Take attendance</a
      >
    </template>
  </BaseTable>
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import { SessionService } from "@/services/session";
import {
  formatTime,
  getSessionEndTime,
  getSessionStartTime,
} from "@/utils/utils";
import SessionBadge from "@/components/badges/SessionBadge.vue";
import router from "@/router";
import type { Session } from "@/types/models";
import { SessionStatus } from "@/types/enums";
import dayjs from "dayjs";

const columns: BaseTableColumn[] = [
  {
    title: "Class",
    dataIndex: "groupName",
  },
  {
    title: "Subject",
    dataIndex: "subjectName",
    className: "font-medium text-gray-900",
  },
  {
    title: "Time",
    key: "time",
    displayType: "custom",
  },
  {
    title: "Status",
    dataIndex: "status",
    displayType: "custom",
  },
  {
    title: "Room number",
    dataIndex: "roomNumber",
  },
];

const onClickTakeAttendance = (record: Session) => {
  router.push({ name: "takeAttendance", params: { id: record.id } });
};

const canTakeAttendance = (record: Session) => {
  return (
    record.status === SessionStatus.PENDING &&
    getSessionEndTime(record).add(30, "minutes") > dayjs() &&
    getSessionStartTime(record) < dayjs()
  );
};
</script>

<style scoped></style>
