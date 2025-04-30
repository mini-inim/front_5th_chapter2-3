import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader, Textarea, Button } from "../../../shared/ui"

interface EditCommentDialogProps{
    showEditCommentDialog: boolean
    setShowEditCommentDialog: (show: boolean) => void
    selectedComment: any
    setSelectedComment: (comment: any) => void
    updateComment: () => void
}

export const EditCommentDialog = ({
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
    updateComment
}: EditCommentDialogProps) => {
    return(
        <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
            <Textarea
                placeholder="댓글 내용"
                value={selectedComment?.body || ""}
                onChange={(e) => setSelectedComment(selectedComment ? { ...selectedComment, body: e.target.value }: null)}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
            </div>
        </DialogContent>
        </Dialog>
    )
}