export enum RoomType {
  CLASS_ROOM = 1,
  MEETING_ROOM = 2,
  THEORETICAL_THEATRE = 3,
  REMOTE = 4,
}

export enum UserRole {
  ADMIN = 800,
  STAFF = 600,
  TEACHER = 300,
  STUDENT = 100,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum SessionStatus {
  PENDING = 0,
  TAKEN = 1,
  MISSING = 2,
  CANCELED = 3,
}

export enum AppView {
  BLANK = 0,
  AUTHORIZED = 1,
  UNAUTHORIZED = 2,
  NOT_FOUND = 3,
  SERVER_ERROR = 4,
}
