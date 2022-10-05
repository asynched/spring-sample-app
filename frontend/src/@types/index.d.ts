declare type Task = {
  id: number
  title: string
  description: string
  completed: boolean
}

declare type TaskDTO = {
  title: string
  description: string
}

declare type Pageable<T> = {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  totalElements: number
  totalPages: number
}
