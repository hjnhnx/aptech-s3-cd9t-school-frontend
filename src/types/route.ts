import type { RouteRecordRaw } from "vue-router";
import type { UserRole } from "@/types/enums";

export type RouteMeta = {
  hidden?: boolean;
  title?: string;
  icon?: unknown;
  singleChild?: boolean; // will not display as dropdown on navigation, only the first child is shown
  roles?: UserRole[]; // required role to access view
};

export type CustomRoute = RouteRecordRaw & {
  meta?: RouteMeta;
  children?: CustomRoute[];
};
