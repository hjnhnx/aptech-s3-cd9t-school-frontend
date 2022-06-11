<template>
  <BaseTable
    :api="StudentService.getStudentsByGroupName(groupName)"
    :columns="columns"
    :title="groupName + ' Student list'"
    create-route="groupCreate"
    row-key="groupName"
  >
    <template #custom="{ column, record }">
      <template v-if="column.key === 'contact'">
        <div v-if="record.email">
          <MailOutlined />
          {{ record.email }}
        </div>
        <div v-if="record.phoneNumber">
          <PhoneOutlined />
          {{ record.phoneNumber }}
        </div>
      </template>
      <template v-else-if="column.key === 'parent'">
        <div v-if="record.parentFullName">
          {{ record.parentFullName }}
        </div>
        <div v-if="record.parentPhoneNumber">
          <PhoneOutlined />
          {{ record.parentPhoneNumber }}
        </div>
        <div v-if="record.parentEmail">
          <MailOutlined />
          {{ record.parentEmail }}
        </div>
        <div v-if="record.parentAddress">
          <EnvironmentOutlined />
          {{ record.parentAddress }}
        </div>
        <div v-if="record.parentOccupation">
          <IdcardOutlined />
          {{ record.parentOccupation }}
        </div>
      </template>
    </template>
  </BaseTable>
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import type { Student } from "@/types/models";
import { h } from "vue";
import { toCapitalize } from "@/utils/utils";
import { StudentService } from "@/services/student";
import { Gender } from "@/types/enums";
import { useRoute } from "vue-router";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons-vue";

const route = useRoute();
const groupName = route.params.id as string;

const columns: BaseTableColumn[] = [
  {
    title: "Roll Number",
    dataIndex: "rollNumber",
  },
  {
    title: "Full Name",
    dataIndex: "firstName",
    customRender: ({ record }) => {
      const student = record as Student;
      return h("div", {
        innerHTML: `${student.lastName} ${student.firstName}`,
        class: "font-medium text-gray-900",
      });
    },
  },
  {
    title: "Gender",
    dataIndex: "gender",
    customRender: ({ text }) => {
      return h("div", {
        innerHTML: toCapitalize(Gender[text]),
      });
    },
  },
  {
    title: "Date of Birth",
    dataIndex: "dateOfBirth",
    displayType: "date",
  },
  {
    title: "Contact",
    key: "contact",
    displayType: "custom",
  },
  {
    title: "Parent",
    key: "parent",
    displayType: "custom",
  },
];
</script>

<style scoped></style>
