import { IBook } from './book'
import { IUser } from './user'

export interface IHireRequest {
  id: number
  bookId: number
  userId: number
  borrow_date: string
  book?: IBook
  user?: IUser
}
