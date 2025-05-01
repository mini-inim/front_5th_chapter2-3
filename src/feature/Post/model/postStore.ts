import { create } from "zustand";
import { Posts, Tags } from "./postTypes";
import { devtools } from "zustand/middleware";

interface PostState {
    posts: Posts[];
    newPost: {
      title: string;
      body: string;
      userId: number;
    };
    selectedPost: Posts | null;
    tags: Tags[];
    selectedTag: string;
    sortBy: string;
    sortOrder: string;
    searchQuery: string;
    skip: number;
    total: number;
    limit: number;
    loading: boolean;
    showAddDialog: boolean;
    showEditDialog: boolean;
    showPostDetailDialog: boolean;
    showAddCommentDialog: boolean;
    showEditCommentDialog: boolean;
    showUserModal: boolean;
  
    setPosts: (posts: Posts[]) => void;
    setNewPost: (post: { title: string; body: string; userId: number }) => void;
    setSelectedPost: (post: Posts | null) => void;
    setTags: (tags: Tags[]) => void;
    setSelectedTag: (tag: string) => void;
    setSortBy: (sortBy: string) => void;
    setSortOrder: (sortOrder: string) => void;
    setSearchQuery: (query: string) => void;
    setSkip: (skip: number) => void;
    setTotal: (total: number) => void;
    setLimit: (limit: number) => void;
    setLoading: (loading: boolean) => void;
    setShowAddDialog: (show: boolean) => void;
    setShowEditDialog: (show: boolean) => void;
    setShowPostDetailDialog: (show: boolean) => void;
    setShowAddCommentDialog: (show: boolean) => void;
    setShowEditCommentDialog: (show: boolean) => void;
    setShowUserModal: (show: boolean) => void;
  }


  export const usePostStore = create(
    devtools<PostState>(
      (set) => ({
        posts: [],
        newPost: { title: "", body: "", userId: 0 },
        selectedPost: null,
        tags: [],
        selectedTag: "",
        sortBy: "",
        sortOrder: "",
        searchQuery: "",
        skip: 0,
        total: 0,
        limit: 10,
        loading: false,
        showAddDialog: false,
        showEditDialog: false,
        showPostDetailDialog: false,
        showAddCommentDialog: false,
        showEditCommentDialog: false,
        showUserModal: false,
  
        setPosts: (posts) => set({ posts }),
        setNewPost: (post) => set({ newPost: post }),
        setSelectedPost: (post) => set({ selectedPost: post }),
        setTags: (tags) => set({ tags }),
        setSelectedTag: (tag) => set({ selectedTag: tag }),
        setSortBy: (sortBy) => set({ sortBy }),
        setSortOrder: (sortOrder) => set({ sortOrder }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setSkip: (skip) => set({ skip }),
        setTotal: (total) => set({ total }),
        setLimit: (limit) => set({ limit }),
        setLoading: (loading) => set({ loading }),
        setShowAddDialog: (show) => set({ showAddDialog: show }),
        setShowEditDialog: (show) => set({ showEditDialog: show }),
        setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
        setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
        setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
        setShowUserModal: (show) => set({ showUserModal: show }),
      }),
      { name: "PostStore" }
    )
  );