<template>
  <BasePageHeader />
  <BaseMain class="pb-0">
    <div class="rounded-xl bg-white p-6 pb-0">
      <Form
        autocomplete="off"
        class="flex justify-between"
        name="horizontal_login"
      >
        <div class="flex w-full flex-col gap-x-[20px] md:w-1/3 md:flex-row">
          <FormItem
            :rules="[{ required: true, message: 'Please choose course!' }]"
            class="w-full"
            label="Course"
          >
            <Select v-model:value="course" :options="courses" class="w-full" />
          </FormItem>
        </div>
        <FormItem>
          <Button :disabled="!course" type="primary" @click="submit"
            >Get report</Button
          >
        </FormItem>
      </Form>
    </div>

    <div class="pt-4 text-center">
      <Spin :spinning="isLoading">
        <Table
          :columns="columns"
          :data-source="attendances"
          :pagination="false"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.title === 'Session'">
              <span>{{ `Session ${index + 1}` }}</span>
            </template>
            <template v-if="column.title === 'Date'">
              <span>{{ formatDate(record.date) }}</span>
            </template>
            <template v-if="column.title === 'Present'">
              <div v-if="record.isPresent">
                <CheckCircleOutlined class="text-green-500" />
              </div>
              <div v-else>
                <CloseCircleOutlined class="text-red-700" />
              </div>
            </template>
            <template v-if="column.dataName === 'startTime'">
              <span>{{ compareTime(record.startTime) }}</span>
            </template>
            <template v-if="column.dataName === 'endTime'">
              <span>{{ compareTime(record.endTime) }}</span>
            </template>
          </template>
        </Table>
      </Spin>
    </div>
  </BaseMain>
</template>

<script lang="ts" setup>
import { BasePageHeader, BaseMain } from "@/components";
import { Select, Form, FormItem, Button, Table, Spin } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { ref, onMounted } from "vue";
import { StudentService } from "@/services/student";
import { formatTime } from "@/utils/utils";
import type { AttendanceSessionReport } from "@/types/models";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import { DB_DATE_FORMAT, DISPLAY_DATE_FORMAT } from "@/utils/constants";
import dayjs from "dayjs";

const isLoading = ref<boolean>(false);
let columns = [
  {
    title: "Session",
  },
  {
    title: "Room",
    dataIndex: "roomNumber",
  },
  {
    title: "Date",
    displayType: "date",
  },
  {
    title: "Start Time",
    dataName: "startTime",
  },
  {
    title: "End Time",
    dataName: "endTime",
  },
  {
    title: "Present",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
];

const courses = ref<SelectProps["options"]>([]);
const course = ref<number>();
const attendances = ref<AttendanceSessionReport[]>([]);
onMounted(() => {
  getCourses();
});

const getCourses = () => {
  StudentService.getCourse().then(({ data }) => {
    courses.value = data.map((x) => ({
      value: x.id,
      label: x.subjectName,
    }));
  });
};

const formatDate = (value: string, initialFormat = DB_DATE_FORMAT): string => {
  return dayjs(value, initialFormat).format(DISPLAY_DATE_FORMAT);
};

const compareTime = (time: number): string => {
  return formatTime(time);
};

const submit = async () => {
  isLoading.value = true;
  const params = {
    courseId: course.value ? course.value : 0,
  };
  await StudentService.getSessions(params).then(({ data }) => {
    attendances.value = data;
  });

  isLoading.value = false;
};
</script>

<style scoped></style>
