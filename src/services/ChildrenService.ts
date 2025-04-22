import { useData } from "@/context/DataContext";
import { Child, childSelectionSet } from "@/types/Child";
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
      const { data: children, errors } = await this.client.models.Child.list({
        filter: { parentId: { eq: parentId } },
        selectionSet: childSelectionSet,
      });
      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }
      return children;
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
      const { data: createdChild, errors } =
        await this.client.models.Child.create(child);
      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }
      return createdChild;
    } catch (error) {
      console.error("Error creating child:", error);
      throw error;
    }
  }
}
