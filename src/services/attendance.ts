import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { AttendanceReport } from "@/types/models";

export interface AttendanceRecordCreateModel {
  studentRollNumber: string;
  isPresent: boolean;
  comment?: string;
}

class AttendanceServiceClass {
  attendanceReport = (params: {
    courseId: number;
  }): AxiosPromise<AttendanceReport> =>
    $axios.get("/api/attendance", { params });
  recordAttendance = (
    sessionId: number,
    records: AttendanceRecordCreateModel[]
  ): AxiosPromise =>
    $axios.post("/api/teacher/attendance", records, { params: { sessionId } });
}

export const AttendanceService = new AttendanceServiceClass();
