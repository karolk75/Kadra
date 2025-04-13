import { useData } from "@/context/DataContext";
import { enrollmentsWithDetailsSelectionSet } from "@/types/Enrollment";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>();

export class EnrollmentService {
  /**
   * Get enrollments with details for children
   */
  static async getEnrollmentsWithDetailsForChildren(childrenIds: string[]) {
    try {
      return await client.models.Enrollment.list({
        filter: {
          or: childrenIds.map((id) => ({ childId: { eq: id } })),
        },
        selectionSet: enrollmentsWithDetailsSelectionSet,
      });
    } catch (error) {
      console.error("Error getting enrollments with details for children:", error);
      throw error;
    }
  }
}
