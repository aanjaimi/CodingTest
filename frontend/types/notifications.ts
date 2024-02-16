import { User } from "./user"

enum NotifType {
  MESSAGE,
  GAME_REQUEST,
  FRIEND_REQUEST,
  FRIEND_ACCEPT,
}

export type Notification = {
  id: string
  content: any
  type: NotifType
  sender: User
  senderId: string
  receiver: User
  receiverId: string
  createdAt: Date
  updatedAt: Date
}