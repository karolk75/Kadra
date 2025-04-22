import { generateClient } from "aws-amplify/data";
import { Schema } from "amplify/data/resource";

const client = generateClient<Schema>();

export class FacilityService {
  /**
   * Get a facility by ID
   */
  static async getFacilityById(id: string) {
    try {
      return await client.models.Facility.get({ id });
    } catch (error) {
      console.error("Error getting facility:", error);
      throw error;
    }
  }

  /**
   * List all facilities
   */
  static async listFacilities(options?: { limit?: number; city?: string }) {
    try {
      let filter = {};
      if (options?.city) {
        filter = { city: { eq: options.city } };
      }

      return await client.models.Facility.list({
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        limit: options?.limit,
      });
    } catch (error) {
      console.error("Error listing facilities:", error);
      throw error;
    }
  }

  /**
   * Create a new facility
   */
  static async createFacility(facilityData: {
    adminId: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    description?: string;
    phoneNumber?: string;
    email?: string;
    website?: string;
    logoUrl?: string;
  }) {
    try {
      return await client.models.Facility.create({
        ...facilityData,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error creating facility:", error);
      throw error;
    }
  }

  /**
   * Update a facility
   */
  static async updateFacility(
    id: string,
    facilityData: Partial<{
      name: string;
      address: string;
      city: string;
      postalCode: string;
      description: string;
      phoneNumber: string;
      email: string;
      website: string;
      logoUrl: string;
    }>,
  ) {
    try {
      return await client.models.Facility.update({
        id,
        ...facilityData,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating facility:", error);
      throw error;
    }
  }

  /**
   * Get classes for a facility
   */
  static async getFacilityClasses(facilityId: string) {
    try {
      const { data } = await client.models.Class.list({
        filter: { facilityId: { eq: facilityId } },
      });
      return data;
    } catch (error) {
      console.error("Error getting facility classes:", error);
      throw error;
    }
  }
}
