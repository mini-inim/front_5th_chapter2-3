import { User } from "../../User/model/userTypes"

  export interface Posts {
    author?: Author
    id?: number
    title?: string
    body?: string
    tags?: string[]
    reactions?: {
      likes: number
      dislikes: number
    }
    views?: number
    userId?: number
    authorId?: string
    authorImage?: string
    authorUsername?: string
  }
  
  export interface Author {
    image: string
    username: string
  }
  
  export interface PostWithAuthor extends Posts {
    author: User
  }
  
  export interface Tags {
    slug: string
    tags: string[]
    url?: string
  }