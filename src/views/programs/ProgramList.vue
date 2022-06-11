<template>
  <BaseTable
    :api="ProgramService.list()"
    :columns="columns"
    :on-data-loaded="(programs: Program[]) => programStore.setUser(programs)"
  />
</template>

<script lang="ts" setup>
import { BaseTable } from "@/components";
import type { BaseTableColumn } from "@/components/base/BaseTable.vue";
import { ProgramService } from "@/services/program";
import type { Program } from "@/types/models";
import { h } from "vue";
import { useProgramStore } from "@/stores/program";

const columns: BaseTableColumn[] = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Program name",
    dataIndex: "programName",
  },
  {
    title: "Program code",
    dataIndex: "programCode",
  },
  {
    title: "Number of terms",
    key: "numberOfTerms",
    customRender: ({ record }) => {
      const program = record as Program;
      return h("div", {
        innerHTML: program.terms.length,
      });
    },
  },
];

const programStore = useProgramStore();
</script>

<style scoped></style>
