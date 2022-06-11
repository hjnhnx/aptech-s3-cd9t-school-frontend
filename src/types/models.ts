import type { RoomType, UserRole, Gender, SessionStatus } from "@/types/enums";

export interface Group {
  groupName: string;
  teacherId?: number;
  teacherName: string;
  startDate: string;
  slotId?: number;
  slotName: string;
  programId?: number;
  programName: string;
  programCode: string;
  termId?: number;
  termNumber: number;
  daysOfWeek: string;
  roomNumber: string;
  hasGeneratedTimetable: boolean;
}

export interface Course {
  id: number;
  groupName: string;
  subjectCode: string;
  subjectName: string;
}

export interface Room {
  roomNumber: string;
  capacity: number;
  roomType: RoomType;
  description: string;
  isDisabled: boolean;
}

export interface Term {
  id: string;
  termNumber: number;
  programId: number;
}

export interface Program {
  id: number;
  programName: string;
  programCode: string;
  terms: Term[];
}

export interface Slot {
  id: number;
  name: string;
  groupNamePrefix: string;
  startTime: number;
  endTime: number;
}

export interface Teacher {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Student {
  rollNumber: string;
  userId: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  avatar?: string;
  identityNumber?: string;
  identityDateOfIssue?: string;
  identityPlaceOfIssue?: string;
  address: string;
  phoneNumber: string;
  email: string;
  parentFullName: string;
  parentPhoneNumber: string;
  parentEmail?: string;
  parentAddress?: string;
  parentOccupation?: string;
  groupName: string;
  programId: number;
  programName?: string;
}

export interface Session {
  id: number;
  courseId: number;
  date: string;
  slotId: number;
  startTime: number;
  endTime: number;
  teacherId: number;
  roomNumber: string;
  status: SessionStatus;
  cancelReason: string;
  groupName: string; // virtual
  subjectCode: string; // virtual
  subjectName: string; // virtual
  teacherName: string; // virtual
}

export interface AttendanceRecord {
  sessionId: number;
  studentRollNumber: string;
  isPresent: boolean;
  comment?: string;
}

export interface Holiday {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface AttendanceRecords {
  attendances: AttendanceRecord[];
  studentFullName: string;
  studentRollNumber: string;
}

export interface AttendanceReport {
  attendanceRecords: AttendanceRecords[];
  sessions: Session[];
}

export interface AttendanceSessionReport {
  comment: null;
  courseId: number;
  date: string;
  endTime: number;
  id: number;
  isPresent: boolean;
  roomNumber: string;
  sessionId: number;
  startTime: number;
  studentFullName: string;
  studentRollNumber: string;
  subjectCode: string;
}
