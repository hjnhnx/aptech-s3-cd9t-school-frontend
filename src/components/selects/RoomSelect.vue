<template>
  <Select
    :loading="isLoading"
    :options="options"
    :value="value"
    placeholder="Select a room"
    style="width: 100%"
    @change="onChange"
  ></Select>
</template>

<script lang="ts" setup>
import { Select } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";
import { computed } from "vue";
import { useRoomStore } from "@/stores/room";
import type { Room } from "@/types/models";

interface ProgramSelectProps {
  value?: string;
}

defineProps<ProgramSelectProps>();
const emits = defineEmits(["update:value"]);
const roomStore = useRoomStore();

const rooms = computed<Room[]>(() => roomStore.rooms);
const options = computed<SelectProps["options"]>(() =>
  rooms.value.map((room) => ({
    value: room.roomNumber,
    label: room.roomNumber,
  }))
);
const isLoading = computed(() => !roomStore.hasFetched);

if (!roomStore.hasFetched) {
  roomStore.get();
}

const onChange = (value: number) => {
  emits("update:value", value);
};
</script>
