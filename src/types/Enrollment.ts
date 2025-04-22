import { Schema } from "amplify/data/resource";
import { SelectionSet } from "aws-amplify/api";

export type Enrollment = Schema["Enrollment"]["type"];

export const enrollmentsWithDetailsSelectionSet = [
  "id",
  "status",
  "notes",
  "schedule.id",
  "schedule.startTime",
  "schedule.endTime",
  "schedule.isCancelled",
  "schedule.class.name",
  "schedule.class.facility.name",
  "child.firstName",
  "child.lastName",
  "child.profileImageUrl",
] as const;
export type EnrollmentWithDetails = SelectionSet<
  Schema["Enrollment"]["type"],
  typeof enrollmentsWithDetailsSelectionSet
>;
