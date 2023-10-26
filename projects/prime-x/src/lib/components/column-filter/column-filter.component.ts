import { Component, Input } from '@angular/core';
import { TableHeader } from '../../models/TableHeader';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
})
export class ColumnFilterComponent {
  @Input()
  header!: TableHeader;
}
