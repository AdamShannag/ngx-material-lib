import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'px-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input()
  visibile: boolean = false;

  @Input()
  message: string = 'Are you sure?';

  @Output()
  dialogEvent = new EventEmitter<boolean>();

  confirmDialog(confirm: boolean) {
    this.dialogEvent.emit(confirm);
  }
}
