import { Schema } from "amplify/data/resource";

export const scheduleSelectionSet = [
  "id",
  "classId",
  "teacherId",
  "startTime",
  "endTime",
  "isCancelled",
  "cancellationReason",
  "location",
  "createdAt",
  "updatedAt",
  "class",
  "teacher",
] as const;
export type Schedule = Schema["Schedule"]["type"];
