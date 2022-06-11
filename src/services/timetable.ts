import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Session } from "@/types/models";

export interface TimetableResponse {
  schedule: Record<string, Session[]>;
  holidays: Record<string, string>;
}

class TimetableServiceClass {
  generateTimetable = (groupName: string, startDate: string): AxiosPromise =>
    $axios.post(
      "/api/timetable/generate",
      {},
      {
        params: {
          groupName,
          startDate,
        },
      }
    );

  getTeacherTimetable = (
    startDate: string,
    endDate: string
  ): AxiosPromise<TimetableResponse> =>
    $axios.get("/api/teacher/timetable", {
      params: {
        startDate,
        endDate,
      },
    });

  getStudentTimetable = (
    startDate: string,
    endDate: string
  ): AxiosPromise<TimetableResponse> =>
    $axios.get("/api/student/timetable", {
      params: {
        startDate,
        endDate,
      },
    });
}

export const TimetableService = new TimetableServiceClass();
