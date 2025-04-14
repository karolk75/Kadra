import { enrollmentsWithDetailsSelectionSet } from "@/types/Enrollment";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";

export class EnrollmentService {
  private client: ReturnType<typeof generateClient<Schema>>;

  constructor(client: ReturnType<typeof generateClient<Schema>>) {
    this.client = client;
  }

  /**
   * Get enrollments with details for children
   */
  public async getEnrollmentsWithDetailsForChildren(childrenIds: string[]) {
    try {
      return await this.client.models.Enrollment.list({
        filter: {
          or: childrenIds.map((id) => ({ childId: { eq: id } })),
        },
        selectionSet: enrollmentsWithDetailsSelectionSet,
      });
    } catch (error) {
      console.error(
        "Error getting enrollments with details for children:",
        error
      );
      throw error;
    }
  }
}
