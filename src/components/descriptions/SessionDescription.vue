<template>
  <Descriptions
    v-if="session"
    :column="{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }"
    bordered
  >
    <DescriptionsItem label="Session ID">{{ session.id }}</DescriptionsItem>
    <DescriptionsItem label="Subject"
      >{{ session.subjectName }}
    </DescriptionsItem>
    <DescriptionsItem label="Class">{{ session.groupName }}</DescriptionsItem>
    <DescriptionsItem label="Room">{{ session.roomNumber }}</DescriptionsItem>
    <DescriptionsItem label="Date"
      >{{ formatDate(session.date) }}
    </DescriptionsItem>
    <DescriptionsItem label="Time">
      {{ formatTime(session.startTime) }} - {{ formatTime(session.endTime) }}
    </DescriptionsItem>
  </Descriptions>
</template>

<script lang="ts" setup>
import { Descriptions, DescriptionsItem } from "ant-design-vue";
import type { Session } from "@/types/models";
import { formatDate, formatTime } from "@/utils/utils";

interface SessionDescriptionProps {
  session: Session;
}

defineProps<SessionDescriptionProps>();
</script>
