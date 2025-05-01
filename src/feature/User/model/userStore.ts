import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { User } from "./userTypes"

interface UserState {
  users: User[]
  selectedUser: User | null
  loading: boolean

  setUsers: (users: User[]) => void
  setSelectedUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useUserStore = create(
  devtools<UserState>(
    (set) => ({
      users: [],
      selectedUser: null,
      loading: false,

      setUsers: (users: User[]) => set({ users }),
      setSelectedUser: (user: User | null) => set({ selectedUser: user }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    { name: "UserStore" },
  ),
)