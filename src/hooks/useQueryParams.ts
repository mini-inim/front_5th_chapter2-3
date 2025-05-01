import { useCallback } from "react";
import { useNavigate } from "react-router-dom"

export const useQueryParams = (
    skip: number,
    limit: number,
    searchQuery: string,
    sortBy: string,
    sortOrder: string,
    selectedTag: string
) => {

    const navigate = useNavigate();

    const createQueryParams = useCallback(() => {
        const params = new URLSearchParams()
        if (skip) params.set("skip", skip.toString())
        if (limit) params.set("limit", limit.toString())
        if (searchQuery) params.set("search", searchQuery)
        if (sortBy) params.set("sortBy", sortBy)
        if (sortOrder) params.set("sortOrder", sortOrder)
        if (selectedTag) params.set("tag", selectedTag)

        return params;
    }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

    const updateURL = useCallback(() => {
        const params = createQueryParams();
        navigate(`?${params.toString()}`)
    }, [navigate, createQueryParams]);

    return { updateURL };
}