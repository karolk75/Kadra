import { useSession } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { ChildrenService } from "@/services/ChildrenService";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectChildren,
  setChildren,
  setError,
  setLoading,
} from "@/store/slices/childrenSlice";
import { useCallback } from "react";

export function useChildren() {
  const { user, isAuthenticated } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const childrenService = new ChildrenService(client);
  const children = useAppSelector(selectChildren);

  const fetchChildren = useCallback(async () => {
    if (!user?.id || !isAuthenticated) return [];

    try {
      if (!children || children.length === 0) {
        dispatch(setLoading(true));
        dispatch(setError(null));
      }

      const data = await childrenService.getChildrenForParent(
        user.id
      );

      dispatch(setChildren(data));
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

  return { fetchChildren };
}
