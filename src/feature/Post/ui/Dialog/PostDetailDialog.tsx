import { JSX } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui"
import { highlightText } from "../../../../shared/utils"
import { Posts } from "../../model/postTypes";

interface PostDetailDialogProps{
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (open: boolean) => void;
  selectedPost: Posts | null;
  searchQuery: string
  renderComments: (postId: number) => JSX.Element | null;
}

export const PostDetailDialog = ({showPostDetailDialog, setShowPostDetailDialog, selectedPost, searchQuery, renderComments}: PostDetailDialogProps) => {
    return(
        <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            {selectedPost !== null && selectedPost.id !== undefined && renderComments(selectedPost.id)}
          </div>
        </DialogContent>
      </Dialog>
    )
}