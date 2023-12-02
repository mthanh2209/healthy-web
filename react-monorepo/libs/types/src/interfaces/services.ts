import { TUserForm } from './user'

interface BaseService {
  path: string
}

export interface IAddService<T> extends BaseService {
  values: Partial<T>
}

export interface IRemoveService extends BaseService {
  id: number
}

export interface IEditService<T> extends BaseService {
  id: number
  values: Partial<T>
}

export interface ILoginService extends BaseService {
  email: string
  password: string
}

export interface IRegisterService extends BaseService {
  user: TUserForm
}
