export interface Post {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: {
      likes: number
      dislikes: number
    }
    views: number
    userId: number
    author?: User
  }
  
 export interface User {
    id: number
    username: string
    image: string
    firstName?: string
    lastName?: string
    age?: number
    email?: string
    phone?: string
    address?: {
      address: string
      city: string
      state: string
    }
    company?: {
      name: string
      title: string
    }
  }
  
  export interface Comment {
    id: number
    body: string
    postId: number
    likes: number
    user: {
      id: number
      username: string
      fullName: string
    }
  }
  
  export interface PostsResponse {
    posts: Post[]
    total: number
    skip: number
    limit: number
  }
  
  export interface UsersResponse {
    users: User[]
  }
  
  export interface CommentsResponse {
    comments: Comment[]
  }