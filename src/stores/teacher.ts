import { defineStore } from "pinia";
import { TeacherService } from "@/services/teacher";
import type { Teacher } from "@/types/models";

interface TeacherState {
  teachers: Teacher[];
  hasFetched: boolean;
}

export const useTeacherStore = defineStore({
  id: "teacher",
  state: (): TeacherState => ({
    teachers: [],
    hasFetched: false,
  }),
  actions: {
    get() {
      TeacherService.list().then(({ data }) => {
        this.teachers = data;
        this.hasFetched = true;
      });
    },
    setUser(teachers: Teacher[]) {
      this.teachers = teachers;
      this.hasFetched = true;
    },
  },
});
