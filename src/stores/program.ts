import { defineStore } from "pinia";
import { ProgramService } from "@/services/program";
import type { Program } from "@/types/models";

interface ProgramState {
  programs: Program[];
  hasFetched: boolean;
  isFetching: boolean;
}

export const useProgramStore = defineStore({
  id: "program",
  state: (): ProgramState => ({
    programs: [],
    hasFetched: false,
    isFetching: false,
  }),
  actions: {
    get() {
      this.isFetching = true;
      ProgramService.list().then(({ data }) => {
        this.programs = data;
        this.hasFetched = true;
        this.isFetching = false;
      });
    },
    setUser(programs: Program[]) {
      this.programs = programs;
      this.hasFetched = true;
    },
  },
});
