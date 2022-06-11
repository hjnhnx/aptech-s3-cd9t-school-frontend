<template>
  <BasePageHeader :title="title">
    <template #actions>
      <router-link :to="{ name: createRoute }">
        <Button v-if="createRoute" type="primary">Create</Button>
      </router-link>
    </template>
  </BasePageHeader>
  <slot name="filters"></slot>
  <BaseMain>
    <Table
      :columns="tableColumns"
      :data-source="tableData"
      :loading="isLoading"
      :pagination="false"
      :row-key="rowKey"
      :scroll="{ x: true }"
    >
      <template #bodyCell="{ column, text, index, record }">
        <template v-if="column.key === 'action'">
          <div class="flex gap-3">
            <router-link v-if="editRoute" :to="{ name: editRoute }"
              >Edit
            </router-link>
            <router-link v-if="deleteRoute" :to="{ name: deleteRoute }"
              >Delete
            </router-link>
            <slot :index="index" :record="record" name="actions" />
          </div>
        </template>
        <template v-else-if="column.displayType === 'date'">
          <div>{{ formatDate(text) }}</div>
        </template>
        <template v-else-if="column.displayType === 'datetime'">
          <div>{{ formatDatetime(text) }}</div>
        </template>
        <template v-else-if="column.displayType === 'time'">
          <div>{{ formatTime(text) }}</div>
        </template>
        <template v-else-if="column.displayType === 'custom'">
          <slot
            :column="column"
            :index="index"
            :record="record"
            :text="text"
            name="custom"
          />
        </template>
      </template>
      <template
        v-if="expandedRowRender"
        #expandedRowRender="{ record, index, indent, expanded }"
      >
        <component
          :is="expandedRowRender({ record, index, indent, expanded })"
        />
      </template>
    </Table>
    <Pagination
      v-if="pagination && isInitialFetchDone"
      :current="pagination.currentPage"
      :disabled="isLoading"
      :page-size="pagination.perPage"
      :show-total="(count) => `Total ${count} items`"
      :total="total"
      class="mt-4 text-right"
      show-less-items
      @change="onChange"
    />
  </BaseMain>
</template>

<script lang="ts" setup>
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import BaseMain from "@/components/base/BaseMain.vue";
import { Table, Button, Pagination, notification } from "ant-design-vue";
import {
  type Component,
  computed,
  h,
  onMounted,
  ref,
  type VNode,
  watch,
  withDefaults,
} from "vue";
import { formatDate, formatDatetime, formatTime } from "@/utils/utils";
import { useSlots } from "vue";
import type { AxiosPromise } from "axios";
import type { PaginationRequest, PaginationResponse } from "@/types/pagination";

export interface BaseTableColumn {
  title?: string;
  fixed?: boolean;
  dataIndex?: string;
  key?: string;
  className?: string;
  displayType?: "text" | "date" | "datetime" | "time" | "custom";
  customRender?: ({
    text,
    record,
    index,
  }: {
    text: never;
    record: unknown;
    index: number;
  }) => VNode | string;
  sorter?: (a: never, b: never) => unknown;
}

export interface BaseTableProps {
  api: AxiosPromise;
  columns: BaseTableColumn[];
  rowKey?: string;
  createRoute?: string;
  editRoute?: string;
  deleteRoute?: string;
  onDataLoaded?: (data: unknown[]) => void;
  pagination?: PaginationRequest;
  expandedRowRender?: ({
    record,
    index,
    indent,
    expanded,
  }: {
    record: never;
    index: number;
    indent: never;
    expanded: boolean;
  }) => Component;
  title?: string;
}

const props = withDefaults(defineProps<BaseTableProps>(), {
  rowKey: "id",
});

const emits = defineEmits(["update:pagination"]);

const hasActionColumn = computed(() => {
  const slots = useSlots();
  return props.editRoute || props.deleteRoute || !!slots.actions;
});

const tableColumns = computed<BaseTableColumn[]>(() => {
  const columns = [
    ...props.columns
      .map((a) => (a.key ? a : { ...a, key: a.dataIndex }))
      .map((a) =>
        a.className && !a.customRender
          ? {
              ...a,
              customRender: ({ text }: { text: never }) => {
                return h("div", {
                  innerHTML: text,
                  class: a.className,
                });
              },
            }
          : a
      ),
  ];
  if (hasActionColumn.value) {
    columns.push({
      title: "Action",
      key: "action",
    });
  }
  return columns;
});

const tableData = ref<unknown[]>([]);
const total = ref(0);
const isLoading = ref(true);
const isInitialFetchDone = ref(false);

const getList = () => {
  isLoading.value = true;
  props.api
    .then(({ data }) => {
      if (props.pagination) {
        const responseData = data as PaginationResponse<unknown>;
        tableData.value = responseData.data;
        total.value = responseData.count;
      } else {
        tableData.value = data;
      }
      if (props.onDataLoaded) {
        props.onDataLoaded(tableData.value);
      }
      isLoading.value = false;
      isInitialFetchDone.value = true;
    })
    .catch(({ message }) => {
      if (message) {
        notification.error({
          message,
        });
      }
      isLoading.value = false;
    });
};

onMounted(() => {
  getList();
});

const onChange = (page: number, pageSize: number) => {
  emits("update:pagination", {
    currentPage: page,
    perPage: pageSize,
  });
};

watch(() => props.api, getList, { deep: true });
</script>
