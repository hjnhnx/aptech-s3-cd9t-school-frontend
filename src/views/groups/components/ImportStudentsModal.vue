<template>
  <Modal
    v-if="group"
    :title="modalTitle"
    :visible="visible"
    :width="600"
    @cancel="closeModal"
  >
    <UploadDragger
      :before-upload="beforeUpload"
      :fileList="fileList"
      :max-count="1"
      :multiple="false"
      accept=".xls,.xlsx,.csv"
      name="file"
      @remove="removeFile"
    >
      <p class="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Download the template below, fill in all the information then upload it
        here.
      </p>
    </UploadDragger>
    <template #footer>
      <Button @click="downloadTemplate">Download template</Button>
      <Button
        :disabled="!fileList.length || !students.length"
        type="primary"
        @click="submit"
      >
        Submit
      </Button>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { computed, ref, withDefaults } from "vue";
import type { UploadProps } from "ant-design-vue";
import { Button, Modal, notification, UploadDragger } from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import type { Group, Student } from "@/types/models";
import { read, utils } from "xlsx";
import { GroupService } from "@/services/group";
import { Gender } from "@/types/enums";

interface ImportStudentModalProps {
  visible: boolean;
  group: Group;
}

const props = withDefaults(defineProps<ImportStudentModalProps>(), {
  visible: false,
});
const emits = defineEmits(["update:visible"]);

const modalTitle = computed(
  () => `Import students to class ${props.group.groupName}`
);
const closeModal = () => {
  emits("update:visible", false);
};
const downloadTemplate = () => {
  window.open("/CD9T_ImportStudentsTemplate.xlsx", "_blank");
};

const fileList = ref<UploadProps["fileList"]>([]);
const students = ref<Partial<Student>[]>([]);
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  fileList.value = [file];
  const reader = new FileReader();
  reader.onload = (e) => {
    // Parse data
    const buffer = e.target?.result;
    const wb = read(buffer, { type: "binary" });
    // Get first worksheet
    const wsName = wb.SheetNames[0];
    const ws = wb.Sheets[wsName];
    // Convert
    const records = utils.sheet_to_json(ws) as unknown as Record<
      string,
      unknown
    >[];
    const data = records.map((a: Record<string, unknown>) => {
      return a.gender && typeof a.gender === "string"
        ? { ...a, gender: parseInt(a.gender) }
        : a;
    });
    const isValid = validate(data);
    if (!isValid) {
      notification.error({
        message: "Invalid data. Please fix the file and import again.",
      });
      return;
    }
    students.value = data;
  };
  reader.readAsBinaryString(file);
  return false;
};

const removeFile = () => {
  fileList.value = [];
};

const validate = (data: unknown[]) => {
  const students = data as Student[];
  return !students.some((student) => {
    return (
      !student.firstName ||
      !student.lastName ||
      !student.email ||
      !student.gender ||
      (student.gender !== Gender.FEMALE && student.gender !== Gender.MALE) ||
      !student.dateOfBirth ||
      !student.address ||
      !student.phoneNumber ||
      !student.email ||
      !student.parentFullName ||
      !student.parentPhoneNumber
    );
  });
};

const submit = () => {
  const groupName = props.group.groupName;
  if (!groupName) return;
  GroupService.importStudents(groupName, students.value).then(({ data }) => {
    removeFile();
    closeModal();
    notification.success({
      message: `${data.studentsAdded} students imported to ${groupName}`,
    });
  });
};
</script>
