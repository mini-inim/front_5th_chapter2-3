import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../shared/ui"

interface SortByDescProps{
    sortOrder: string;
    setSortOrder: (sortOrder: string) => void;
}


export const SortByDesc = ({sortOrder, setSortOrder}: SortByDescProps) => {
    return(
        <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 순서" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="asc">오름차순</SelectItem>
            <SelectItem value="desc">내림차순</SelectItem>
            </SelectContent>
        </Select>
    )
}