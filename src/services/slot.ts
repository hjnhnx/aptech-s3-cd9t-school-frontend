import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Slot } from "@/types/models";

class SlotServiceClass {
  list = (): AxiosPromise<Slot[]> => $axios.get("/api/slots");
}

export const SlotService = new SlotServiceClass();
