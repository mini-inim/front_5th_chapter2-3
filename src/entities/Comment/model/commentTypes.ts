export interface TestComments {
    comments: Comment[]
    limit: number
    skip: number
    total: number
    [key: number]: Comment[]
  }
  
export interface Comment {
    body: string
    id?: number
    likes?: number
    postId: number
    user?: CommentUser
    userId?: number
  }
  
export interface CommentUser {
    fullName: string
    id: number
    username: string
  }