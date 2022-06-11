<template>
  <BasePageHeader />
  <BaseMain>
    <BaseForm
      ref="formRef"
      :model="formState"
      :rules="rules"
      @finish="onFinish"
    >
      <BaseFormItem :col-span="8" label="Program" name="programId">
        <ProgramSelect v-model:value="formState.programId" />
      </BaseFormItem>
      <BaseFormItem :col-span="4" label="Term" name="termId">
        <TermSelect
          v-model:value="formState.termId"
          :program-id="formState.programId"
        />
      </BaseFormItem>
      <BaseFormItem :col-span="4" label="Program start date" name="startDate">
        <DatePicker
          v-model:value="formState.startDate"
          :format="DISPLAY_DATE_FORMAT"
          style="width: 100%"
        />
      </BaseFormItem>
      <BaseFormItem :col-span="4" label="Slot" name="slotId">
        <SlotSelect v-model:value="formState.slotId" />
      </BaseFormItem>
      <BaseFormItem :col-span="12" label="Days of week" name="daysOfWeek">
        <CheckboxGroup
          v-model:value="formState.daysOfWeek"
          :options="daysOfWeekOptions"
        />
      </BaseFormItem>
      <BaseFormItem :col-span="4" label="Teacher" name="teacherId">
        <TeacherSelect v-model:value="formState.teacherId" />
      </BaseFormItem>
      <BaseFormItem :col-span="4" label="Room number" name="roomNumber">
        <RoomSelect v-model:value="formState.roomNumber" />
      </BaseFormItem>
    </BaseForm>
  </BaseMain>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { DatePicker, CheckboxGroup, notification } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import {
  BasePageHeader,
  BaseMain,
  BaseForm,
  BaseFormItem,
  ProgramSelect,
  SlotSelect,
  TermSelect,
  RoomSelect,
  TeacherSelect,
} from "@/components";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  DAYS_OF_WEEK,
  DB_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
} from "@/utils/constants";
import type { Rule } from "ant-design-vue/es/form";
import { GroupService } from "@/services/group";
import router from "@/router";

interface FormState {
  teacherId?: number;
  startDate?: Dayjs;
  slotId?: number;
  programId?: number;
  termId?: number;
  daysOfWeek: number[];
  roomNumber?: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  teacherId: undefined,
  startDate: dayjs(),
  slotId: undefined,
  programId: undefined,
  termId: undefined,
  daysOfWeek: [],
  roomNumber: undefined,
});

const rules: Record<string, Rule[]> = {
  teacherId: [{ required: true }],
  startDate: [{ required: true }],
  slotId: [{ required: true }],
  programId: [{ required: true }],
  termId: [{ required: true }],
  daysOfWeek: [{ required: true }],
  roomNumber: [{ required: true }],
};

const daysOfWeekOptions = DAYS_OF_WEEK.map((item, index) => ({
  value: index,
  label: item,
}));

const onFinish = (formValues: FormState) => {
  const formData = {
    ...formValues,
    startDate: formValues.startDate?.format(DB_DATE_FORMAT),
    daysOfWeek: formValues.daysOfWeek.join(","),
  };
  GroupService.store(formData).then(({ data }) => {
    notification.success({
      message: `Class ${data.groupName} created successfully`,
    });
    router.push({ name: "groupList" });
  });
};
</script>
