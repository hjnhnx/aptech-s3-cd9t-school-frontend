import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Teacher } from "@/types/models";

class TeacherServiceClass {
  list = (): AxiosPromise<Teacher[]> => $axios.get("/api/teachers");
}

export const TeacherService = new TeacherServiceClass();
