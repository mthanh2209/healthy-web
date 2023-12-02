import { IconType } from 'react-icons/lib'
export type TUserRole = 'admin' | 'member'

export interface ISideBarItem {
  name: string
  href: string
  icon: IconType
}
