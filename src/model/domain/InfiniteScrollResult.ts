
export interface InfiniteScrollResult<T> {
  hasMoreOnTop: boolean
  hasMoreOnBottom: boolean
  data: T[]
}

