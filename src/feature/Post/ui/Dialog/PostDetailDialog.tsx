import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui"
import { highlightText } from "../../../../shared/utils"

interface PostDetailDialogProps{

}

export const PostDetailDialog = ({showPostDetailDialog, setShowPostDetailDialog, selectedPost, searchQuery}) => {
    return(
        <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            {renderComments(selectedPost?.id)}
          </div>
        </DialogContent>
      </Dialog>
    )
}