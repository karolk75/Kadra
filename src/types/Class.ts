import { Schema } from "amplify/data/resource";

export const classSelectionSet = [
  "id",
  "name",
  "description",
  "ageMin",
  "ageMax",
  "pricePerSession",
  "durationMinutes",
  "maxParticipants",
  "iconUrl",
  "isActive",
  "createdAt",
  "updatedAt",
  "facility",
  "category",
] as const;
export type Class = Schema["Class"]["type"];
