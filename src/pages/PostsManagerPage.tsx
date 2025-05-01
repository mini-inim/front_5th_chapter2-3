import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../shared/ui"

import { Post, User, Comment, PostsResponse, UsersResponse, CommentsResponse } from "../shared/type"
import { AddCommentDialog } from "../feature/Comment/ui/AddCommentDialog"
import { EditCommentDialog } from "../feature/Comment/ui/EditCommentDialog"
import { CommentSection } from "../widgets/ui/CommentSection"
import { UserDetailDialog } from "../feature/User/ui/UserDetailDialog"
import { Pagination } from "../shared/ui/Pagination/Pagination"
import { PostTable } from "../widgets/ui/PostTable"
import { SearchPost } from "../feature/Post/ui/SearchPost"
import { SortBySelect } from "../feature/Post/ui/SortBySelect"
import { SortByDesc } from "../feature/Post/ui/SortByDesc"
import { SelectTag } from "../feature/Post/ui/SelectTag"
import { AddPostDialog } from "../feature/Post/ui/Dialog/AddPostDialog"
import { EditPostDialog } from "../feature/Post/ui/Dialog/EditPostDialog"
import { PostDetailDialog } from "../feature/Post/ui/Dialog/PostDetailDialog"
import { useQueryParams } from "../hooks/useQueryParams"
import { useUserStore } from "../entities/User/model/userStore"
import { useCommentStore } from "../entities/Comment/model/commentStore"
import { usePostStore } from "../entities/Post/model/postStore"

const PostsManager = () => {
  const location = useLocation()

  // 전역 상태 관리
  const {
    posts,
    selectedPost,
    tags,
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    loading,
    setPosts,
    setSelectedPost,
    setTags,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
    setLoading,
    showEditDialog,
    setShowEditDialog,
    total,
    setTotal,
    setShowAddDialog,
    showAddDialog,
    newPost,
    setNewPost,
    showPostDetailDialog,
    setShowPostDetailDialog,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    showUserModal,
    setShowUserModal,
  } = usePostStore()
  
  const { selectedUser, setSelectedUser } = useUserStore()

  const { comments, selectedComment, newComment, setComments, setNewComment, setSelectedComment } = useCommentStore()


  // URL 업데이트 함수
  const { updateURL } = useQueryParams(skip, limit, searchQuery, sortBy, sortOrder, selectedTag);


  // 게시물 가져오기
  const fetchPosts = async(): Promise<void> => {
    setLoading(true)

    try{

      const [ postsResponse, usersResponse ] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      const postsData: PostsResponse = await postsResponse.json()
      const usersData: UsersResponse = await usersResponse.json()


      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)

    } catch (error){
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  
  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number): Promise<void> => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data: CommentsResponse = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async (): Promise<void> => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data: Comment = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: 0, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment?.body }),
      })
      const data: Comment = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id:number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id:number, postId:number): Promise<void> => {
    try {

      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId]?.find((c) => c.id === id)?.likes || 0+ 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? []).map((comment) =>
          comment.id === data.id
            ? { ...comment, ...data, likes: (comment.likes ?? 0) + 1 }
            : comment
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User | undefined) => {
    try {
      const response = await fetch(`/api/users/${user?.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])


  // 게시물 테이블 렌더링
  const renderPostTable = () => {
    return(
      <PostTable
        posts={posts}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        updateURL={updateURL}
        openUserModal={openUserModal}
        openPostDetail={openPostDetail}
        deletePost={deletePost}
        setSelectedPost={setSelectedPost}
        setShowEditDialog={setShowEditDialog} />
    )
  }

  // 댓글 렌더링
  const renderComments = (postId: number | undefined): React.ReactElement | null => {

    if(!postId) {
      return null;
    }

    return (
      <CommentSection
      comments={comments}
      postId={postId}
      likeComment={likeComment}
      deleteComment={deleteComment}
      setSelectedComment={setSelectedComment}
      setShowEditCommentDialog={setShowEditCommentDialog}
      setNewComment={setNewComment}
      setShowAddCommentDialog={setShowAddCommentDialog} 
      searchQuery={searchQuery}/>
    )
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchPost
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchPosts={searchPosts}/>
            </div>
            
            <SelectTag
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              fetchPostsByTag={fetchPostsByTag}
              updateURL={updateURL}
              tags={tags}/>
            
            <SortBySelect
              sortBy={sortBy}
              setSortBy={setSortBy} />

            <SortByDesc
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}/>

          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <Pagination
            limit={limit}
            setLimit={setLimit}
            skip={skip}
            setSkip={setSkip}
            total={total}/>

        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}/>

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}/>

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog
        showEditCommentDialog= {showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        showPostDetailDialog = {showPostDetailDialog}
        setShowPostDetailDialog = { setShowPostDetailDialog}
        selectedPost = { selectedPost }
        searchQuery = {searchQuery}
        renderComments = {renderComments}
      />

      {/* 사용자 모달 */}
      <UserDetailDialog
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
        selectedUser={selectedUser}
      />
    </Card>
  )
}

export default PostsManager
