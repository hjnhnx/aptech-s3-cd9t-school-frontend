import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Program } from "@/types/models";

class ProgramServiceClass {
  list = (): AxiosPromise<Program[]> => $axios.get("/api/programs");
}

export const ProgramService = new ProgramServiceClass();
