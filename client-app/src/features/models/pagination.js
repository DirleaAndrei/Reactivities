export class PaginatedResults {
  data;
  pagination;

  constructor(data, pagination) {
    this.data = data;
    this.pagination = pagination;
  }
}

export class PagingParams {
  pageNumber;
  pageSize;

  constructor(pageNumber = 1, pageSize = 2) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
