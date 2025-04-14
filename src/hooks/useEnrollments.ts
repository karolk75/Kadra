import { useSession } from "@/context";
import { useData } from "@/context/DataContext";
import { EnrollmentService } from "@/services/EnrollmentService";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectEnrollments,
  setEnrollments,
  setError,
  setLoading,
} from "@/store/slices/enrollmentsSlice";
import { useCallback } from "react";

export function useEnrollments() {
  const { user } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const enrollments = useAppSelector(selectEnrollments);
  const enrollmentService = new EnrollmentService(client);

  // Fetch enrollments for today
  const fetchEnrollmentsForToday = useCallback(
    async (childrenIds: string[]) => {
      if (!user?.id) return [];

      try {
        if (!enrollments || enrollments.length === 0) {
          dispatch(setLoading(true));
          dispatch(setError(null));
        }
        
        if (!childrenIds || childrenIds.length === 0) {
          dispatch(setEnrollments([]));
          return [];
        }

        const { data, errors } =
          await enrollmentService.getEnrollmentsWithDetailsForChildren(
            childrenIds
          );

        if (errors) {
          throw new Error(errors.map((error) => error.message).join(", "));
        }

        const filteredEnrollments = data.filter((enrollment) => {
          return (
            new Date(enrollment.schedule.startTime).toDateString() ===
              new Date().toDateString() &&
            new Date(enrollment.schedule.endTime).toDateString() ===
              new Date().toDateString()
          );
        });

        dispatch(setEnrollments(filteredEnrollments));
        return filteredEnrollments;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to fetch enrollments by day");
        dispatch(setError(error));
        console.error("Error fetching enrollments by day:", err);
        return [];
      } finally {
        dispatch(setLoading(false));
      }
    },
    [user?.id]
  );

  return {
    fetchEnrollmentsForToday,
  };
}
