/**
 * Pagination object
 */
export interface PaginationObject<T = any> {
  /**
   * total number of items
   */
  total: number;
  /**
   * page size
   */
  pageSize: number;
  /**
   * current page
   */
  pageNum: number;
  /**
   * items
   */
  data: T[];
}
