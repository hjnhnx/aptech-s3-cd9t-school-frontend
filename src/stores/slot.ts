import { defineStore } from "pinia";
import { SlotService } from "@/services/slot";
import type { Slot } from "@/types/models";

interface SlotState {
  slots: Slot[];
  hasFetched: boolean;
}

export const useSlotStore = defineStore({
  id: "slot",
  state: (): SlotState => ({
    slots: [],
    hasFetched: false,
  }),
  actions: {
    get() {
      SlotService.list().then(({ data }) => {
        this.slots = data;
        this.hasFetched = true;
      });
    },
    setUser(slots: Slot[]) {
      this.slots = slots;
      this.hasFetched = true;
    },
  },
});
