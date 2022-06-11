<template>
  <BasePageHeader />
  <BaseMain class="pb-0">
    <div class="rounded-xl bg-white p-6 pb-0">
      <Form
        autocomplete="off"
        class="flex justify-between"
        name="horizontal_login"
      >
        <div class="flex w-full flex-col gap-x-[20px] md:w-2/3 md:flex-row">
          <FormItem
            :rules="[{ required: true, message: 'Please choose class!' }]"
            class="w-full"
            label="Class"
          >
            <Select
              v-model:value="group"
              :loading="isLoading"
              :options="groups"
              class="w-full"
              @change="onChange"
            />
          </FormItem>
          <FormItem
            :rules="[{ required: true, message: 'Please choose course!' }]"
            class="w-full"
            label="Course"
          >
            <Select v-model:value="course" :options="courses" class="w-full" />
          </FormItem>
        </div>
        <FormItem>
          <Button :disabled="!course || !group" type="primary" @click="submit"
            >Get report</Button
          >
        </FormItem>
      </Form>
    </div>

    <div class="pt-4 text-center">
      <Spin :spinning="isLoading">
        <Table
          :columns="mixColumns"
          :data-source="attendances"
          :pagination="false"
          :scroll="{ x: 2000 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.title === 'Absent'">
              <span
                :class="[
                  calculatePercent(
                    present(record.attendances),
                    sessions.length
                  ) > 25
                    ? 'text-red-700'
                    : '',
                ]"
                >{{ present(record.attendances) }}/{{ sessions.length }} ({{
                  calculatePercent(
                    present(record.attendances),
                    sessions.length
                  )
                }}%)</span
              >
            </template>
            <template v-if="column.sessionId">
              <div v-if="sessionIsTaken(column.sessionId, record.attendances)">
                <div
                  v-if="isPresent(column.sessionId, record.attendances)"
                  class="text-green-500"
                >
                  <CheckCircleOutlined />
                </div>
                <div v-else class="text-red-700">
                  <CloseCircleOutlined />
                </div>
              </div>
              <div v-else>Pending</div>
            </template>
          </template>
        </Table>
      </Spin>
    </div>
  </BaseMain>
</template>

<script lang="ts" setup>
interface MixColumn {
  title: string;
  dataIndex?: string;
  key?: number;
  sessionId?: number;
  fixed?: boolean;
  width?: string;
}

import { BasePageHeader, BaseMain } from "@/components";
import {
  Select,
  Form,
  FormItem,
  Button,
  Table,
  Spin,
  Empty,
} from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { ref, onMounted, computed } from "vue";
import { GroupService } from "@/services/group";
import { CourseService } from "@/services/course";
import { AttendanceService } from "@/services/attendance";
import type { AttendanceRecord, AttendanceRecords } from "@/types/models";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";

const isLoading = ref<boolean>(false);
let columns: MixColumn[] = [
  {
    title: "Roll Number",
    dataIndex: "studentRollnumber",
    fixed: true,
    width: "40%",
  },
  {
    title: "Full Name",
    dataIndex: "studentFullName",
    fixed: true,
    width: "40%",
  },
  {
    title: "Absent",
    fixed: true,
    width: "40%",
  },
];

const groups = ref<SelectProps["options"]>([]);
const group = ref<string>("");
const courses = ref<SelectProps["options"]>([]);
const course = ref<string>();
const attendances = ref<AttendanceRecords[]>([]);
const sessions = ref<MixColumn[]>([]);

onMounted(() => {
  getGroups();
});

const isPresent = (id: number, record: AttendanceRecord[]): boolean => {
  return record.find((e) => e.sessionId === id)?.isPresent || false;
};

const present = (record: AttendanceRecord[]): number => {
  return record.filter((e) => e.isPresent === false).length;
};

const sessionIsTaken = (id: number, record: AttendanceRecord[]): boolean => {
  const session = record.find((e) => e.sessionId === id);
  if (session) {
    return true;
  }
  return false;
};

const calculatePercent = (
  absenceDaysTotal: number,
  sessionTotal: number
): number => {
  return Number.parseFloat(
    ((absenceDaysTotal * 100) / sessionTotal).toFixed(2)
  );
};

const getGroups = () => {
  GroupService.getGroupHasLeastOneCourse().then(({ data }) => {
    groups.value = data.map((x) => ({
      value: x.groupName,
      label: x.groupName,
    }));
  });
};

const onChange = (value: string) => {
  course.value = "";
  isLoading.value = true;
  const param = {
    groupName: value,
  };
  CourseService.getCoursesByGroup(param).then(({ data }) => {
    courses.value = data.map((x) => ({ value: x.id, label: x.subjectName }));
    isLoading.value = false;
  });
};

const formatDate = (date: string) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return `(${day}/${month})`;
};

const submit = async () => {
  isLoading.value = true;
  const params = {
    courseId: Number.parseInt(course.value ? course.value : ""),
  };
  await AttendanceService.attendanceReport(params).then(({ data }) => {
    attendances.value = data.attendanceRecords;
    sessions.value = data.sessions.map((e, index) => ({
      title: `Session ${index + 1} ${formatDate(e.date)}`,
      key: e.id,
      sessionId: e.id,
      width: "30%",
    }));
  });

  isLoading.value = false;
};

const mixColumns = computed(() => {
  return [...columns, ...sessions.value];
});
</script>

<style scoped></style>
