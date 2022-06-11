import dayjs, { Dayjs } from "dayjs";
import {
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_SHORT_FORM,
  DB_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  DISPLAY_DATETIME_FORMAT,
} from "@/utils/constants";
import { Gender, UserRole } from "@/types/enums";
import type { Session, Student, Teacher } from "@/types/models";

const dayOfWeekToString = (
  value: number | string,
  shortForm = false
): string | null => {
  if (typeof value === "string") {
    const parsed = parseInt(value);
    if (isNaN(parsed)) {
      return null;
    } else {
      value = parsed;
    }
  }
  if (shortForm) {
    return DAYS_OF_WEEK_SHORT_FORM[value] || null;
  }
  return DAYS_OF_WEEK[value] || null;
};

const formatDate = (value: string, initialFormat = DB_DATE_FORMAT): string => {
  return dayjs(value, initialFormat).format(DISPLAY_DATE_FORMAT);
};

const formatDatetime = (value: string): string => {
  return dayjs(value).format(DISPLAY_DATETIME_FORMAT);
};

const formatTime = (minutes: number): string => {
  const m = minutes % 60;
  const h = (minutes - m) / 60;
  return (
    (h < 10 ? "0" : "") +
    h.toString() +
    ":" +
    (m < 10 ? "0" : "") +
    m.toString()
  );
};

const formatMoney = (value: number): string => {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(value);
};

const formatGender = (gender: Gender): string => toCapitalize(Gender[gender]);

// const momentToMinutes = (momentObj) => momentObj.hour() * 60 + momentObj.minutes();

const toCapitalize = (value: string): string => {
  if (!value) {
    return "";
  }
  return value
    .toLowerCase()
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c); // First char after each -/_
};

const getThemeColor = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return "#2563eb";
    case UserRole.STAFF:
      return "#e11d48";
    case UserRole.TEACHER:
      return "#7e22ce";
    default:
      return "#ea580c";
  }
};

const getSessionStartTime = (session: Session): Dayjs =>
  dayjs(session.date).hour(0).minute(0).add(session.startTime, "minutes");

const getSessionEndTime = (session: Session): Dayjs =>
  dayjs(session.date).hour(0).minute(0).add(session.endTime, "minutes");

const getFullName = (person: Student | Teacher): string =>
  person.lastName + " " + person.firstName;

export {
  dayOfWeekToString,
  formatDate,
  formatDatetime,
  formatTime,
  formatMoney,
  formatGender,
  toCapitalize,
  getThemeColor,
  getSessionStartTime,
  getSessionEndTime,
  getFullName,
};
