import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ElementRef } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { TableHeader } from '../../models/TableHeader';
import { CrudServiceImpl } from '../../services/crud-service/crud.service.impl';

export class CrudPageImpl {
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

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private crud: CrudServiceImpl
  ) {
    this.headers = this.route.snapshot.data['tableData'].headers;
    this.data = this.route.snapshot.data['tableData'].data;
    this.totalRecords = this.route.snapshot.data['tableData'].totalRecords;
  }

  loadData(event: TableLazyLoadEvent) {
    this.loading = true;

    this.crud
      .list({
        filters: JSON.parse(JSON.stringify(event.filters)),
        globalFilter: this.toStringArray(event.globalFilter),
        first: event.first ? event.first : 0,
        last: event.last ? event.last : 0,
        rows: event.rows ? event.rows : -999,
        sortField: this.toString(event.sortField),
        sortOrder: event.sortOrder ? event.sortOrder : 0,
      })
      .subscribe((res) => {
        this.headers = res.headers;
        this.data = res.payload;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      });
  }

  private toStringArray(val: string | string[] | null | undefined): string[] {
    if (!val) return [];
    if (val! instanceof String) return val as string[];
    return [val as string];
  }

  private toString(val: string | string[] | null | undefined): string {
    if (!val) return '';
    if (val instanceof Array) return val.join();
    return val as string;
  }

  deleteRecord(record: any) {
    this.deleteRecordDialog = true;
    this.record = { ...record };
  }

  editRecord(record: any) {
    this.router.navigate(['edit', record[this.uniqueTableColumn]], {
      relativeTo: this.route,
    });
  }
  createRecord() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  confirmDeleteSelected(confirm: boolean) {
    this.deleteRecordsDialog = false;
    if (!confirm) return;
    this.data = this.data.filter((val) => !this.selectedData.includes(val));
    let ids: string[] = [];

    this.data.forEach((val) => {
      ids.push(val[this.uniqueTableColumn]);
    });

    this.crud.delete(ids).subscribe((_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Records Deleted',
        life: 2000,
      });
      this.selectedData = [];
    });
  }

  confirmDelete(confirm: boolean) {
    this.deleteRecordsDialog = false;
    if (!confirm) return;
    this.crud.delete([this.record[this.uniqueTableColumn]]).subscribe((_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Record Deleted',
        life: 2000,
      });
      this.updateSelectedData();
      this.record = {};
    });
  }

  private updateSelectedData() {
    this.selectedData.splice(
      this.selectedData.findIndex((d) => d.id === this.record.id)
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
