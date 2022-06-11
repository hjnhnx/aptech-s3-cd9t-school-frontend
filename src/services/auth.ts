import { $axios } from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { User } from "@/types/models";

interface AuthRequest {
  token: string;
}

class AuthServiceClass {
  login = (data: AuthRequest): AxiosPromise<User> =>
    $axios.post("/api/login", data);

  logout = (data: AuthRequest): AxiosPromise =>
    $axios.post("/api/logout", data);

  getProfile = (): AxiosPromise<User> => $axios.get("/api/profile");
}

export const AuthService = new AuthServiceClass();
