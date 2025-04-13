import { useSession } from "@/context";
import { ChildrenService } from "@/services/ChildrenService";
import { Child } from "@/types/Child";
import { useCallback, useState } from "react";


export function useChildren() {
    const { user } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [children, setChildren] = useState<Child[]>([]);

    const fetchChildren = useCallback(async () => {
        if (!user?.id) return [];

        setLoading(true);
        setError(null);

        try {
            const { data, errors } = await ChildrenService.getChildrenForParent(user.id);
            if (errors) {
                throw new Error(errors.map((error) => error.message).join(", "));
            }
            setChildren(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch children"));
            return [];
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    return { children, loading, error, fetchChildren };
}