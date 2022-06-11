import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import type { CustomRoute } from "@/types/route";
import {
  ClockCircleOutlined,
  DatabaseOutlined,
  FormOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
  GroupOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import { appLocalStorage } from "@/utils/storage";
import { AUTHORIZATION_KEY } from "@/utils/constants";
import { UserRole } from "@/types/enums";

export const constantRoutes: CustomRoute[] = [
  {
    path: "/",
    name: "home",
    component: AppLayout,
    meta: {
      hidden: true,
      title: "Home",
    },
  },

  {
    path: "/404",
    name: "error404",
    component: AppLayout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "",
        name: "404",
        component: () => import("../views/error-page/Error404.vue"),
        meta: {
          title: "Not found",
        },
      },
    ],
  },

  {
    path: "/403",
    name: "error403",
    component: AppLayout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "",
        name: "403",
        component: () => import("../views/error-page/Error403.vue"),
        meta: {
          title: "Unauthorized",
        },
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
    meta: {
      hidden: true,
    },
  },

  {
    path: "/attendance",
    name: "attendance",
    component: AppLayout,
    meta: {
      title: "Attendance",
      icon: FormOutlined,
      singleChild: true,
      roles: [UserRole.TEACHER],
    },
    redirect: "/attendance",
    children: [
      {
        path: "",
        name: "todaySessions",
        component: () => import("../views/attendance/TodaySessions.vue"),
      },
      {
        path: ":id/take",
        name: "takeAttendance",
        component: () => import("../views/attendance/TakeAttendance.vue"),
        meta: {
          title: "Take attendance",
          hidden: true,
        },
      },
    ],
  },

  {
    path: "/attendance-report",
    name: "attendanceReport",
    component: AppLayout,
    meta: {
      title: "Attendance Report",
      icon: CheckCircleOutlined,
      singleChild: true,
      roles: [UserRole.STAFF],
    },
    children: [
      {
        path: "",
        name: "AttendanceReport",
        component: () => import("../views/attendance/AttendanceReport.vue"),
      },
    ],
  },

  {
    path: "/attendance-report-student",
    name: "attendanceReportStudent",
    component: AppLayout,
    meta: {
      title: "Attendance Report",
      icon: CheckCircleOutlined,
      singleChild: true,
      roles: [UserRole.STUDENT],
    },
    children: [
      {
        path: "",
        name: "AttendanceReportStudent",
        component: () => import("../views/students/AttendanceReport.vue"),
      },
    ],
  },

  {
    path: "/timetable",
    name: "timetable",
    component: AppLayout,
    meta: {
      title: "Timetable",
      icon: ScheduleOutlined,
      singleChild: true,
      roles: [UserRole.TEACHER, UserRole.STUDENT],
    },
    children: [
      {
        path: "",
        name: "timetableView",
        component: () => import("../views/timetable/Timetable.vue"),
      },
    ],
  },

  {
    path: "/groups",
    name: "group",
    component: AppLayout,
    meta: {
      title: "Classes",
      icon: GroupOutlined,
      roles: [UserRole.STAFF],
    },
    redirect: "/groups",
    children: [
      {
        path: "",
        name: "groupList",
        component: () => import("../views/groups/GroupList.vue"),
        meta: {
          title: "Class list",
        },
      },
      {
        path: "create",
        name: "groupCreate",
        component: () => import("../views/groups/GroupForm.vue"),
        meta: {
          title: "Create class",
        },
      },
      {
        path: ":id/update",
        name: "groupUpdate",
        component: () => import("../views/groups/GroupForm.vue"),
        meta: {
          hidden: true,
          title: "Update class",
        },
      },
      {
        path: ":id/students",
        name: "groupStudents",
        component: () => import("../views/groups/StudentList.vue"),
        meta: {
          hidden: true,
          title: "Student list",
        },
      },
    ],
  },

  {
    path: "/students",
    name: "student",
    component: AppLayout,
    meta: {
      title: "Students",
      icon: TeamOutlined,
      singleChild: true,
      roles: [UserRole.STAFF],
    },
    redirect: "/students",
    children: [
      {
        path: "",
        name: "studentList",
        component: () => import("../views/students/StudentList.vue"),
      },
    ],
  },

  {
    path: "/teachers",
    name: "teacher",
    component: AppLayout,
    meta: {
      title: "Teachers",
      icon: UserOutlined,
      singleChild: true,
      roles: [UserRole.STAFF],
    },
    children: [
      {
        path: "",
        name: "teacherList",
        component: () => import("../views/teachers/TeacherList.vue"),
      },
    ],
  },

  {
    path: "/profile",
    name: "profile",
    component: AppLayout,
    meta: {
      title: "Profile",
      icon: SmileOutlined,
      singleChild: true,
      roles: [UserRole.STUDENT],
    },
    children: [
      {
        path: "",
        name: "studentProfile",
        component: () => import("../views/profile/StudentProfile.vue"),
      },
    ],
  },

  {
    path: "/programs",
    name: "program",
    component: AppLayout,
    meta: {
      title: "Programs",
      icon: ProfileOutlined,
      singleChild: true,
    },
    children: [
      {
        path: "",
        name: "programList",
        component: () => import("../views/programs/ProgramList.vue"),
      },
    ],
  },

  {
    path: "/rooms",
    name: "room",
    component: AppLayout,
    meta: {
      title: "Rooms",
      icon: DatabaseOutlined,
      singleChild: true,
      roles: [UserRole.STAFF],
    },
    children: [
      {
        path: "",
        name: "roomList",
        component: () => import("../views/rooms/RoomList.vue"),
      },
    ],
  },

  {
    path: "/slots",
    name: "slot",
    component: AppLayout,
    meta: {
      title: "Slots",
      icon: ClockCircleOutlined,
      singleChild: true,
    },
    children: [
      {
        path: "",
        name: "slotList",
        component: () => import("../views/slots/SlotList.vue"),
      },
    ],
  },

  // 404 page must be placed at the end !!!
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];

const createCustomRouter = () =>
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes,
  });

const router = createCustomRouter();

router.beforeEach((to, from, next) => {
  const appName: string = import.meta.env.VITE_APP_NAME;
  document.title = to.meta?.title ? to.meta.title + " - " + appName : appName;
  const token = appLocalStorage.getItem(AUTHORIZATION_KEY);
  if (to.name !== "login" && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
