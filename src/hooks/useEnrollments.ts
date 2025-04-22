import { useSession } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { EnrollmentService } from "@/services/EnrollmentService";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectTodayEnrollments,
  selectSelectedEnrollments,
  setEnrollments,
  setError,
  setLoading,
  setSelectedEnrollments,
} from "@/store/slices/enrollmentsSlice";
import { useCallback } from "react";

export function useEnrollments() {
  const { user, isAuthenticated } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const todayEnrollments = useAppSelector(selectTodayEnrollments);
  const selectedEnrollments = useAppSelector(selectSelectedEnrollments);
  const enrollmentService = new EnrollmentService(client);

  // Fetch enrollments for today
  const fetchEnrollmentsForToday = useCallback(
    async (childrenIds: string[]) => {
      if (!user?.id || !isAuthenticated) return [];

      try {
        if (!todayEnrollments || todayEnrollments.length === 0) {
          dispatch(setLoading(true));
          dispatch(setError(null));
        }

        if (!childrenIds || childrenIds.length === 0) {
          dispatch(setEnrollments([]));
          return [];
        }

        const data =
          await enrollmentService.getEnrollmentsWithDetailsForChildren(
            childrenIds
          );

        const filteredEnrollments = data.filter((enrollment) => {
          return (
            new Date(enrollment.schedule.startTime).toDateString() ===
              new Date().toDateString() &&
            new Date(enrollment.schedule.endTime).toDateString() ===
              new Date().toDateString()
          );
        });

        dispatch(setEnrollments(filteredEnrollments));
        dispatch(setError(null));
        return filteredEnrollments;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to fetch enrollments for today");
        dispatch(setError(error));
        console.error("Error fetching enrollments for today:", err);
        return [];
      } finally {
        dispatch(setLoading(false));
      }
    },
    [user?.id]
  );

  // Fetch enrollments for a specific date
  const fetchEnrollmentsForDate = useCallback(
    async (childrenIds: string[], date: string) => {
      if (!user?.id || !isAuthenticated) return [];

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await enrollmentService.getEnrollmentsWithDetailsForChildren(
            childrenIds
          );

        const filteredEnrollments = data.filter((enrollment) => {
          return (
            new Date(enrollment.schedule.startTime).toDateString() ===
              new Date(date).toDateString() &&
            new Date(enrollment.schedule.endTime).toDateString() ===
              new Date(date).toDateString()
          );
        });

        dispatch(setSelectedEnrollments(filteredEnrollments));
        dispatch(setError(null));
        return filteredEnrollments;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to fetch enrollments for date");
        dispatch(setError(error));
        console.error("Error fetching enrollments for date:", err);
        return [];
      } finally {
        dispatch(setLoading(false));
      }
    },
    [user?.id]
  );

  return {
    fetchEnrollmentsForToday,
    fetchEnrollmentsForDate,
  };
}
