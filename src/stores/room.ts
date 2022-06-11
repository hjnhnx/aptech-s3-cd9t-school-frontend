import { defineStore } from "pinia";
import { RoomService } from "@/services/room";
import type { Room } from "@/types/models";

interface RoomState {
  rooms: Room[];
  hasFetched: boolean;
}

export const useRoomStore = defineStore({
  id: "room",
  state: (): RoomState => ({
    rooms: [],
    hasFetched: false,
  }),
  getters: {
    openRooms: (state): Room[] =>
      state.rooms.filter((room) => !room.isDisabled),
  },
  actions: {
    get() {
      RoomService.list().then(({ data }) => {
        this.rooms = data;
        this.hasFetched = true;
      });
    },
    setUser(rooms: Room[]) {
      this.rooms = rooms;
      this.hasFetched = true;
    },
  },
});
