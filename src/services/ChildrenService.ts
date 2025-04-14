import { useData } from "@/context/DataContext";
import { Child } from "@/types/Child";
import { generateClient } from "aws-amplify/api";
import { Schema } from "amplify/data/resource";

export class ChildrenService {
  private client: ReturnType<typeof generateClient<Schema>>;

  constructor(client: ReturnType<typeof generateClient<Schema>>) {
    this.client = client;
  }

  /**
   * Get all children for a parent
   */
  public async getChildrenForParent(parentId: string) {
    try {
      return await this.client.models.Child.list({
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
  public async createChild(child: Child) {
    try {
      return await this.client.models.Child.create(child);
    } catch (error) {
      console.error("Error creating child:", error);
      throw error;
    }
  }
}
