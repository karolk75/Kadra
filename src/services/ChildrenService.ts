import { useData } from "@/context/DataContext";
import { Child } from "@/types/Child";
import { generateClient } from "aws-amplify/api";
import { Schema } from "amplify/data/resource";

const client = generateClient<Schema>();

export class ChildrenService {
  /**
   * Get all children for a parent
   */
  static async getChildrenForParent(parentId: string) {
    try {
      return await client.models.Child.list({
        filter: { parentId: { eq: parentId } },
      });
    } catch (error) {
      console.error("Error getting children:", error);
      throw error;
    }
  }

  /**
   * Create a child
   */
  static async createChild(child: Child) {
    try {
      return await client.models.Child.create(child);
    } catch (error) {
      console.error("Error creating child:", error);
      throw error;
    }
  }
}
