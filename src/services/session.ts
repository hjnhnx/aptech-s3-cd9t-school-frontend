import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Session } from "@/types/models";

class SessionServiceClass {
  getTodaySessions = (): AxiosPromise<Session[]> =>
    $axios.get("/api/teacher/sessions/today");

  getSessionDetail = (sessionId: string | number): AxiosPromise<Session> =>
    $axios.get(`/api/sessions/${sessionId}`);
}

export const SessionService = new SessionServiceClass();
