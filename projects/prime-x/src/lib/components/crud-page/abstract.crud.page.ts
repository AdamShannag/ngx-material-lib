import { ElementRef } from '@angular/core';
import { TableHeader } from '../../models/TableHeader';
import { Table } from 'primeng/table';

export class AbstractCrudPage {
  uniqueTableColumn: string = 'id';

  loading!: boolean;
  deleteRecordDialog: boolean = false;
  deleteRecordsDialog: boolean = false;

  headers: TableHeader[] = [];
  totalRecords!: number;
  data: any[] = [];

  record: any = {};
  selectedData: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  filter!: ElementRef;

  protected toStringArray(val: string | string[] | null | undefined): string[] {
    if (!val) return [];
    if (val! instanceof String) return val as string[];
    return [val as string];
  }

  protected toString(val: string | string[] | null | undefined): string {
    if (!val) return '';
    if (val instanceof Array) return val.join();
    return val as string;
  }

  protected updateSelectedData() {
    this.selectedData.splice(
      this.selectedData.findIndex((d) => d.id === this.record.id)
    );
  }

  protected onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  protected clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
