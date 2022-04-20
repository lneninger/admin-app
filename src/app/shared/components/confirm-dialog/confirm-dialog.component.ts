import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

export interface IConfirmDialogData{
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends BaseComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly config: IConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
      super();
     }

  ngOnInit(): void {
  }

}
