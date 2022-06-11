const AUTHORIZATION_KEY = import.meta.env.VITE_APP_AUTHORIZATION_KEY || "token";
const DISPLAY_DATE_FORMAT = "DD/MM/YYYY";
const DISPLAY_DATETIME_FORMAT = "DD/MM/YYYY, HH:mm";
const DB_DATE_FORMAT = "YYYY-MM-DD";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAYS_OF_WEEK_SHORT_FORM = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export {
  AUTHORIZATION_KEY,
  DISPLAY_DATE_FORMAT,
  DISPLAY_DATETIME_FORMAT,
  DB_DATE_FORMAT,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_SHORT_FORM,
};
