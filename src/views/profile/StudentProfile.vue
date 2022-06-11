<template>
  <BasePageHeader>
    <template v-if="student" #title>
      <span class="mr-2 inline-block font-light text-gray-400">
        {{ student?.rollNumber }}</span
      >
      <span>{{ getFullName(student) }}</span>
    </template>
  </BasePageHeader>
  <BaseMain>
    <Spin :spinning="isLoading">
      <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Student Information
                </h2>
                <p class="mt-1 mb-0 max-w-2xl text-sm text-gray-500">
                  Personal details and academic information.
                </p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <ProfileField label="Full name">
                    {{ student ? getFullName(student) : "" }}
                  </ProfileField>
                  <ProfileField label="Roll number">
                    {{ student?.rollNumber }}
                  </ProfileField>
                  <ProfileField label="Gender">
                    {{ student ? formatGender(student.gender) : "" }}
                  </ProfileField>
                  <ProfileField label="Date of birth">
                    {{ student ? formatDate(student.dateOfBirth) : "" }}
                  </ProfileField>
                  <ProfileField label="Email address">
                    {{ student?.email }}
                  </ProfileField>
                  <ProfileField label="Phone number">
                    {{ student?.phoneNumber }}
                  </ProfileField>
                  <ProfileField label="Address">
                    {{ student?.address }}
                  </ProfileField>
                  <ProfileField
                    v-if="student?.identityNumber"
                    label="Identity number"
                  >
                    {{ student?.identityNumber }}
                  </ProfileField>
                  <ProfileField
                    v-if="student?.identityDateOfIssue"
                    label="Identity date of issue"
                  >
                    {{ formatDate(student?.identityDateOfIssue) }}
                  </ProfileField>
                  <ProfileField
                    v-if="student?.identityPlaceOfIssue"
                    label="Identity place of issue"
                  >
                    {{ student?.identityPlaceOfIssue }}
                  </ProfileField>
                  <ProfileField label="Program">
                    {{ student?.programName }}
                  </ProfileField>
                  <ProfileField label="Class">
                    {{ student?.groupName }}
                  </ProfileField>
                </dl>
              </div>
            </div>
          </section>

          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Parent Information
                </h2>
                <p class="mt-1 mb-0 max-w-2xl text-sm text-gray-500">
                  Student's parent information.
                </p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <ProfileField label="Full name">
                    {{ student ? student.parentFullName : "" }}
                  </ProfileField>
                  <ProfileField
                    v-if="student?.parentEmail"
                    label="Email address"
                  >
                    {{ student?.parentEmail }}
                  </ProfileField>
                  <ProfileField label="Phone number">
                    {{ student?.parentPhoneNumber }}
                  </ProfileField>
                  <ProfileField v-if="student?.parentAddress" label="Address">
                    {{ student?.parentAddress }}
                  </ProfileField>
                  <ProfileField
                    v-if="student?.parentOccupation"
                    label="Occupation"
                  >
                    {{ student?.parentOccupation }}
                  </ProfileField>
                </dl>
              </div>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="timeline-title"
          class="lg:col-span-1 lg:col-start-3"
        >
          <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
              Tuition fees
            </h2>

            <!-- Activity Feed -->
            <div class="mt-6 flow-root">
              <ul class="-mb-8" role="list">
                <li v-for="(item, itemIdx) in timeline" :key="item.id">
                  <div class="relative pb-8">
                    <span
                      v-if="itemIdx !== timeline.length - 1"
                      aria-hidden="true"
                      class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    />
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                          :class="[
                            item.type.bgColorClass,
                            'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
                          ]"
                        >
                          <component
                            :is="item.type.icon"
                            aria-hidden="true"
                            class="h-5 w-5 text-white"
                          />
                        </span>
                      </div>
                      <div
                        class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                      >
                        <div>
                          <p class="text-sm text-gray-500">
                            {{ item.content }}:
                            <span class="font-medium text-gray-900">{{
                              formatMoney(item.fee)
                            }}</span>
                          </p>
                        </div>
                        <div
                          class="whitespace-nowrap text-right text-sm text-gray-500"
                        >
                          <time :datetime="item.datetime">{{ item.date }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="justify-stretch mt-6 flex flex-col">
              <button
                class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                type="button"
              >
                See payment information
              </button>
            </div>
          </div>
        </section>
      </div>
    </Spin>
  </BaseMain>
</template>

<script lang="ts" setup>
import { BaseMain, BasePageHeader } from "@/components";
import { CheckIcon, UserIcon } from "@heroicons/vue/solid";
import { onMounted, ref } from "vue";
import type { Student } from "@/types/models";
import { StudentService } from "@/services/student";
import { Spin } from "ant-design-vue";
import {
  formatDate,
  formatGender,
  getFullName,
  formatMoney,
} from "@/utils/utils";
import ProfileField from "@/views/profile/components/ProfileField.vue";

const student = ref<Student | null>(null);
const isLoading = ref(true);

onMounted(() => {
  StudentService.getStudentProfile().then(({ data }) => {
    student.value = data;
    isLoading.value = false;
  });
});

const eventTypes = {
  incomplete: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.completed,
    content: "Term 1",
    fee: 20000000,
    date: "Sep 20, 2020",
  },
  {
    id: 2,
    type: eventTypes.completed,
    content: "Term 2",
    fee: 20000000,
    date: "Sep 28, 2021",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Term 3",
    fee: 20000000,
    date: "Oct 4, 2021",
  },
  {
    id: 4,
    type: eventTypes.incomplete,
    content: "Term 4",
    fee: 20000000,
    date: "Oct 4, 2022",
  },
];
</script>
