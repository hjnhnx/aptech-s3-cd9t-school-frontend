<template>
  <BasePageHeader>
    <SessionDescription v-if="session" :session="session" class="mt-4" />
  </BasePageHeader>
  <BaseMain>
    <Form ref="formRef">
      <Table
        :columns="columns"
        :data-source="students"
        :loading="isLoading"
        :pagination="false"
        :scroll="{ x: true }"
        row-key="studentRollNumber"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'avatar'">
            <Avatar :size="64" :src="record.avatar" shape="square">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
          </template>
          <template v-else-if="column.key === 'isPresent'">
            <Switch
              v-model:checked="students[index].isPresent"
              checked-children="Present"
              un-checked-children="Absent"
            />
          </template>
          <template v-else-if="column.key === 'comment'">
            <Textarea
              v-model:value="students[index].comment"
              :maxlength="100"
              show-count=""
            />
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          <StudentDescription
            :omit-fields="[
              'rollNumber',
              'firstName',
              'groupName',
              'programName',
            ]"
            :student="record"
          />
        </template>
      </Table>
      <div class="mt-6 flex justify-between">
        <div class="text-gray-500">
          <span
            >{{ attendedStudents }} students attended out of
            {{ totalStudents }}</span
          >
          <span v-if="totalStudents"> ({{ attendancePercentage }}%)</span>
        </div>
        <div>
          <Button class="mr-2" @click="onReset">Reset</Button>
          <Button type="primary" @click="onFinish">Submit</Button>
        </div>
      </div>
    </Form>
  </BaseMain>
</template>
<script lang="ts" setup>
import { computed, h, onMounted, ref } from "vue";
import {
  notification,
  Table,
  Avatar,
  Textarea,
  Switch,
  Form,
  Button,
} from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { BasePageHeader, BaseMain } from "@/components";
import { useRoute, useRouter } from "vue-router";
import { SessionDescription } from "@/components";
import { SessionService } from "@/services/session";
import { StudentService } from "@/services/student";
import type { Session, Student } from "@/types/models";
import type { AttendanceRecordCreateModel } from "@/services/attendance";
import StudentDescription from "@/components/descriptions/StudentDescription.vue";
import { AttendanceService } from "@/services/attendance";

const route = useRoute();
const router = useRouter();
const sessionId = parseInt(route.params.id as string);
const session = ref<Session | null>(null);
const isLoading = ref(false);
const students = ref<AttendanceRecordCreateModel[]>([]);

const getSessionDetail = () => {
  SessionService.getSessionDetail(sessionId)
    .then(({ data }) => {
      session.value = data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const getStudentsBySession = () => {
  isLoading.value = true;
  StudentService.getStudentsBySession(sessionId)
    .then(({ data }) => {
      students.value = data.map((student) => ({
        ...student,
        studentRollNumber: student.rollNumber,
        isPresent: true,
        comment: undefined,
      }));
      isLoading.value = false;
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
    });
};

const columns = [
  {
    title: "Photo",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Roll number",
    dataIndex: "rollNumber",
    key: "roleNumber",
  },
  {
    title: "Full name",
    dataIndex: "firstName",
    key: "fullName",
    customRender: ({ record }: { record: Student }) => {
      return h("div", {
        innerHTML: `${record.lastName} ${record.firstName}`,
      });
    },
  },
  {
    title: "Is present",
    key: "isPresent",
  },
  {
    title: "Comment",
    key: "comment",
  },
];

onMounted(() => {
  getSessionDetail();
  getStudentsBySession();
});

const totalStudents = computed(() => students.value.length);
const attendedStudents = computed(
  () => students.value.filter((student) => student.isPresent).length
);
const attendancePercentage = computed(() =>
  totalStudents.value
    ? Math.round((attendedStudents.value / totalStudents.value) * 100)
    : 0
);

const onFinish = () => {
  const records = students.value.map(
    ({ studentRollNumber, comment, isPresent }) => ({
      studentRollNumber,
      comment,
      isPresent,
    })
  );
  AttendanceService.recordAttendance(sessionId, records).then(() => {
    notification.success({
      message: "Attendance recorded!",
    });
    router.push({ name: "todaySessions" });
  });
};

const onReset = () => {
  students.value = students.value.map((student) => ({
    ...student,
    isPresent: true,
    comment: undefined,
  }));
};
</script>
