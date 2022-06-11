<template>
  <Modal
    v-if="group"
    :ok-button-props="okButtonProps"
    :title="`Generate timetable for class ${props.group.groupName}`"
    :visible="visible"
    :width="800"
    cancelText="Close"
    okText="Next"
    @cancel="closeModal"
    @ok="next"
  >
    <Steps v-model:current="current" @change="onStepChange">
      <Step
        v-for="item in steps"
        :key="item.id"
        :disabled="
          status === GenerateStatus.SUCCESS ||
          status === GenerateStatus.GENERATING
        "
        :title="item.title"
      />
    </Steps>
    <div class="mt-6">
      <GroupDescription
        v-if="current === StepKeys.CLASS_INFORMATION"
        :group="group"
      />
      <FormItem
        v-else-if="current === StepKeys.TERM_START_DATE"
        :rules="[{ required: true }]"
        label="Term start date"
      >
        <DatePicker
          v-model:value="termStartDate"
          :format="DISPLAY_DATE_FORMAT"
        />
      </FormItem>
      <div v-else-if="current === StepKeys.GENERATE_TIMETABLE">
        <Result
          v-if="status === GenerateStatus.SUCCESS"
          status="success"
          title="Timetable generated successfully!"
        />
        <Result
          v-else-if="status === GenerateStatus.GENERATING"
          :status="null"
          title="Generating timetable, please wait..."
        >
          <template #icon>
            <LoadingOutlined class="text-gray-600" />
          </template>
        </Result>
        <Result
          v-else-if="status === GenerateStatus.ERROR"
          status="error"
          title="An error occurred. Check your input and try again."
        >
          <template #extra>
            <Button type="primary" @click="generateTimetable"
              >Generate timetable
            </Button>
          </template>
        </Result>
        <Result
          v-else
          :status="null"
          title="Preparations completed. Press button to start generating."
        >
          <template #icon>
            <ScheduleOutlined class="text-gray-600" />
          </template>
          <template #extra>
            <Button type="primary" @click="generateTimetable"
              >Generate timetable
            </Button>
          </template>
        </Result>
      </div>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
import { computed, ref, withDefaults } from "vue";
import {
  Modal,
  notification,
  Step,
  Steps,
  FormItem,
  DatePicker,
  Result,
  Button,
} from "ant-design-vue";
import { ScheduleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import type { Group } from "@/types/models";
import { GroupDescription } from "@/components";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DB_DATE_FORMAT, DISPLAY_DATE_FORMAT } from "@/utils/constants";
import { TimetableService } from "@/services/timetable";

interface ImportStudentModalProps {
  visible: boolean;
  group: Group;
}

enum StepKeys {
  CLASS_INFORMATION = 0,
  TERM_START_DATE = 1,
  GENERATE_TIMETABLE = 2,
}

enum GenerateStatus {
  WAITING,
  GENERATING,
  ERROR,
  SUCCESS,
}

const props = withDefaults(defineProps<ImportStudentModalProps>(), {
  visible: false,
});

const emits = defineEmits(["update:visible"]);
const okButtonProps = computed(() => {
  if (current.value === steps[steps.length - 1].id) {
    return {
      style: {
        display: "none",
      },
    };
  }
  return null;
});

const termStartDate = ref<Dayjs>(dayjs());
const current = ref<number>(0);
const next = () => {
  current.value++;
};
const onStepChange = (value: StepKeys) => {
  if (value > StepKeys.TERM_START_DATE && !termStartDate.value) {
    notification.error({
      message: "Term start date must be selected",
    });
    current.value = StepKeys.TERM_START_DATE;
  }
  if (status.value === GenerateStatus.ERROR) {
    status.value = GenerateStatus.WAITING;
  }
};
const steps = [
  {
    title: "Class information",
    id: StepKeys.CLASS_INFORMATION,
  },
  {
    title: "Term start date",
    id: StepKeys.TERM_START_DATE,
  },
  {
    title: "Generate timetable",
    id: StepKeys.GENERATE_TIMETABLE,
  },
];

const status = ref<GenerateStatus>(GenerateStatus.WAITING);
const generateTimetable = () => {
  status.value = GenerateStatus.GENERATING;
  TimetableService.generateTimetable(
    props.group.groupName,
    termStartDate.value.format(DB_DATE_FORMAT)
  )
    .then(() => {
      status.value = GenerateStatus.SUCCESS;
    })
    .catch(() => {
      status.value = GenerateStatus.ERROR;
    });
};

const closeModal = () => {
  emits("update:visible", false);
  status.value = GenerateStatus.WAITING;
  current.value = StepKeys.CLASS_INFORMATION;
};
</script>
