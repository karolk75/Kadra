import { generateClient } from 'aws-amplify/data';
import { Schema } from 'amplify/data/resource';

// The client should be initialized outside of component render cycles
const client = generateClient<Schema>();

export class UserService {
  /**
   * Get a user by ID
   */
  static async getUserById(id: string) {
    try {
      return await client.models.User.get({ id });
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  /**
   * Get a user by email
   */
  static async getUserByEmail(email: string) {
    try {
      const { data } = await client.models.User.list({
        filter: { email: { eq: email } },
        limit: 1
      });
      return data[0] || null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  /**
   * Create a new user
   */
  static async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    userType: 'PARENT' | 'FACILITY_ADMIN' | 'TEACHER';
    phoneNumber?: string;
    profileImageUrl?: string;
  }) {
    try {
      return await client.models.User.create({
        ...userData,
        verificationStatus: 'UNVERIFIED',
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Update a user
   */
  static async updateUser(id: string, userData: Partial<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImageUrl: string;
  }>) {
    try {
      return await client.models.User.update({
        id,
        ...userData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
} 