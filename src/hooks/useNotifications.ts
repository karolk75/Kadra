import { useSession } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { NotificationService } from "@/services/NotificationService";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectNotifications,
  setError,
  setLoading,
  setNotifications,
  updateNotifications,
} from "@/store/slices/notificationsSlice";
import { useCallback } from "react";

export function useNotifications() {
  const { user, isAuthenticated } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const notificationService = new NotificationService(client);
  const notifications = useAppSelector(selectNotifications);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id || !isAuthenticated) return [];

    try {
      if (!notifications || notifications.length === 0) {
        dispatch(setLoading(true));
        dispatch(setError(null));
      }

      const data = await notificationService.getNotificationsForUser(user.id);

      // TODO: Sort by createdAt
      data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      dispatch(setNotifications(data));
      dispatch(setError(null));
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch children";
      dispatch(setError(errorMessage));
      return [];
    } finally {
      dispatch(setLoading(false));
    }
  }, [user?.id]);

  const updateNotificationsAsRead = useCallback(
    async (notificationsIds: string[]) => {
      if (!user?.id || !isAuthenticated) return;

      try {
        const updatedNotifications =
          await notificationService.updateNotificationsAsRead(notificationsIds);
        dispatch(updateNotifications(updatedNotifications));
        return updatedNotifications;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update notification";
        dispatch(setError(errorMessage));
      }
    },
    [user?.id],
  );

  return { fetchNotifications, updateNotificationsAsRead };
}
