import { TableLazyLoadEvent } from 'primeng/table';

export interface CrudPage {
  loadData(event: TableLazyLoadEvent): void;
  deleteRecord(record: any): void;
  editRecord(record: any): void;
  createRecord(): void;
  confirmDeleteSelected(confirm: boolean): void;
  confirmDelete(confirm: boolean): void;
}
