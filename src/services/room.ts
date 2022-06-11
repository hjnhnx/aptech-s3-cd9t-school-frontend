import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Room } from "@/types/models";

class RoomServiceClass {
  list = (): AxiosPromise<Room[]> => $axios.get("/api/rooms");
}

export const RoomService = new RoomServiceClass();
