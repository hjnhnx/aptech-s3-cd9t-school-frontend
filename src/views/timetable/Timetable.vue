<template>
  <BasePageHeader :title="selectedDate.format('MMMM YYYY')">
    <template #actions>
      <div class="flex justify-end gap-2">
        <DatePicker v-model:value="month" format="MMMM YYYY" picker="month" />
        <Button type="primary" @click="getTimetableData">Get timetable</Button>
      </div>
    </template>
  </BasePageHeader>
  <BaseMain>
    <Spin :spinning="isLoading">
      <div class="overflow-hidden rounded-xl">
        <Calendar
          v-model:value="selectedDate"
          :disabled-date="isDisabledDate"
          @change="onDateChange"
        >
          <template #headerRender></template>
          <template #dateCellRender="{ current }">
            <Tag
              v-if="holidays && holidays[current.format(DB_DATE_FORMAT)]"
              class="block w-full bg-primary-700 text-white"
            >
              <template #icon>
                <SmileOutlined />
              </template>
              {{ holidays[current.format(DB_DATE_FORMAT)] }}
            </Tag>
            <ul v-if="schedule">
              <li v-for="item in getSessionsByDate(current)" :key="item.id">
                <Popover :title="item.subjectName" placement="right">
                  <template #content>
                    <Descriptions
                      :bordered="true"
                      :column="1"
                      size="small"
                      style="width: 100%"
                    >
                      <DescriptionsItem label="Class"
                        >{{ item.groupName }}
                      </DescriptionsItem>
                      <DescriptionsItem label="Date"
                        >{{ formatDate(item.date) }}
                      </DescriptionsItem>
                      <DescriptionsItem label="Time"
                        >{{ formatTime(item.startTime) }} -
                        {{ formatTime(item.endTime) }}
                      </DescriptionsItem>
                      <DescriptionsItem label="Room"
                        >{{ item.roomNumber }}
                      </DescriptionsItem>
                    </Descriptions>
                  </template>
                  <SessionBadge :session="item">
                    <template #text>
                      <div
                        :class="[
                          'inline text-xs',
                          item.status === SessionStatus.CANCELED &&
                            'line-through',
                        ]"
                      >
                        <span class="text-gray-500"
                          >{{ formatTime(item.startTime) }}
                        </span>
                        <span class="ml-2 font-medium text-gray-900"
                          >{{ item.subjectCode }} - {{ item.groupName }}</span
                        >
                      </div>
                    </template>
                  </SessionBadge>
                </Popover>
              </li>
            </ul>
          </template>
        </Calendar>
      </div>
    </Spin>
  </BaseMain>
</template>

<script lang="ts" setup>
import { BaseMain, BasePageHeader } from "@/components";
import {
  Button,
  Calendar,
  Tag,
  Popover,
  Descriptions,
  DescriptionsItem,
  Spin,
  DatePicker,
} from "ant-design-vue";
import { onMounted, ref } from "vue";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { TimetableService } from "@/services/timetable";
import { DB_DATE_FORMAT } from "@/utils/constants";
import type { Session } from "@/types/models";
import { formatTime, formatDate } from "@/utils/utils";
import { SmileOutlined } from "@ant-design/icons-vue";
import SessionBadge from "@/components/badges/SessionBadge.vue";
import { SessionStatus, UserRole } from "@/types/enums";
import { useAuthStore } from "@/stores/auth";

dayjs.extend(localeData);

const selectedDate = ref<Dayjs>(dayjs());
const month = ref<Dayjs>(dayjs());

const schedule = ref<Record<string, Session[]>>();
const holidays = ref<Record<string, string>>();
const authStore = useAuthStore();
const isLoading = ref(false);

const getSessionsByDate = (value: Dayjs): Session[] | undefined => {
  if (!schedule.value) {
    return [];
  }
  return schedule.value[value.format(DB_DATE_FORMAT)];
};

const onDateChange = (date: Dayjs) => {
  console.log(date);
};

const isDisabledDate = (date: Dayjs) => {
  return (
    date.month() !== selectedDate.value.month() ||
    date.year() !== selectedDate.value.year()
  );
};

const getTimetableData = () => {
  isLoading.value = true;
  selectedDate.value = month.value;
  TimetableService[
    authStore.role === UserRole.STUDENT
      ? "getStudentTimetable"
      : "getTeacherTimetable"
  ](
    selectedDate.value.startOf("month").format(DB_DATE_FORMAT),
    selectedDate.value.endOf("month").format(DB_DATE_FORMAT)
  )
    .then(({ data }) => {
      schedule.value = data.schedule;
      holidays.value = data.holidays;
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  getTimetableData();
});
</script>

<style lang="less" scoped>
@import "../../style/tailwind";

:deep(.ant-picker-calendar) {
  table,
  th,
  td {
    border: 1px solid #f0f0f0;
  }
}

:deep(.ant-picker-calendar .ant-picker-panel .ant-picker-body) {
  padding: 0;
}

:deep(.ant-picker-calendar-full .ant-picker-panel .ant-picker-body th) {
  padding: 12px 0;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: @gray-500;
}

:deep(.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date) {
  margin: 0;
  border: 0;
  border-top: 2px solid transparent;
}

:deep(.ant-picker-cell-disabled) {
  background-color: @gray-50;
}

:deep(.ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-calendar-date-today) {
  border-top: 2px solid var(--ant-primary-color);
}
</style>
