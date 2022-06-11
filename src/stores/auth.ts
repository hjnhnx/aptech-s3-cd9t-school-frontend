import { defineStore } from "pinia";
import type { User } from "@/types/models";
import { UserRole } from "@/types/enums";
import { AuthService } from "@/services/auth";
import { appLocalStorage } from "@/utils/storage";
import { AUTHORIZATION_KEY } from "@/utils/constants";
import router from "@/router";

interface ProgramState {
  user?: User;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): ProgramState => ({
    user: undefined,
  }),
  getters: {
    isRole: (state) => {
      return (role: UserRole) => state.user?.role === role;
    },
    role: (state) => (state.user ? state.user.role : 0),
    email: (state) => (state.user ? state.user.email : ""),
    roleText: (state) => (state.user ? UserRole[state.user.role] : ""),
    avatar: (state) => (state.user ? state.user.avatar : null),
  },
  actions: {
    async getProfile() {
      AuthService.getProfile().then(({ data }: { data: User }) => {
        if (data) {
          this.setUser(data);
        } else {
          appLocalStorage.removeItem(AUTHORIZATION_KEY);
          router.push({ name: "login" });
        }
      });
    },
    setUser(user: User) {
      this.user = user;
    },
    removeUser() {
      this.user = undefined;
    },
  },
});
