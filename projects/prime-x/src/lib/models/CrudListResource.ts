import { TableHeader } from './TableHeader';

export interface CrudListResource {
  headers: TableHeader[];
  payload: any[];
  totalRecords: number;
}
