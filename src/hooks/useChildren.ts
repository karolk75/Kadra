import { useSession } from "@/context";
import { useData } from "@/context/DataContext";
import { ChildrenService } from "@/services/ChildrenService";
import { useAppDispatch } from "@/store";
import {
  setChildren,
  setError,
  setLoading,
} from "@/store/slices/childrenSlice";
import { useCallback } from "react";

export function useChildren() {
  const { user } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const childrenService = new ChildrenService(client);

  const fetchChildren = useCallback(async () => {
    if (!user?.id) return [];

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const { data, errors } = await childrenService.getChildrenForParent(
        user.id
      );
      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      dispatch(setChildren(data));

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
