import { Schema } from "amplify/data/resource";

export const scheduleSelectionSet = [
  "id",
  "userId",
  "facilityId",
  "bio",
  "specialization",
  "profileImageUrl",
  "createdAt",
  "updatedAt",
  "classes",
  "schedules",
] as const;
export type Teacher = Schema["Teacher"]["type"];
