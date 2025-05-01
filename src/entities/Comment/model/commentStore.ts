import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Comment } from "./commentTypes";

interface CommentState {
    comments: { [postId: number]: Comment[] }
    selectedComment: Comment | null
    loading: boolean
    newComment: {
      body: string
      postId: number
      userId: number
    }
  
    setComments: (
      updater:
        | ((comments: { [postId: number]: Comment[] }) => { [postId: number]: Comment[] })
        | { [postId: number]: Comment[] },
    ) => void
    setLoading: (loading: boolean) => void
    setNewComment: (comment: { body: string; postId: number; userId: number }) => void
    setSelectedComment: (comment: Comment | null) => void
  }

export const useCommentStore = create(
    devtools<CommentState>(
      (set) => ({
        comments: {},
        selectedComment: null,
        loading: false,
        newComment: {
          body: "",
          postId: 0,
          userId: 0,
        },
  
        setComments: (updater) =>
          set((state) => ({
            comments: typeof updater === "function" ? updater(state.comments) : updater,
          })),
        setSelectedComment: (comment: Comment | null) => set({ selectedComment: comment }),
        setLoading: (loading: boolean) => set({ loading }),
        setNewComment: (comment) =>
          set({ newComment: { body: comment.body, postId: comment.postId, userId: comment.userId } }),
      }),
      { name: "CommentStore" },
    ),
  )