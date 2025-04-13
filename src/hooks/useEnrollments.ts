import { useSession } from "@/context";
import { EnrollmentService } from "@/services/EnrollmentService";
import { EnrollmentWithDetails } from "@/types/Enrollment";
import { useCallback, useState } from "react";


export function useEnrollments() {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);

  // Fetch enrollments for a specific day
  const fetchEnrollmentsByDay = useCallback(async (childrenIds: string[], date: Date) => {
      if (!user?.id) return [];

      setLoading(true);
      setError(null);
      try {
        if (!childrenIds || childrenIds.length === 0) {
          setEnrollments([]);
          return [];
        }

        const { data: enrollments, errors } = await EnrollmentService.getEnrollmentsWithDetailsForChildren(childrenIds);
        if (errors) {
          throw new Error(errors.map((error) => error.message).join(", "));
        }

        const filteredEnrollments = enrollments.filter((enrollment) => {
          return (
            new Date(enrollment.schedule.startTime).toDateString() ===
              date.toDateString() &&
            new Date(enrollment.schedule.endTime).toDateString() ===
              date.toDateString()
          );
        });

        setEnrollments(filteredEnrollments);
        return filteredEnrollments;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to fetch enrollments by day");
        setError(error);
        console.error("Error fetching enrollments by day:", err);
        return [];
      } finally {
        setLoading(false);
      }
  }, [user?.id]);

  return {
    enrollments,
    loading,
    error,
    fetchEnrollmentsByDay,
  };
}
