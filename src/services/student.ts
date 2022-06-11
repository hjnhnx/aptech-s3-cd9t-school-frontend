import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { AttendanceSessionReport, Course, Student } from "@/types/models";
import type { PaginationRequest, PaginationResponse } from "@/types/pagination";

class StudentServiceClass {
  getCourse = (): AxiosPromise<Course[]> => $axios.get("/api/student/courses");

  getSessions = (params: {
    courseId: number;
  }): AxiosPromise<AttendanceSessionReport[]> =>
    $axios.get("/api/student/attendance", { params });

  find = (
    params: PaginationRequest
  ): AxiosPromise<PaginationResponse<Student>> =>
    $axios.get("/api/students", { params });

  getStudentsByGroupName = (groupName: string): AxiosPromise<Student[]> =>
    $axios.get(`/api/students/group/${groupName}`);

  getStudentsBySession = (
    sessionId: string | number
  ): AxiosPromise<Student[]> =>
    $axios.get(`/api/teacher/students-by-session`, { params: { sessionId } });

  getStudentProfile = (): AxiosPromise<Student> =>
    $axios.get("/api/student/profile");
}

export const StudentService = new StudentServiceClass();
