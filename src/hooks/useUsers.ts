import { useState, useEffect } from 'react';
import { Schema } from 'amplify/data/resource';
import { useData } from '@/context/DataContext';

type User = Schema['User']['type'];

export function useUsers() {
  const { client } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await client.models.User.list();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred fetching users'));
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await client.models.User.get({ id });
      return user;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred fetching user'));
      console.error('Error fetching user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: {
    email: string;
    firstName: string;
    lastName: string;
    userType: 'PARENT' | 'FACILITY_ADMIN' | 'TEACHER';
    phoneNumber?: string;
    profileImageUrl?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await client.models.User.create({
        ...userData,
        verificationStatus: 'UNVERIFIED',
        createdAt: new Date().toISOString()
      });
      // Refresh the users list
      fetchUsers();
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred creating user'));
      console.error('Error creating user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await client.models.User.update({
        id,
        ...userData,
        updatedAt: new Date().toISOString()
      });
      // Refresh the users list
      fetchUsers();
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred updating user'));
      console.error('Error updating user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUserById,
    createUser,
    updateUser
  };
} 