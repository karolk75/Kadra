import { Schema } from "amplify/data/resource";

export const childSelectionSet = [
  "id",
  "parentId",
  "firstName",
  "lastName",
  "birthDate",
  "notes",
  "profileImageUrl",
  "createdAt",
  "updatedAt",
] as const;
export type Child = Schema["Child"]["type"];
