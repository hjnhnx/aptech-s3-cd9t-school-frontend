<template>
  <Badge v-if="session" :color="badgeColor">
    <template #text>
      <slot name="text">
        {{ toCapitalize(text) }}
      </slot>
    </template>
  </Badge>
</template>

<script lang="ts" setup>
import type { Session } from "@/types/models";
import { SessionStatus } from "@/types/enums";
import { computed } from "vue";
import { Badge } from "ant-design-vue";
import { getSessionEndTime, toCapitalize } from "@/utils/utils";
import dayjs from "dayjs";

interface SessionBadgeProps {
  session: Session;
}

const props = defineProps<SessionBadgeProps>();

const badgeColor = computed(() => {
  switch (props.session.status) {
    case SessionStatus.TAKEN:
      return "green";
    case SessionStatus.MISSING:
      return "red";
    case SessionStatus.PENDING:
      return getSessionEndTime(props.session) < dayjs() ? "red" : "yellow";
    case SessionStatus.CANCELED:
      return "#bebebe";
    default:
      return "#bebebe";
  }
});

const text = computed(() => {
  if (
    props.session.status === SessionStatus.PENDING &&
    getSessionEndTime(props.session) < dayjs()
  ) {
    return SessionStatus[SessionStatus.MISSING];
  }
  return SessionStatus[props.session.status];
});
</script>

<style lang="less">
.ant-badge,
.ant-badge-status-text {
  color: inherit;
}
</style>
