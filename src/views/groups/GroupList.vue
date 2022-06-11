<template>
  <BaseTable
    v-model:pagination="pagination"
    :api="GroupService.find(pagination)"
    :columns="columns"
    create-route="groupCreate"
    row-key="groupName"
  >
    <template #actions="{ record }">
      <a href="javascript:" @click="onClickStudentList(record)">List student</a>
      <a href="javascript:" @click="onClickImportStudents(record)"
        >Import students</a
      >
      <a
        v-if="!record.hasGeneratedTimetable"
        href="javascript:"
        @click="onClickGenerateTimetable(record)"
        >Generate timetable</a
      >
    </template>
  </BaseTable>
  <ImportStudentsModal
    v-if="selectedGroup"
    v-model:visible="isImportModalVisible"
    :group="selectedGroup"
  />
  <GenerateTimetableModal
    v-if="selectedGroup"
    v-model:visible="isGenerateModalVisible"
    :group="selectedGroup"
  />
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import type { Group } from "@/types/models";
import { h, ref } from "vue";
import { dayOfWeekToString } from "@/utils/utils";
import { GroupService } from "@/services/group";
import ImportStudentsModal from "@/views/groups/components/ImportStudentsModal.vue";
import GenerateTimetableModal from "@/views/groups/components/GenerateTimetableModal.vue";
import { useRouter } from "vue-router";
import type { PaginationRequest } from "@/types/pagination";

const router = useRouter();
const pagination = ref<PaginationRequest>({
  currentPage: 1,
  perPage: 10,
});
const columns: BaseTableColumn[] = [
  {
    title: "Class",
    dataIndex: "groupName",
    sorter: (a: Group, b: Group) => a.groupName.localeCompare(b.groupName),
    className: "font-medium text-gray-900",
  },
  {
    title: "Term",
    dataIndex: "termNumber",
    customRender: ({ record }) => {
      const group = record as Group;
      return h("div", {
        innerHTML: `[${group.programCode}] ${group.termNumber}`,
      });
    },
  },
  {
    title: "Teacher",
    dataIndex: "teacherName",
  },
  {
    title: "Slot",
    dataIndex: "slotName",
  },
  {
    title: "Days of week",
    dataIndex: "daysOfWeek",
    customRender: ({ text }: { text: string }) => {
      return h("div", {
        innerHTML: text
          ? text
              .split(",")
              .map((day) => dayOfWeekToString(day, true))
              .join(", ")
          : "",
      });
    },
  },
  {
    title: "Room",
    dataIndex: "roomNumber",
  },
  {
    title: "Start date",
    dataIndex: "startDate",
    displayType: "date",
  },
];

const selectedGroup = ref<Group | undefined>(undefined);
const isImportModalVisible = ref(false);
const onClickImportStudents = (record: Group) => {
  isImportModalVisible.value = true;
  selectedGroup.value = record;
};

const isGenerateModalVisible = ref(false);
const onClickGenerateTimetable = (record: Group) => {
  isGenerateModalVisible.value = true;
  selectedGroup.value = record;
};

const onClickStudentList = (record: Group) => {
  router.push({
    name: "groupStudents",
    params: { id: record.groupName },
  });
};
</script>

<style scoped></style>
