<template>
  <Descriptions
    v-if="student"
    :column="{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }"
    bordered
    class="bg-white"
  >
    <DescriptionsItem v-if="hasField('rollNumber')" label="Roll number"
      >{{ student.rollNumber }}
    </DescriptionsItem>
    <DescriptionsItem
      v-if="hasField(['firstName', 'lastName'])"
      label="Full name"
      >{{ student.lastName }} {{ student.firstName }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('groupName')" label="Class"
      >{{ student.groupName }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('programName')" label="Program">
      {{ student.programName }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('gender')" label="Gender"
      >{{ toCapitalize(Gender[student.gender]) }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('dateOfBirth')" label="Date of birth"
      >{{ formatDate(student.dateOfBirth) }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('address')" label="Address">
      {{ student.address }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('phoneNumber')" label="Phone number">
      {{ student.phoneNumber }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('email')" label="Email">
      {{ student.email }}
    </DescriptionsItem>
    <DescriptionsItem v-if="hasField('parentFullName')" label="Parent name">
      {{ student.parentFullName }}
    </DescriptionsItem>
    <DescriptionsItem
      v-if="hasField('parentPhoneNumber') && student.parentPhoneNumber"
      label="Parent phone number"
    >
      {{ student.parentPhoneNumber }}
    </DescriptionsItem>
    <DescriptionsItem
      v-if="hasField('parentEmail') && student.parentEmail"
      label="Parent email"
    >
      {{ student.parentEmail }}
    </DescriptionsItem>
  </Descriptions>
</template>

<script lang="ts" setup>
import { Descriptions, DescriptionsItem } from "ant-design-vue";
import type { Student } from "@/types/models";
import { formatDate, toCapitalize } from "@/utils/utils";
import { Gender } from "@/types/enums";

interface StudentDescriptionProps {
  student: Student;
  omitFields?: (keyof Student)[];
  includeFields?: (keyof Student)[];
}

const props = withDefaults(defineProps<StudentDescriptionProps>(), {
  omitFields: () => [],
  includeFields: () => [],
});

const hasField = (fields: keyof Student | (keyof Student)[]): boolean => {
  if (typeof fields === "string") {
    return props.includeFields.length
      ? props.includeFields.includes(fields)
      : !props.omitFields.includes(fields);
  } else {
    return props.includeFields.length
      ? props.includeFields.some((includeField) =>
          fields.includes(includeField)
        )
      : !props.omitFields.some((omitField) => fields.includes(omitField));
  }
};
</script>
