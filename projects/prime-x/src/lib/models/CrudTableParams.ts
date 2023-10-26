export interface CrudTableParams {
  first: number;
  rows: number;
  sortField: string;
  sortOrder: number;
  filters: string;
  globalFilter: string[];
  last: number;
}
