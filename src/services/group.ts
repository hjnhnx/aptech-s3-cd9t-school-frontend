import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Group, Student } from "@/types/models";
import type { PaginationRequest, PaginationResponse } from "@/types/pagination";

class GroupServiceClass {
  ///api/teacher/groups-from-courses
  getGroupHasLeastOneCourse = (): AxiosPromise<Group[]> =>
    $axios.get("/api/groups/all");
  find = (params: PaginationRequest): AxiosPromise<PaginationResponse<Group>> =>
    $axios.get("/api/groups", { params });

  store = (data: Partial<Group>): AxiosPromise<Group> =>
    $axios.post("/api/groups", data);

  importStudents = (
    groupName: string,
    students: Partial<Student>[]
  ): AxiosPromise<{ studentsAdded: number }> =>
    $axios.post(`/api/groups/import/${groupName}`, { students });
}

export const GroupService = new GroupServiceClass();
