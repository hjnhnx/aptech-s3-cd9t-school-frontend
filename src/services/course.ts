import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Course } from "@/types/models";

class CourseServiceClass {
  getCoursesByGroup = (params: { groupName: string }): AxiosPromise<Course[]> =>
    $axios.get("/api/courses-by-group", { params });
}

export const CourseService = new CourseServiceClass();
