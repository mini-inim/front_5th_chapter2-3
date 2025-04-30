import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../shared/ui"

interface SelectTagProps{
    selectedTag: string
    setSelectedTag: (tag: string) => void
    fetchPostsByTag: (tag: string) => void
    updateURL: () => void
    tags: any[]   
}

export const SelectTag = ({ selectedTag, setSelectedTag, fetchPostsByTag, updateURL, tags }: SelectTagProps) => {
    return (
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
          updateURL()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }