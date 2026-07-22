export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class PagedData<T> {
  readonly items: T[];
  readonly totalCount: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;

  constructor(result?: PagedResult<T>) {
    this.items = result?.items ?? [];
    this.totalCount = result?.totalCount ?? 0;
    this.page = result?.page ?? 1;
    this.pageSize = result?.pageSize ?? 0;
    this.totalPages = result?.totalPages ?? 0;
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get hasNextPage(): boolean {
    return this.page < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.page > 1;
  }

  static empty<T>(): PagedData<T> {
    return new PagedData<T>();
  }
}
