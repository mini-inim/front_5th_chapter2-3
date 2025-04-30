import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"

interface SearchPostProps{
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchPosts: () => void;
}

export const SearchPost = ({searchQuery, setSearchQuery, searchPosts}: SearchPostProps) => {
    return(
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="게시물 검색..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchPosts()}
            />
        </div>
    )
}