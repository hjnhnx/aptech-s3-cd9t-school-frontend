<template>
  <Descriptions
    v-if="group"
    :column="{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }"
    bordered
  >
    <DescriptionsItem label="Group">{{ group.groupName }}</DescriptionsItem>
    <DescriptionsItem label="Term"
      >[{{ group.programCode }}] {{ group.termNumber }}
    </DescriptionsItem>
    <DescriptionsItem label="Teacher"
      >{{ group.teacherName }}
    </DescriptionsItem>
    <DescriptionsItem label="Room">{{ group.roomNumber }}</DescriptionsItem>
    <DescriptionsItem label="Slot">{{ group.slotName }}</DescriptionsItem>
    <DescriptionsItem label="Days of week"
      >{{ daysOfWeekText }}
    </DescriptionsItem>
  </Descriptions>
</template>

<script lang="ts" setup>
import { Descriptions, DescriptionsItem } from "ant-design-vue";
import type { Group } from "@/types/models";
import { dayOfWeekToString } from "@/utils/utils";
import { computed } from "vue";

interface GroupDescriptionProps {
  group: Group;
}

const props = defineProps<GroupDescriptionProps>();

const daysOfWeekText = computed(() => {
  return props.group
    ? props.group.daysOfWeek
        .split(",")
        .map((day) => dayOfWeekToString(day, true))
        .join(", ")
    : "";
});
</script>
